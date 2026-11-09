/* Domma Tecnologia · página de trabalhos */
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  const ano = $("#year");
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---------- menu ---------- */
  const nav = $("#nav");
  const wa = $(".wa-float");
  const onScroll = () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
    if (wa) wa.classList.toggle("show", window.scrollY > window.innerHeight * 0.5);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const toggle = $("#nav-toggle");
  const links = $("#nav-links");
  const setMenu = (open) => {
    links.classList.toggle("open", open);
    nav.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    toggle.querySelector("use").setAttribute("href", open ? "#i-x" : "#i-menu");
  };
  toggle.addEventListener("click", () => setMenu(!links.classList.contains("open")));
  $$("a", links).forEach((a) => a.addEventListener("click", () => setMenu(false)));

  const drop = $("#nav-drop");
  const dropBtn = $("#nav-drop-btn");
  const largo = window.matchMedia("(min-width: 1081px)");
  const setDrop = (open) => { drop.classList.toggle("open", open); dropBtn.setAttribute("aria-expanded", String(open)); };
  dropBtn.addEventListener("click", (e) => { e.stopPropagation(); setDrop(!drop.classList.contains("open")); });
  drop.addEventListener("mouseenter", () => { if (largo.matches) setDrop(true); });
  drop.addEventListener("mouseleave", () => { if (largo.matches) setDrop(false); });
  drop.addEventListener("focusout", (e) => { if (largo.matches && !drop.contains(e.relatedTarget)) setDrop(false); });
  document.addEventListener("click", (e) => { if (!drop.contains(e.target)) setDrop(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (drop.classList.contains("open")) { setDrop(false); dropBtn.focus(); }
    setMenu(false);
  });

  /* ---------- revelação no scroll ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.08, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el, i) => {
    if (el.classList.contains("trabalho")) el.style.setProperty("--d", `${(i % 2) * 90}ms`);
    io.observe(el);
  });

  /* ---------- filtros ---------- */
  const filtros = $$(".filtro");
  const cards = $$(".trabalho");
  const vazio = $("#filtro-vazio");
  filtros.forEach((f) => f.addEventListener("click", () => {
    const alvo = f.dataset.filtro;
    filtros.forEach((x) => x.setAttribute("aria-pressed", String(x === f)));
    let visiveis = 0;
    cards.forEach((c) => {
      const mostra = alvo === "todos" || c.dataset.filtros.split(" ").includes(alvo);
      c.hidden = !mostra;
      if (mostra) { visiveis++; c.classList.add("in"); }
    });
    vazio.hidden = visiveis > 0;
  }));

  /* ---------- chegada por link (#projeto): destaca o card ---------- */
  if (location.hash && !reduce) {
    const alvo = document.getElementById(location.hash.slice(1));
    if (alvo && alvo.classList.contains("trabalho")) {
      alvo.classList.add("in");
      alvo.animate([{ boxShadow: "0 0 0 0 rgba(123,97,255,0)" }, { boxShadow: "0 0 0 4px rgba(123,97,255,.55)" }, { boxShadow: "0 0 0 0 rgba(123,97,255,0)" }], { duration: 1600, delay: 400, easing: "cubic-bezier(0.45, 0, 0.55, 1)" });
    }
  }
})();
