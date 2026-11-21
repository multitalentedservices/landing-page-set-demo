/* Landing Page Set — shared pure logic (site + battery). DEMO data only.
   Integrations are LOCAL STUBS: no live Google/Meta endpoints are ever called. */
(function(root){
'use strict';
var ANALYTICS_CONFIG={ga4:{measurementId:'G-DEMO-000000',mode:'local-stub'},metaPixel:{pixelId:'DEMO-PIXEL-000000',mode:'local-stub'}};
var SHEET_KEY='lp_sheet_log', EVENT_KEY='lp_event_log';
var WA_NUMBER='923000000000';
var PAGES={
 saas:{id:'saas',label:'Billora (SaaS)',offer:'a free Billora demo for invoicing',interests:['Invoicing & billing','Inventory basics','Payments & reminders','Full demo walkthrough']},
 agency:{id:'agency',label:'Studio Kinetiq (Agency)',offer:'a Studio Kinetiq brand project enquiry',interests:['Brand identity','Website design','Campaign creative','Motion & social content']},
 local:{id:'local',label:'CoolCare AC Services (Local)',offer:'a CoolCare service visit in Gujranwala',interests:['AC repair','AC installation','AC gas refill','Deep home cleaning','Plumbing repair']}
};
var TIERS=[
 {id:'starter',name:'Starter',monthly:12,features:['Up to 50 invoices / month','1 user','Payment reminders','Email support']},
 {id:'growth',name:'Growth',monthly:29,features:['Unlimited invoices','5 users','Inventory basics','WhatsApp reminders','Priority support']},
 {id:'pro',name:'Pro',monthly:59,features:['Everything in Growth','Unlimited users','Multi-branch reports','API access','Dedicated support']}
];
function priceFor(monthly,cycle){ if(cycle==='yearly') return monthly*10; return monthly; }
function priceLabel(monthly,cycle){ var p=priceFor(monthly,cycle); return cycle==='yearly'?('$'+p+' / year'):('$'+p+' / month'); }
function validName(v){return typeof v==='string'&&v.trim().length>=3;}
function validPhone(v){var d=String(v||'').replace(/[\s-]/g,'');return /^(\+92|0)3\d{9}$/.test(d);}
function validateLead(o){
 var e={};
 if(!validName(o.name))e.name='Name must be at least 3 characters — please enter your full name.';
 if(!validPhone(o.phone))e.phone='Enter a Pakistani mobile in the format 03XX XXXXXXX (11 digits starting 03).';
 if(!o.interest)e.interest='Please choose what you are interested in — pick one option from the list.';
 return e;
}
function makeRef(pageId,name,phone){
 var s=String(pageId||'')+'|'+String(name||'').trim().toLowerCase()+'|'+String(phone||'').replace(/\D/g,''),h=0;
 for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))>>>0;}
 return 'LP-DEMO-'+String(1000+(h%9000));
}
function sheetRow(pageId,data,ref,ts){return{timestamp:ts,page:pageId,name:data.name,phone:data.phone,interest:data.interest,message:data.message||'',ref:ref};}
function trackEvents(pageId,eventName,detail,ts){
 return[
  {timestamp:ts,source:'ga4',id:ANALYTICS_CONFIG.ga4.measurementId,event:eventName,page:pageId,detail:detail||''},
  {timestamp:ts,source:'meta_pixel',id:ANALYTICS_CONFIG.metaPixel.pixelId,event:eventName,page:pageId,detail:detail||''}
 ];
}
function waEvent(pageId,ts){return trackEvents(pageId,'whatsapp_click','wa.me link',ts);}
function waLink(pageId){
 var p=PAGES[pageId];var text='Assalam-o-Alaikum (DEMO), I am interested in '+p.offer+'. Please share details.';
 return 'https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(text);
}
function luminance(hex){var c=hex.replace('#','');var rgb=[0,2,4].map(function(i){var v=parseInt(c.substr(i,2),16)/255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4);});return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];}
function contrast(a,b){var l1=luminance(a),l2=luminance(b);if(l1<l2){var t=l1;l1=l2;l2=t;}return (l1+0.05)/(l2+0.05);}
var API={ANALYTICS_CONFIG:ANALYTICS_CONFIG,SHEET_KEY:SHEET_KEY,EVENT_KEY:EVENT_KEY,WA_NUMBER:WA_NUMBER,PAGES:PAGES,TIERS:TIERS,priceFor:priceFor,priceLabel:priceLabel,validName:validName,validPhone:validPhone,validateLead:validateLead,makeRef:makeRef,sheetRow:sheetRow,trackEvents:trackEvents,waEvent:waEvent,waLink:waLink,contrast:contrast};
if(typeof module!=='undefined'&&module.exports)module.exports=API;root.LP=API;
})(typeof window!=='undefined'?window:globalThis);
