const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const mouseGlow = document.getElementById("mouseGlow");
const journeyScene = document.getElementById("journeyScene");
const sceneShell = journeyScene?.querySelector(".scene-shell");

navToggle?.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealEls.forEach(el => observer.observe(el));

document.addEventListener("mousemove", e => {
  if (!mouseGlow) return;
  mouseGlow.style.left = `${e.clientX}px`;
  mouseGlow.style.top = `${e.clientY}px`;
});

if (
  journeyScene &&
  sceneShell &&
  window.matchMedia("(pointer:fine)").matches
) {
  journeyScene.addEventListener("mousemove", e => {
    const rect = journeyScene.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 6;
    const rotateX = (0.5 - y) * 5;

    sceneShell.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  journeyScene.addEventListener("mouseleave", () => {
    sceneShell.style.transform = "";
  });
}

document.querySelectorAll(".tilt").forEach(card => {
  if (!window.matchMedia("(pointer:fine)").matches) return;

  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rx = (0.5 - y) * 5;
    const ry = (x - 0.5) * 5;

    card.style.transform =
      `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
