// Premium signature (SaaS): live product-UI tabs inside the Billora mock. Vanilla, no vendor JS.
(function(){var tabs=[].slice.call(document.querySelectorAll("[data-ptab]"));if(!tabs.length)return;
function select(t,focus){tabs.forEach(function(x){var on=x===t;x.setAttribute("aria-selected",on?"true":"false");x.tabIndex=on?0:-1;var p=document.querySelector('[data-ppanel="'+x.getAttribute("data-ptab")+'"]');if(p)p.hidden=!on;});if(focus)t.focus();}
tabs.forEach(function(t,i){t.addEventListener("click",function(){select(t,false);});
t.addEventListener("keydown",function(e){var j=null;if(e.key==="ArrowRight")j=(i+1)%tabs.length;if(e.key==="ArrowLeft")j=(i-1+tabs.length)%tabs.length;if(j!==null){e.preventDefault();select(tabs[j],true);}});});})();
