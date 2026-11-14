// Formosa Trails — shared script. See AGENTS.md.
// 1) Home page: count cards + region/difficulty filters
// 2) Spot pages: draw the month strip from data-best / data-ok

(function () {
  // ---------- 1. Home page ----------
  const cards = Array.from(document.querySelectorAll(".cards .card"));
  const countEl = document.getElementById("spot-count");
  if (countEl) countEl.textContent = cards.length;

  const active = { region: "All", difficulty: "All" };
  const emptyMsg = document.querySelector(".empty-msg");

  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.group; // "region" or "difficulty"
      active[group] = btn.dataset.value;
      document
        .querySelectorAll(`.filter-btn[data-group="${group}"]`)
        .forEach((b) => b.classList.toggle("active", b === btn));

      let shown = 0;
      cards.forEach((card) => {
        const ok =
          (active.region === "All" || card.dataset.region === active.region) &&
          (active.difficulty === "All" || card.dataset.difficulty === active.difficulty);
        card.classList.toggle("hidden", !ok);
        if (ok) shown++;
      });
      if (emptyMsg) emptyMsg.classList.toggle("show", shown === 0);
    });
  });

  // ---------- 2. Month strip ----------
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const parse = (s) => (s || "").split(",").map((n) => parseInt(n, 10)).filter(Boolean);

  document.querySelectorAll("ol.months").forEach((ol) => {
    const best = parse(ol.dataset.best);
    const ok = parse(ol.dataset.ok);
    MONTHS.forEach((name, i) => {
      const m = i + 1;
      const li = document.createElement("li");
      li.textContent = name;
      if (best.includes(m)) { li.className = "best"; li.title = "Best time"; }
      else if (ok.includes(m)) { li.className = "ok"; li.title = "Good"; }
      else { li.title = "Not ideal"; }
      ol.appendChild(li);
    });
  });
})();
