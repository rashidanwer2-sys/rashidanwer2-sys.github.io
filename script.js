const navToggle=document.getElementById("navToggle");
const mainNav=document.getElementById("mainNav");
const cursorGlow=document.getElementById("cursorGlow");
const heroVisual=document.getElementById("heroVisual");
const journeyWindow=heroVisual?.querySelector(".journey-window");

navToggle?.addEventListener("click",()=>{const open=mainNav.classList.toggle("open");navToggle.setAttribute("aria-expanded",String(open));});
mainNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{mainNav.classList.remove("open");navToggle.setAttribute("aria-expanded","false");}));
document.getElementById("year").textContent=new Date().getFullYear();

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.addEventListener("mousemove",e=>{if(!cursorGlow)return;cursorGlow.style.left=e.clientX+"px";cursorGlow.style.top=e.clientY+"px";});

if(heroVisual&&journeyWindow&&window.matchMedia("(pointer:fine)").matches){
  heroVisual.addEventListener("mousemove",e=>{
    const r=heroVisual.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    journeyWindow.style.transform=`perspective(1000px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*6}deg)`;
  });
  heroVisual.addEventListener("mouseleave",()=>journeyWindow.style.transform="");
}

document.querySelectorAll(".tilt").forEach(card=>{
  if(!window.matchMedia("(pointer:fine)").matches)return;
  card.addEventListener("mousemove",e=>{
    const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    card.style.transform=`perspective(700px) rotateX(${(0.5-y)*5}deg) rotateY(${(x-0.5)*5}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});

/* Deterrents only — not real source protection. Browser-delivered HTML/CSS/JS can always be inspected. */
document.addEventListener("contextmenu",e=>e.preventDefault());
document.addEventListener("keydown",e=>{
  const k=e.key.toLowerCase();
  if(e.key==="F12" || (e.ctrlKey&&e.shiftKey&&["i","j","c"].includes(k)) || (e.ctrlKey&&k==="u")){
    e.preventDefault();
  }
});
