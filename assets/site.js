// === Edit these links once the store exists (Lemon Squeezy or Gumroad) ===
const TK = {
  buyUrl: "#order",        // checkout link for the Price Bible ($39): paste the Gumroad link here
  leadUrl: "assets/60-second-vintage-watch-check.pdf", // swap for the free product link that collects the email
  youtubeUrl: "https://www.youtube.com/",
};
// For now every link on the site goes to the paid book, including the free checklist buttons.
TK.leadUrl = TK.buyUrl;

document.querySelectorAll("[data-link]").forEach((a) => {
  const url = TK[a.dataset.link + "Url"];
  if (url) a.href = url;
});

// Gentle reveal on scroll
const els = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  els.forEach((el) => io.observe(el));
} else {
  els.forEach((el) => el.classList.add("in"));
}

// Page preview zoom
const dlg = document.querySelector("dialog.zoom");
if (dlg) {
  const img = dlg.querySelector("img");
  document.querySelectorAll("[data-zoom]").forEach((b) => b.addEventListener("click", () => {
    img.src = b.dataset.zoom; img.alt = b.querySelector("img").alt; dlg.showModal();
  }));
  dlg.addEventListener("click", () => dlg.close());
}

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
