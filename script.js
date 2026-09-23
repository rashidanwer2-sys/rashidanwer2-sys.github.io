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

/* ========================================
   HERO CODE TABS
======================================== */

const codeTabs = document.querySelectorAll(".code-tab");
const codeContents = document.querySelectorAll(".code-content");

codeTabs.forEach((tab) => {

  tab.addEventListener("click", () => {

    const target = tab.dataset.code;

    codeTabs.forEach((item) => {
      item.classList.remove("active");
    });

    codeContents.forEach((content) => {
      content.classList.remove("active");
    });

    tab.classList.add("active");

    const targetContent =
      document.getElementById(target);

    if (targetContent) {
      targetContent.classList.add("active");
    }

  });

});

/* =========================================
   TESTIMONIAL CAROUSEL
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.querySelector(".testimonial-carousel");
  const track = document.querySelector(".testimonial-track");
  const cards = document.querySelectorAll(".testimonial-card");

  const prevButton = document.querySelector(".testimonial-prev");
  const nextButton = document.querySelector(".testimonial-next");

  const dotsContainer = document.querySelector(".testimonial-dots");

  if (
    !carousel ||
    !track ||
    !cards.length ||
    !dotsContainer
  ) {
    return;
  }


  let currentIndex = 0;
  let touchStartX = 0;
  let touchEndX = 0;


  /* -----------------------------------------
     Visible cards
  ----------------------------------------- */

  function getVisibleCards() {

    if (window.innerWidth <= 650) {
      return 1;
    }

    if (window.innerWidth <= 950) {
      return 2;
    }

    return 3;
  }


  /* -----------------------------------------
     Maximum slide index
  ----------------------------------------- */

  function getMaxIndex() {

    return Math.max(
      0,
      cards.length - getVisibleCards()
    );

  }


  /* -----------------------------------------
     Create dots
  ----------------------------------------- */

  function createDots() {

    dotsContainer.innerHTML = "";

    const totalPositions =
      getMaxIndex() + 1;

    for (
      let i = 0;
      i < totalPositions;
      i++
    ) {

      const dot =
        document.createElement("button");

      dot.classList.add(
        "testimonial-dot"
      );

      dot.setAttribute(
        "aria-label",
        `Go to testimonial ${i + 1}`
      );

      dot.addEventListener(
        "click",
        () => {

          currentIndex = i;
          updateCarousel();

        }
      );

      dotsContainer.appendChild(dot);

    }

  }


  /* -----------------------------------------
     Move carousel
  ----------------------------------------- */

  function updateCarousel() {

    const firstCard = cards[0];

    const trackStyles =
      window.getComputedStyle(track);

    const gap =
      parseFloat(trackStyles.gap) || 0;

    const cardWidth =
      firstCard.getBoundingClientRect().width;

    const moveAmount =
      (cardWidth + gap) * currentIndex;

    track.style.transform =
      `translateX(-${moveAmount}px)`;


    const dots =
      dotsContainer.querySelectorAll(
        ".testimonial-dot"
      );

    dots.forEach(
      (dot, index) => {

        dot.classList.toggle(
          "active",
          index === currentIndex
        );

      }
    );

  }


  /* -----------------------------------------
     Next
  ----------------------------------------- */

  function nextSlide() {

    const maxIndex =
      getMaxIndex();

    currentIndex =
      currentIndex >= maxIndex
        ? 0
        : currentIndex + 1;

    updateCarousel();

  }


  /* -----------------------------------------
     Previous
  ----------------------------------------- */

  function previousSlide() {

    const maxIndex =
      getMaxIndex();

    currentIndex =
      currentIndex <= 0
        ? maxIndex
        : currentIndex - 1;

    updateCarousel();

  }


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      nextSlide
    );

  }


  if (prevButton) {

    prevButton.addEventListener(
      "click",
      previousSlide
    );

  }


  /* -----------------------------------------
     Mobile swipe
  ----------------------------------------- */

  carousel.addEventListener(
    "touchstart",
    (event) => {

      touchStartX =
        event.changedTouches[0].screenX;

    },
    { passive: true }
  );


  carousel.addEventListener(
    "touchend",
    (event) => {

      touchEndX =
        event.changedTouches[0].screenX;

      const difference =
        touchStartX - touchEndX;


      if (Math.abs(difference) < 45) {
        return;
      }


      if (difference > 0) {
        nextSlide();
      } else {
        previousSlide();
      }

    },
    { passive: true }
  );


  /* -----------------------------------------
     Resize
  ----------------------------------------- */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {

      clearTimeout(resizeTimer);

      resizeTimer =
        setTimeout(() => {

          const maxIndex =
            getMaxIndex();

          if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
          }

          createDots();
          updateCarousel();

        }, 150);

    }
  );


  /* Initial setup */

  createDots();
  updateCarousel();

});

/* Footer year */

const currentYear =
  document.getElementById("currentYear");

if (currentYear) {
  currentYear.textContent =
    new Date().getFullYear();
}

/* Deterrents only — not real source protection. Browser-delivered HTML/CSS/JS can always be inspected. 
document.addEventListener("contextmenu",e=>e.preventDefault());
document.addEventListener("keydown",e=>{
  const k=e.key.toLowerCase();
  if(e.key==="F12" || (e.ctrlKey&&e.shiftKey&&["i","j","c"].includes(k)) || (e.ctrlKey&&k==="u")){
    e.preventDefault();
  }
}); */
