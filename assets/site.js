// Links used across the site. Every "buy" button goes to the Gumroad product.
const TK = {
  buyUrl: "https://timekeptwatches.gumroad.com/l/TheVintageWatchPriceBible",   // Gumroad product ($39)
  youtubeUrl: "https://www.youtube.com/channel/UCsdXESiOdIiiopukcP5pT6Q",
};

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
