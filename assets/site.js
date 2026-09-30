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

// Price lookup: ten real entries from the book (verified against eBay sold listings, 90 days to September 2026)
const SAMPLES = [
  ["Seiko \u2018Pogue\u2019", "6139-6002", 550, 925, 950, 157, "The most faked-up vintage Seiko. Reproduction yellow dials are everywhere."],
  ["Seiko \u2018Captain Willard\u2019", "6105-8110", 1250, 1850, 2200, 40, "A replaced bezel insert, or a case that has lost its shape to polishing."],
  ["Seiko SKX007", "SKX007", 175, 325, 375, 118, "Modified watches, and \u2018new old stock\u2019 claims with no box or papers."],
  ["Seiko \u2018Turtle\u2019", "6309-7040", 350, 625, 700, 95, "Aftermarket dials and bezels. Very common on this one."],
  ["King Seiko 45KS", "4502-7000", 500, 950, 1050, 16, "The wrong crown, and polishing that has rounded off the sharp case edges."],
  ["Bulova Accutron Spaceview", "214", 575, 700, 800, 123, "A dead coil. Repairs are specialist work and not cheap."],
  ["Omega Speedmaster Professional", "145.022", 3800, 5000, 5500, 33, "A service dial and hands, or a bezel from a later model."],
  ["Rolex Datejust", "1601", 4000, 5250, 5500, 168, "Aftermarket dials, often with added diamonds, and polished cases."],
  ["Rolex Submariner", "5513", 9500, 12000, 13250, 20, "Relumed or service dials sold as original, and \u2018rare dial\u2019 stories."],
  ["Rolex GMT-Master", "1675", 8000, 13500, 16750, 25, "Reproduction bezel inserts and dials."],
];
const usd = (n) => "$" + n.toLocaleString("en-US");
document.querySelectorAll("[data-lookup]").forEach((box, k) => {
  const id = "lookup-" + k;
  const compact = box.hasAttribute("data-compact");
  box.innerHTML =
    '<label class="lk-label" for="' + id + '">Choose a watch</label>' +
    '<select class="lk-select" id="' + id + '">' +
    SAMPLES.map((s, i) => '<option value="' + i + '">' + s[0] + " (" + s[1] + ")</option>").join("") +
    "</select>" +
    '<div class="lk-card" aria-live="polite"></div>';
  const sel = box.querySelector("select"), card = box.querySelector(".lk-card");
  const show = () => {
    const s = SAMPLES[sel.value];
    card.innerHTML =
      '<div class="lk-grid"><div><small>Fair range</small><b>' + usd(s[2]) + " to " + usd(s[3]) + "</b></div>" +
      "<div><small>Never pay more than</small><b>" + usd(s[4]) + "</b></div></div>" +
      '<p class="lk-flag"><strong>Watch out for:</strong> ' + s[6] + "</p>" +
      (compact ? "" : '<p class="lk-src">Based on ' + s[5] + " eBay sales of original watches, 90 days to September 2026.</p>");
  };
  sel.addEventListener("change", show);
  show();
});

// Phone buy bar: shows once the top of the page is out of view, hides at the final call to action
const bar = document.querySelector(".buybar");
if (bar && "IntersectionObserver" in window) {
  let heroOut = false, lastIn = false;
  const update = () => { const on = heroOut && !lastIn; bar.classList.toggle("show", on); bar.setAttribute("aria-hidden", on ? "false" : "true"); bar.querySelector("a").tabIndex = on ? 0 : -1; };
  const hero = document.querySelector(".hero"), last = document.querySelector(".last");
  if (hero) new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting; update(); }).observe(hero);
  if (last) new IntersectionObserver(([e]) => { lastIn = e.isIntersecting; update(); }).observe(last);
}
