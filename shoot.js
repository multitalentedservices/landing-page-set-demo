/* Landing Page Set — screenshot + audit + flow runner. Modes: default, --nojs, --probe320, --reduced, --flows, --keyboard */
const { chromium } = require('/home/hatch/workspace/tools/screenshot-engine/node_modules/playwright');
const fs=require('fs'),path=require('path');
const ROOT='/home/hatch/workspace/portfolio-builds/landing-page-set-demo';
const EXEC='/home/hatch/workspace/tools/screenshot-engine/browsers/chrome-headless-shell-linux64/chrome-headless-shell';
const OUT=process.argv[2]; const NOJS=process.argv.includes('--nojs'),PROBE=process.argv.includes('--probe320'),FLOWS=process.argv.includes('--flows'),REDUCED=process.argv.includes('--reduced'),KEYBOARD=process.argv.includes('--keyboard');
const PAGES=[['index','index.html'],['saas','saas.html'],['agency','agency.html'],['local','local.html'],['logs','logs.html']];
const VIEWPORTS=PROBE?[['probe320',320,700]]:[['phone',390,844],['tablet',768,1024],['desktop',1440,900]];
async function auditPage(page){return page.evaluate(()=>{const vw=window.innerWidth;const bad=[];document.querySelectorAll('body *').forEach(el=>{const r=el.getBoundingClientRect();if(r.width>0&&(r.right>vw+1||r.left<-1)){if(el.closest('.skip-link')||el.closest('.marquee-track'))return;let clipped=false;for(let a=el.parentElement;a&&a!==document.body;a=a.parentElement){const ox=getComputedStyle(a).overflowX;if(ox==='hidden'||ox==='clip'||ox==='auto'||ox==='scroll'){clipped=true;break;}}if(!clipped)bad.push({el:el.tagName.toLowerCase()+'.'+String(el.className).split(' ').join('.'),right:Math.round(r.right)});}});const broken=[];document.querySelectorAll('img').forEach(im=>{if(im.complete&&im.naturalWidth===0)broken.push(im.getAttribute('src'));});const textBad=[];document.querySelectorAll('body *').forEach(el=>{if(el.children.length||!el.textContent||!el.textContent.trim()||el.closest('.skip-link')||el.closest('.marquee-track'))return;if(el.scrollWidth>el.clientWidth+1)textBad.push({el:el.tagName.toLowerCase(),sw:el.scrollWidth,cw:el.clientWidth,text:el.textContent.trim().slice(0,40)});});return{overflowX:document.documentElement.scrollWidth-vw,badEls:bad.slice(0,12),brokenImgs:broken,textBad:textBad.slice(0,12)};});}
async function settle(page){if(NOJS){await page.waitForTimeout(500);return;}await page.evaluate(async()=>{for(let y=0;y<document.body.scrollHeight;y+=400){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,50));}window.scrollTo(0,0);});await page.waitForTimeout(250);}
(async()=>{
 fs.mkdirSync(OUT,{recursive:true});
 const browser=await chromium.launch({executablePath:EXEC,args:['--proxy-server=http://hatch-egress-proxy:3128','--no-sandbox','--force-color-profile=srgb']});
 if(KEYBOARD){
  const ctx=await browser.newContext({viewport:{width:1280,height:900}});const page=await ctx.newPage();const rows=[];
  async function walk(file,label,tabs,shotAt,shotName){await page.goto('file://'+path.join(ROOT,file),{waitUntil:'load'});await page.waitForTimeout(500);for(let i=0;i<tabs;i++){await page.keyboard.press('Tab');await page.waitForTimeout(110);const info=await page.evaluate(()=>{const el=document.activeElement;if(!el)return null;const cs=getComputedStyle(el);return{tag:el.tagName.toLowerCase(),text:(el.textContent||el.value||el.getAttribute('placeholder')||'').trim().slice(0,42),cls:el.className||'',outline:cs.outlineWidth+' '+cs.outlineStyle+' '+cs.outlineColor};});rows.push(`| ${label} | ${i+1} | ${info?info.tag+' — '+info.text:'?'} | ${info?info.cls:''} | ${info?info.outline:''} |`);if(i+1===shotAt)await page.screenshot({path:path.join(OUT,shotName)});}}
  await walk('index.html','Hub',8,3,'keyboard-focus-hub.png');
  await walk('saas.html','SaaS form',16,10,'keyboard-focus-saas.png');
  fs.writeFileSync(path.join(OUT,'keyboard-walk.md'),'# Keyboard walk — Landing Page Set (Demo)\n\nMethod: Playwright Tab presses at 1280px; focused element and computed outline recorded per stop. All controls are native links/buttons/inputs/selects (lesson 34) — there are NO visually-hidden inputs in this build, so the lesson-20 focus-host defect class is recorded as NOT APPLICABLE: every focus target is the control itself, outlined directly.\n\n| Page | Stop | Focused element | Class | Outline |\n|---|---|---|---|---|\n'+rows.join('\n')+'\n');
  console.log('KEYBOARD DONE');await browser.close();return;
 }
 if(FLOWS){
  const ctx=await browser.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();const log=[];
  ctx.on('page',async p=>{if(p!==page){await p.waitForTimeout(300).catch(()=>{});await p.close().catch(()=>{});}});
  const shot=async(n,loc)=>{if(loc)await loc.screenshot({path:path.join(OUT,n)});else await page.screenshot({path:path.join(OUT,n)});};
  const people={saas:{name:'Ali Raza',interest:'Invoicing & billing'},agency:{name:'Mahnoor Fatima',interest:'Brand identity'},local:{name:'Usman Tariq',interest:'AC repair'}};
  const refs={};
  for(const pg of ['saas','agency','local']){
   await page.goto('file://'+path.join(ROOT,pg+'.html'),{waitUntil:'load'});await page.waitForTimeout(500);
   await page.fill('[data-name]',people[pg].name);
   await page.fill('[data-phone]','123');
   await page.selectOption('[data-interest]',{label:people[pg].interest});
   await page.click('form[data-lead-form] button[type="submit"]');await page.waitForTimeout(300);
   const err=await page.textContent('[data-error-for="phone"]');
   log.push(pg+' phone error CONTENT -> '+err.trim());
   await shot('flow-'+pg+'-phone-error.png',page.locator('form[data-lead-form]'));
   await page.fill('[data-phone]','0321 1234567');await page.waitForTimeout(250);
   log.push(pg+' phone error after fix (must be empty) -> "'+(await page.textContent('[data-error-for="phone"]')).trim()+'"');
   await page.click('form[data-lead-form] button[type="submit"]');await page.waitForTimeout(500);
   const conf=(await page.textContent('[data-confirmation]')).replace(/\s+/g,' ').trim();
   log.push(pg+' confirmation CONTENT -> '+conf.slice(0,240));
   refs[pg]=(conf.match(/LP-DEMO-\d{4}/)||[])[0];
   await shot('flow-'+pg+'-confirmation.png',page.locator('[data-confirmation]'));
   await page.click('[data-wa="'+pg+'"]');await page.waitForTimeout(600);
   const ev=await page.evaluate(()=>JSON.parse(localStorage.getItem('lp_event_log')||'[]'));
   const wa=ev.filter(e=>e.event==='whatsapp_click'&&e.page===pg);
   log.push(pg+' FIRING whatsapp events recorded -> '+wa.length+' ('+wa.map(e=>e.source).join('+')+')');
   const sheet=await page.evaluate(()=>JSON.parse(localStorage.getItem('lp_sheet_log')||'[]'));
   log.push(pg+' sheet rows so far -> '+sheet.length+' last ref='+sheet[sheet.length-1].ref);
  }
  /* SaaS pricing toggle — rendered arithmetic */
  await page.goto('file://'+path.join(ROOT,'saas.html'),{waitUntil:'load'});await page.waitForTimeout(400);
  const monthly=await page.$$eval('[data-price]',els=>els.map(e=>e.textContent.trim()));
  log.push('saas prices MONTHLY rendered -> '+monthly.join(' | '));
  await shot('flow-saas-pricing-monthly.png',page.locator('#pricing'));
  await page.click('[data-billing-toggle]');await page.waitForTimeout(300);
  const yearly=await page.$$eval('[data-price]',els=>els.map(e=>e.textContent.trim()));
  log.push('saas prices YEARLY rendered -> '+yearly.join(' | '));
  await shot('flow-saas-pricing-yearly.png',page.locator('#pricing'));
  /* Logs page — cross-surface proof (lesson 30) */
  await page.goto('file://'+path.join(ROOT,'logs.html'),{waitUntil:'load'});await page.waitForTimeout(500);
  log.push('logs counts -> '+(await page.textContent('[data-log-counts]')).trim());
  const sheetText=await page.textContent('[data-sheet-body]');
  ['saas','agency','local'].forEach(pg=>log.push('logs sheet contains ref '+pg+' '+refs[pg]+' -> '+sheetText.includes(refs[pg])));
  const evText=await page.textContent('[data-event-body]');
  log.push('logs events contain lead_submit -> '+(evText.match(/lead_submit/g)||[]).length+' rows, whatsapp_click -> '+(evText.match(/whatsapp_click/g)||[]).length+' rows');
  await shot('flow-logs-page.png');
  fs.writeFileSync(path.join(OUT,'flow-log.txt'),log.join('\n')+'\n');console.log(log.join('\n'));console.log('FLOWS DONE');await browser.close();return;
 }
 const results={};
 for(const [pname,file] of PAGES){for(const [vname,w,h] of VIEWPORTS){const ctx=await browser.newContext({viewport:{width:w,height:h},javaScriptEnabled:!NOJS,reducedMotion:REDUCED?'reduce':'no-preference'});const page=await ctx.newPage();await page.goto('file://'+path.join(ROOT,file),{waitUntil:'load'});await page.waitForTimeout(400);await settle(page);results[pname+'@'+vname]=await auditPage(page);await page.screenshot({path:path.join(OUT,pname+'-'+vname+'.png'),fullPage:true});await ctx.close();}}
 fs.writeFileSync(path.join(OUT,'audit.json'),JSON.stringify(results,null,2));
 const bad=Object.entries(results).filter(([,a])=>a.overflowX>1||a.badEls.length||a.brokenImgs.length||a.textBad.length);
 console.log('combos:',Object.keys(results).length,'| problem combos:',bad.length);bad.forEach(([k,a])=>console.log(k,JSON.stringify(a)));
 await browser.close();
})();
