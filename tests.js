const fs=require('fs'),path=require('path');const R=__dirname;const LP=require('./js/logic.js');
let pass=0,fail=0;const lines=[];function t(n,c,x){if(c){pass++;lines.push('PASS '+n);}else{fail++;lines.push('FAIL '+n+(x?' :: '+x:''));}}
function eq(a,b){return JSON.stringify(a)===JSON.stringify(b);}
// pages & data
t('3 landing pages defined',Object.keys(LP.PAGES).length===3);
t('page ids saas/agency/local',!!LP.PAGES.saas&&!!LP.PAGES.agency&&!!LP.PAGES.local);
t('each page has >=4 interests',Object.values(LP.PAGES).every(p=>p.interests.length>=4));
// validation
t('valid phone 0321',LP.validPhone('0321 1234567')===true);
t('valid phone +92',LP.validPhone('+923211234567')===true);
t('invalid phone 123',LP.validPhone('123')===false);
t('invalid phone landline',LP.validPhone('04235712345')===false);
t('invalid phone too long',LP.validPhone('032112345678')===false);
t('validate name names constraint',LP.validateLead({name:'Al',phone:'03211234567',interest:'x'}).name.includes('at least 3 characters'));
t('validate phone names PK format',LP.validateLead({name:'Ali Raza',phone:'1',interest:'x'}).phone.includes('03XX'));
t('validate interest names the ask',LP.validateLead({name:'Ali Raza',phone:'03211234567',interest:''}).interest.includes('choose what you are interested in'));
t('validate all good = {}',eq(LP.validateLead({name:'Ali Raza',phone:'03211234567',interest:'AC repair'}),{}));
// ref
t('ref format',/^LP-DEMO-\d{4}$/.test(LP.makeRef('saas','Ali Raza','03211234567')));
t('ref deterministic',LP.makeRef('saas','Ali Raza','03211234567')===LP.makeRef('saas','Ali Raza','03211234567'));
t('ref differs by page',LP.makeRef('saas','Ali Raza','03211234567')!==LP.makeRef('local','Ali Raza','03211234567'));
// pricing toggle arithmetic — exact, both states + boundary pair (lesson 33)
LP.TIERS.forEach(tr=>{
 t('monthly exact '+tr.id+' = $'+tr.monthly,LP.priceFor(tr.monthly,'monthly')===tr.monthly&&LP.priceLabel(tr.monthly,'monthly')==='$'+tr.monthly+' / month');
 t('yearly exact '+tr.id+' = monthly x10',LP.priceFor(tr.monthly,'yearly')===tr.monthly*10&&LP.priceLabel(tr.monthly,'yearly')==='$'+(tr.monthly*10)+' / year');
});
t('boundary: monthly 1 -> yearly 10',LP.priceFor(1,'yearly')===10);
t('boundary: monthly 0 -> yearly 0',LP.priceFor(0,'yearly')===0&&LP.priceFor(0,'monthly')===0);
t('tiers are 12/29/59',eq(LP.TIERS.map(x=>x.monthly),[12,29,59]));
// sheet log + event log round-trip (logic-level serialisation)
const row=LP.sheetRow('local',{name:'Usman Tariq',phone:'03211234567',interest:'AC repair',message:''},LP.makeRef('local','Usman Tariq','03211234567'),'2026-11-21T00:00:00.000Z');
const rt=JSON.parse(JSON.stringify([row]));
t('sheet row round-trip',eq(rt,[row]));
t('sheet row has all columns',!!(row.timestamp&&row.page&&row.name&&row.phone&&row.interest&&row.ref));
const evs=LP.trackEvents('saas','lead_submit',row.ref,'2026-11-21T00:00:00.000Z');
t('lead_submit makes ga4 + pixel pair',evs.length===2&&evs[0].source==='ga4'&&evs[1].source==='meta_pixel');
t('events carry DEMO ids',evs.every(e=>/DEMO/.test(e.id)));
t('whatsapp event pair',LP.waEvent('agency','2026-11-21T00:00:00.000Z').every(e=>e.event==='whatsapp_click'));
// WhatsApp links per page
['saas','agency','local'].forEach(p=>{
 const l=LP.waLink(p);t('wa link '+p+' is wa.me with offer text',l.startsWith('https://wa.me/923000000000?text=')&&l.includes(encodeURIComponent(LP.PAGES[p].offer.split(' ').slice(0,3).join(' ')).slice(0,10)));
});
t('wa links differ per page',LP.waLink('saas')!==LP.waLink('agency')&&LP.waLink('agency')!==LP.waLink('local'));
// contrast — all three systems + hub (lesson 23, computed from hex)
const pairs=[
 // hub
 ['hub ink on bg','#1C1C1A','#F4F4F0',4.5],['hub muted on bg','#45453F','#F4F4F0',4.5],['hub bg on ink (ribbon/btn)','#F4F4F0','#1C1C1A',4.5],['hub muted on surface','#45453F','#E9E9E2',4.5],['hub error on bg','#B3261E','#F4F4F0',4.5],['hub focus ink on bg (>=3)','#1C1C1A','#F4F4F0',3],
 // saas
 ['saas ink on white','#131A2A','#FFFFFF',4.5],['saas muted on white','#3E4A68','#FFFFFF',4.5],['saas white on accent','#FFFFFF','#4338CA',4.5],['saas accent on white','#4338CA','#FFFFFF',4.5],['saas ink on surface','#131A2A','#EEF0FE',4.5],['saas muted on surface','#3E4A68','#EEF0FE',4.5],['saas error on white','#B3261E','#FFFFFF',4.5],['saas focus accent on white (>=3)','#4338CA','#FFFFFF',3],['saas white on wa green','#FFFFFF','#14632F',4.5],
 // agency
 ['agency ink on bg','#16130E','#EFE9DC',4.5],['agency muted on bg','#4A4130','#EFE9DC',4.5],['agency bg on ink (btn/marquee)','#EFE9DC','#16130E',4.5],['agency ink on card','#16130E','#F7F3E8',4.5],['agency muted on card','#4A4130','#F7F3E8',4.5],['agency accent on bg (large/work-num)','#9A3412','#EFE9DC',4.5],['agency ink on surface','#16130E','#E3DAC4',4.5],['agency error on bg','#B3261E','#EFE9DC',4.5],['agency focus ink on bg (>=3)','#16130E','#EFE9DC',3],['agency white on wa green','#FFFFFF','#14632F',4.5],
 // local
 ['local ink on bg','#2A2118','#FFF9EC',4.5],['local muted on bg','#54432E','#FFF9EC',4.5],['local white on accent','#FFFFFF','#9A3412',4.5],['local ink on surface','#2A2118','#FCEFCB',4.5],['local muted on surface','#54432E','#FCEFCB',4.5],['local error on bg','#B3261E','#FFF9EC',4.5],['local focus accent on bg (>=3)','#9A3412','#FFF9EC',3],['local white on wa green','#FFFFFF','#14632F',4.5]
];
pairs.forEach(([n,a,b,m])=>t('contrast '+n+' = '+LP.contrast(a,b).toFixed(2),LP.contrast(a,b)>=m));
// source hygiene — ZERO live endpoints
const srcFiles=['index.html','saas.html','agency.html','local.html','logs.html','css/style.css','js/logic.js','js/app.js'];
let allSrc='';srcFiles.forEach(f=>allSrc+=fs.readFileSync(path.join(R,f),'utf8'));
t('NO googletagmanager endpoint',!/googletagmanager\.com/.test(allSrc));
t('NO connect.facebook.net endpoint',!/connect\.facebook\.net/.test(allSrc));
t('NO google-analytics endpoint',!/google-analytics\.com/.test(allSrc));
t('NO gtag script call',!/gtag\(/.test(allSrc));
t('analytics config is DEMO',/G-DEMO-000000/.test(allSrc)&&/DEMO-PIXEL-000000/.test(allSrc));
// per-page checks
const pages=['index.html','saas.html','agency.html','local.html','logs.html'];
pages.forEach(p=>{const h=fs.readFileSync(path.join(R,p),'utf8');
 t(p+' has DEMO label',/DEMO/.test(h));t(p+' no lorem',!/lorem/i.test(h));t(p+' has title',/<title>[^<]+<\/title>/.test(h));t(p+' has meta description',/name="description"/.test(h));});
const titles=pages.map(p=>fs.readFileSync(path.join(R,p),'utf8').match(/<title>([^<]+)/)[1]);t('unique titles',new Set(titles).size===pages.length);
['saas','agency','local'].forEach(pg=>{
 const h=fs.readFileSync(path.join(R,pg+'.html'),'utf8');
 t(pg+'.html has lead form',h.includes('data-lead-form="'+pg+'"'));
 t(pg+'.html has WhatsApp CTA with data-wa',h.includes('data-wa="'+pg+'"'));
 t(pg+'.html form names sheet wiring honestly',h.includes('Google Sheet'));
 t(pg+'.html has confirmation slot',h.includes('data-confirmation'));
});
const saasH=fs.readFileSync(path.join(R,'saas.html'),'utf8');
t('saas has billing toggle',saasH.includes('data-billing-toggle'));
t('saas has 3 priced tiers in markup',(saasH.match(/data-price=/g)||[]).length===3);
t('saas mock labelled DEMO DATA',saasH.includes('DEMO DATA'));
const localH=fs.readFileSync(path.join(R,'local.html'),'utf8');
t('local has tel: click-to-call',localH.includes('href="tel:+923000000000"'));
t('local has PKR prices',/PKR 2,500/.test(localH)&&/PKR 12,000/.test(localH));
t('local names Gujranwala areas',localH.includes('Satellite Town')&&localH.includes('Model Town'));
t('local form above fold (form before services section)',localH.indexOf('data-lead-form')<localH.indexOf('id="services"'));
const agencyH=fs.readFileSync(path.join(R,'agency.html'),'utf8');
t('agency has kinetic headline',agencyH.includes('class="kinetic"'));
t('agency has marquee band',agencyH.includes('marquee-track'));
const logsH=fs.readFileSync(path.join(R,'logs.html'),'utf8');
t('logs renders sheet + event tables',logsH.includes('data-sheet-body')&&logsH.includes('data-event-body'));
t('logs has clear control',logsH.includes('data-clear-logs'));
// link integrity
let bad=[];pages.forEach(p=>{const h=fs.readFileSync(path.join(R,p),'utf8');(h.match(/(?:href|src)="(?!https?:|#|mailto:|tel:)([^"]+)"/g)||[]).forEach(m=>{const ref=m.split('"')[1].split('?')[0];if(ref&&!fs.existsSync(path.join(R,ref)))bad.push(p+'->'+ref);});});
t('all local links/assets resolve',bad.length===0,bad.join(','));
t('sitemap + robots exist',fs.existsSync(path.join(R,'sitemap.xml'))&&fs.existsSync(path.join(R,'robots.txt')));
// reduced-motion handling present in CSS
const css=fs.readFileSync(path.join(R,'css/style.css'),'utf8');
t('CSS has reduced-motion block',css.includes('prefers-reduced-motion: reduce'));
t('CSS scopes animation under no-preference',css.includes('prefers-reduced-motion: no-preference'));
// weights
function size(f){return fs.statSync(path.join(R,f)).size;}
let code=0;[...pages,'css/style.css','js/logic.js','js/app.js'].forEach(f=>code+=size(f));
t('code < 400KB ('+code+'B)',code<400*1024);
const imgs=fs.readdirSync(path.join(R,'assets')).filter(f=>/\.(jpg|png|webp)$/.test(f));let media=0;imgs.forEach(f=>{const s=size('assets/'+f);media+=s;t('image <=120KB '+f+' ('+s+'B)',s<=120*1024);});
t('media <=1.6MB ('+media+'B)',media<=1.6*1024*1024);
t('agency is type-only (no jpg referenced)',!/(jpg|png)/.test(agencyH.replace('favicon.svg','')));
lines.push('TOTAL: '+pass+' PASS / '+fail+' FAIL');fs.writeFileSync(path.join(R,'tests-output.log'),lines.join('\n')+'\n');console.log(lines.join('\n'));process.exit(fail?1:0);
