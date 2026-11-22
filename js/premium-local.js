// Premium signature (Local): live quote calculator using only the page's published demo prices.
(function(){var s=document.querySelector("[data-calc-service]"),q=document.querySelector("[data-calc-qty]"),t=document.querySelector("[data-calc-total]");if(!s||!q||!t)return;
function fmt(n){return "PKR "+n.toLocaleString("en-US");}
function calc(){var qty=Math.max(1,Math.min(20,parseInt(q.value,10)||1));t.textContent=fmt((parseInt(s.value,10)||0)*qty);}
s.addEventListener("change",calc);q.addEventListener("input",calc);calc();})();
