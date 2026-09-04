const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
const heroVisual = document.getElementById("heroVisual");
const toolOrbit = heroVisual?.querySelector(".tool-orbit");
const cursorGlow = document.getElementById("cursorGlow");

navToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

document.getElementById("year").textContent = new Date().getFullYear();

const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

document.addEventListener("mousemove", e => {
  if (!cursorGlow) return;
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});

if (heroVisual && toolOrbit && window.matchMedia("(pointer:fine)").matches) {
  heroVisual.addEventListener("mousemove", e => {
    const rect = heroVisual.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * 8;
    const rotateX = (0.5 - y) * 6;

    toolOrbit.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;

    heroVisual.querySelectorAll("[data-depth]").forEach(el => {
      const depth = Number(el.dataset.depth || 1);
      const tx = (x - 0.5) * 10 * depth;
      const ty = (y - 0.5) * 10 * depth;
      el.style.marginLeft = `${tx}px`;
      el.style.marginTop = `${ty}px`;
    });
  });

  heroVisual.addEventListener("mouseleave", () => {
    toolOrbit.style.transform = "";
    heroVisual.querySelectorAll("[data-depth]").forEach(el => {
      el.style.marginLeft = "";
      el.style.marginTop = "";
    });
  });
}

document.querySelectorAll(".tilt").forEach(card => {
  if (!window.matchMedia("(pointer:fine)").matches) return;

  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const rx = (0.5 - py) * 6;
    const ry = (px - 0.5) * 6;

    card.style.transform =
      `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
