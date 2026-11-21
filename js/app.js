/* Landing Page Set — DOM wiring. All integrations are LOCAL STUBS (see logic.js). */
(function(){
'use strict';
var LP=window.LP;
function read(key){try{return JSON.parse(localStorage.getItem(key)||'[]');}catch(e){return[];}}
function write(key,val){localStorage.setItem(key,JSON.stringify(val));}
function now(){return new Date().toISOString();}
function recordEvents(events){var log=read(LP.EVENT_KEY);events.forEach(function(e){log.push(e);});write(LP.EVENT_KEY,log);}
function recordPageview(pageId){recordEvents(LP.trackEvents(pageId,'page_view','',now()));}

/* WhatsApp click tracking — firing recorded synchronously on click (lesson 21) */
document.querySelectorAll('[data-wa]').forEach(function(a){
 var pageId=a.getAttribute('data-wa');
 a.setAttribute('href',LP.waLink(pageId));
 a.addEventListener('click',function(){recordEvents(LP.waEvent(pageId,now()));});
});

/* Lead forms */
document.querySelectorAll('form[data-lead-form]').forEach(function(form){
 var pageId=form.getAttribute('data-lead-form');
 recordPageview(pageId);
 var fields={name:form.querySelector('[data-name]'),phone:form.querySelector('[data-phone]'),interest:form.querySelector('[data-interest]'),message:form.querySelector('[data-message]')};
 function showError(key,msg){
  var slot=form.querySelector('[data-error-for="'+key+'"]');if(slot)slot.textContent=msg||'';
  var input=fields[key];if(input)input.setAttribute('aria-invalid',msg?'true':'false');
 }
 function current(){return{name:fields.name.value,phone:fields.phone.value,interest:fields.interest.value,message:fields.message?fields.message.value:''};}
 /* live clearing (lesson 7/25) */
 ['name','phone','interest'].forEach(function(key){
  var el=fields[key];if(!el)return;
  el.addEventListener('input',function(){var errs=LP.validateLead(current());if(!errs[key])showError(key,'');});
  el.addEventListener('change',function(){var errs=LP.validateLead(current());if(!errs[key])showError(key,'');});
 });
 form.addEventListener('submit',function(ev){
  ev.preventDefault();
  var data=current();var errs=LP.validateLead(data);var bad=false;
  ['name','phone','interest'].forEach(function(key){showError(key,errs[key]||'');if(errs[key])bad=true;});
  if(bad)return;
  var ts=now();var ref=LP.makeRef(pageId,data.name,data.phone);
  var sheet=read(LP.SHEET_KEY);sheet.push(LP.sheetRow(pageId,data,ref,ts));write(LP.SHEET_KEY,sheet);
  recordEvents(LP.trackEvents(pageId,'lead_submit',ref,ts));
  var conf=form.querySelector('[data-confirmation]');
  if(conf){
   conf.hidden=false;
   conf.innerHTML='<strong>Thank you, '+data.name.trim()+'.</strong> Your demo reference is <strong>'+ref+'</strong>. Summary: '+LP.PAGES[pageId].label+' — interest: '+data.interest+'; phone: '+data.phone.trim()+'. This is demo data stored only in this browser (local sheet log). In production this form posts to the client\u2019s Google Sheet.';
   conf.setAttribute('tabindex','-1');conf.focus({preventScroll:false});
  }
  form.querySelector('[data-form-fields]').style.display='none';
 });
});

/* SaaS pricing toggle — recomputes exactly via logic.priceLabel */
var toggle=document.querySelector('[data-billing-toggle]');
if(toggle){
 var cycle='monthly';
 function render(){
  document.querySelectorAll('[data-price]').forEach(function(el){
   var m=parseInt(el.getAttribute('data-price'),10);el.textContent=LP.priceLabel(m,cycle);
  });
  toggle.textContent=cycle==='monthly'?'Billing: Monthly (switch to Yearly — 2 months free)':'Billing: Yearly (switch to Monthly)';
  toggle.setAttribute('aria-pressed',cycle==='yearly'?'true':'false');
  var note=document.querySelector('[data-billing-note]');if(note)note.textContent=cycle==='monthly'?'Showing monthly prices. Yearly billing = monthly \u00D7 10 (two months free).':'Showing yearly prices (monthly \u00D7 10). Switch back any time — demo prices only.';
 }
 toggle.addEventListener('click',function(){cycle=cycle==='monthly'?'yearly':'monthly';render();});
 render();
}

/* Logs page */
var logsRoot=document.querySelector('[data-logs]');
if(logsRoot){
 function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;');}
 function renderLogs(){
  var sheet=read(LP.SHEET_KEY),events=read(LP.EVENT_KEY);
  var sBody=document.querySelector('[data-sheet-body]'),eBody=document.querySelector('[data-event-body]');
  sBody.innerHTML=sheet.length?sheet.map(function(r){return '<tr><td>'+esc(r.timestamp)+'</td><td>'+esc(r.page)+'</td><td>'+esc(r.name)+'</td><td>'+esc(r.phone)+'</td><td>'+esc(r.interest)+'</td><td>'+esc(r.ref)+'</td></tr>';}).join(''):'<tr><td colspan="6">No leads yet — submit a demo form on any landing page.</td></tr>';
  eBody.innerHTML=events.length?events.map(function(r){return '<tr><td>'+esc(r.timestamp)+'</td><td>'+esc(r.source)+'</td><td>'+esc(r.event)+'</td><td>'+esc(r.page)+'</td><td>'+esc(r.detail)+'</td></tr>';}).join(''):'<tr><td colspan="5">No events yet.</td></tr>';
  var c=document.querySelector('[data-log-counts]');if(c)c.textContent='Sheet rows: '+sheet.length+' · Events: '+events.length;
 }
 renderLogs();
 var clearBtn=document.querySelector('[data-clear-logs]');
 if(clearBtn)clearBtn.addEventListener('click',function(){localStorage.removeItem(LP.SHEET_KEY);localStorage.removeItem(LP.EVENT_KEY);renderLogs();});
}
})();
