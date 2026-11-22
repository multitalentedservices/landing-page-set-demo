// Premium signature (Agency): GSAP + SplitText kinetic-type scene at full display scale.
// Static complete state is the default; this only runs with motion allowed and libraries present.
(function(){var STATIC=/[?&]static=1(?:&|$)/.test(window.location.search)||document.documentElement.hasAttribute("data-static");if(STATIC){document.documentElement.setAttribute("data-static","");return;} /* static capture mode: kinetic headline whole, marquee band at natural scale */
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
if(!window.gsap||!window.SplitText)return;gsap.registerPlugin(SplitText);
var h=document.querySelector(".kinetic");if(!h)return;
document.documentElement.classList.add("kinetic-live");
var split=new SplitText(h,{type:"chars",charsClass:"kchar"});
gsap.from(split.chars,{yPercent:110,opacity:0,duration:0.85,ease:"power4.out",stagger:0.035,delay:0.1,clearProps:"transform,opacity"});
gsap.fromTo(".marquee-band",{scaleY:0,transformOrigin:"top"},{scaleY:1,duration:0.6,ease:"power3.out",delay:0.7,clearProps:"transform"});})();
