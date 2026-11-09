/* Domma Tecnologia · interações do site */
(() => {
  "use strict";
  document.documentElement.classList.add("js");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const WA = "5519984607000";

  $("#year").textContent = new Date().getFullYear();

  /* ---------- nav ---------- */
  const nav = $("#nav");
  const wa = $(".wa-float");
  const onScroll = () => {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 24);
    wa.classList.toggle("show", y > window.innerHeight * 0.8);
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
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- menu suspenso das soluções ---------- */
  const drop = $("#nav-drop");
  const dropBtn = $("#nav-drop-btn");
  const largo = window.matchMedia("(min-width: 1081px)");
  const setDrop = (open) => { drop.classList.toggle("open", open); dropBtn.setAttribute("aria-expanded", String(open)); };
  dropBtn.addEventListener("click", (e) => { e.stopPropagation(); setDrop(!drop.classList.contains("open")); });
  drop.addEventListener("mouseenter", () => { if (largo.matches) setDrop(true); });
  drop.addEventListener("mouseleave", () => { if (largo.matches) setDrop(false); });
  drop.addEventListener("focusout", (e) => { if (largo.matches && !drop.contains(e.relatedTarget)) setDrop(false); });
  document.addEventListener("click", (e) => { if (!drop.contains(e.target)) setDrop(false); });
  $$("a", drop).forEach((a) => a.addEventListener("click", () => setDrop(false)));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && drop.classList.contains("open")) { setDrop(false); dropBtn.focus(); } });

  /* ---------- reveal com escalonamento ---------- */
  const groups = new Map();
  $$(".reveal").forEach((el) => {
    const parent = el.parentElement;
    const i = groups.get(parent) || 0;
    el.style.setProperty("--d", `${Math.min(i, 6) * 80}ms`);
    groups.set(parent, i + 1);
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------- trechos de código nos cards ---------- */
  const snippets = ["<Painel />", "agente.ouvir()", "fluxo.rodar()", "app.build()", "api.conectar()", "ia.avaliar()"];
  $$(".card").forEach((c, i) => c.setAttribute("data-code", snippets[i] || ""));

  /* ---------- palavra do título digitada como código (hero) ----------
     Em qualquer instante a palavra é legível: apaga e digita letra a letra.
     A primeira troca só acontece depois de alguns segundos, para que
     prints e prévias tirados ao abrir a página mostrem o título completo. */
  const words = ["sistemas web", "agentes de IA", "automações", "apps", "sites", "integrações"];
  const scr = $("#scramble");
  const typeWord = async (to) => {
    scr.classList.add("typing");
    for (let t = scr.textContent; t.length; t = t.slice(0, -1)) { scr.textContent = t; await sleep(38); }
    scr.textContent = "";
    await sleep(220);
    for (let i = 1; i <= to.length; i++) { scr.textContent = to.slice(0, i); await sleep(70); }
    scr.classList.remove("typing");
  };
  if (!reduce) {
    let w = 0;
    const loop = async () => {
      if (!document.hidden) { w = (w + 1) % words.length; await typeWord(words[w]); }
      setTimeout(loop, 3400);
    };
    setTimeout(loop, 5000);
  }

  /* ---------- editor de código digitando ---------- */
  // cada linha é uma lista de [classe, texto]
  const K = "tk-k", S = "tk-s", C = "tk-c", F = "tk-f", P = "tk-p", _ = "";
  const program = [
    [[C, "// agente de atendimento · Domma IA"]],
    [[K, "import"], [_, " { domma } "], [K, "from"], [S, ' "@domma/ia"'], [P, ";"]],
    [],
    [[K, "const"], [_, " agente "], [P, "="], [_, " domma."], [F, "agente"], [P, "({"]],
    [[_, "  nome: "], [S, '"Atendimento"'], [P, ","]],
    [[_, "  canais: "], [P, "["], [S, '"whatsapp"'], [P, ", "], [S, '"site"'], [P, "],"]],
    [[_, "  base: "], [K, "await"], [_, " domma."], [F, "docs"], [P, "("], [S, '"manuais/"'], [P, "),"]],
    [[_, "  acoes: "], [P, "["], [_, "agendarVisita, emitirBoleto"], [P, "],"]],
    [[_, "  humano: "], [S, '"quando o cliente pedir"'], [P, ","]],
    [[P, "});"]],
    [],
    [[K, "await"], [_, " agente."], [F, "publicar"], [P, "();"]],
  ];
  const code = $("#code");
  const gutter = $("#gutter");
  gutter.innerHTML = program.map((_l, i) => `<div>${i + 1}</div>`).join("");

  const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;");
  const renderLine = (segs, upto = Infinity) => {
    let out = "", n = 0;
    for (const [cls, txt] of segs) {
      if (n >= upto) break;
      const part = txt.slice(0, Math.max(0, upto - n));
      n += txt.length;
      out += cls ? `<span class="${cls}">${esc(part)}</span>` : esc(part);
    }
    return out;
  };
  const lineLen = (segs) => segs.reduce((a, [, t]) => a + t.length, 0);

  const term = $("#terminal");
  const statusAi = $("#status-ai");
  const statusText = $("#status-text");
  const termLines = [
    ['<span class="muted">$ domma deploy --producao</span>', 0],
    ['<span class="ai">ia</span>   indexando 248 documentos da base', 500],
    ['<span class="ok">ok</span>   build concluído em 38s', 700],
    ['<span class="ok">ok</span>   agente online · whatsapp, site', 600],
  ];

  const typeProgram = async () => {
    if (reduce) {
      code.innerHTML = program.map((l) => renderLine(l)).join("\n");
      term.innerHTML = termLines.map(([h]) => `<div class="term-line">${h}</div>`).join("");
      statusAi.classList.add("done"); statusText.textContent = "Agente no ar";
      return;
    }
    while (true) {
      term.innerHTML = "";
      statusAi.classList.remove("done");
      statusText.textContent = "Domma IA escrevendo";
      const done = [];
      for (const line of program) {
        const len = lineLen(line);
        for (let c = 0; c <= len; c++) {
          code.innerHTML = [...done, renderLine(line, c) + '<span class="caret"></span>'].join("\n");
          await sleep(c === 0 ? 90 : 16 + Math.random() * 30);
        }
        done.push(renderLine(line));
      }
      code.innerHTML = done.join("\n") + '<span class="caret"></span>';
      statusText.textContent = "Publicando";
      for (const [html, delay] of termLines) {
        await sleep(delay || 400);
        const d = document.createElement("div");
        d.className = "term-line";
        d.innerHTML = html;
        term.appendChild(d);
      }
      statusAi.classList.add("done");
      statusText.textContent = "Agente no ar";
      await sleep(5200);
    }
  };
  // começa quando o editor estiver visível
  const editorIO = new IntersectionObserver((e) => {
    if (e[0].isIntersecting) { editorIO.disconnect(); setTimeout(typeProgram, reduce ? 0 : 500); }
  });
  editorIO.observe($(".editor"));

  /* ---------- galeria das soluções ---------- */
  $$("[data-galeria]").forEach((g) => {
    const img = $(".janela-img", g);
    const thumbs = $$(".thumb", g);
    thumbs.forEach((t) => t.addEventListener("click", () => {
      if (t.getAttribute("aria-pressed") === "true") return;
      thumbs.forEach((x) => x.setAttribute("aria-pressed", String(x === t)));
      const trocar = () => {
        img.srcset = `${t.dataset.srcSm} 800w, ${t.dataset.src} 1600w`;
        img.src = t.dataset.src;
        img.alt = t.dataset.alt;
      };
      if (reduce) { trocar(); return; }
      img.classList.add("trocando");
      setTimeout(() => { trocar(); img.onload = () => img.classList.remove("trocando"); if (img.complete) img.classList.remove("trocando"); }, 200);
    }));
  });

  /* ---------- demonstração de agentes ---------- */
  const loader = `<svg class="sinal-loader" viewBox="158 158 604 346" aria-hidden="true"><circle class="sl-dot" cx="459.5" cy="204.5" r="43.5"/><path class="sl-wave" pathLength="100" d="M197 384C228 328 268 271 312 271C372 271 404 465 465 465C526 465 572 271 621 271C672 271 694 328 723 384"/></svg>`;
  const scripts = {
    atendimento: {
      title: "Agente de atendimento",
      steps: [
        ["user", "Oi! Vocês fazem a revisão do ar-condicionado no sábado?"],
        ["think", "Consultando agenda"],
        ["tool", '<b>agenda.buscar</b>(dia: "sábado") <span class="ok">→ 2 horários livres</span>'],
        ["bot", "Fazemos sim! Neste sábado tenho 9h ou 14h. Qual fica melhor para você?"],
        ["user", "14h, por favor."],
        ["think", "Agendando"],
        ["tool", '<b>agenda.reservar</b>("sáb 14h") <span class="ok">→ confirmado</span>'],
        ["bot", "Pronto, sábado às 14h está reservado. Enviei a confirmação e um lembrete chega na sexta."],
      ],
    },
    comercial: {
      title: "Agente comercial",
      steps: [
        ["user", "Quanto fica o plano para uma equipe de 12 pessoas?"],
        ["think", "Analisando tabela de preços"],
        ["tool", '<b>precos.calcular</b>(usuarios: 12) <span class="ok">→ plano Equipe</span>'],
        ["bot", "Para 12 pessoas o ideal é o plano Equipe. Posso te enviar a proposta em PDF e marcar uma demonstração?"],
        ["user", "Pode sim, quinta de manhã."],
        ["think", "Registrando oportunidade"],
        ["tool", '<b>crm.criarLead</b>(origem: "whatsapp") <span class="ok">→ lead #4821</span>'],
        ["bot", "Feito! Proposta enviada e demonstração marcada para quinta às 10h com o nosso time."],
      ],
    },
    financeiro: {
      title: "Agente financeiro",
      steps: [
        ["user", "Perdi o boleto deste mês. Consegue mandar de novo?"],
        ["think", "Verificando cadastro"],
        ["tool", '<b>erp.faturas</b>(cliente: "verificado") <span class="ok">→ 1 em aberto</span>'],
        ["bot", "Encontrei a fatura com vencimento no dia 10. Prefere boleto ou Pix?"],
        ["user", "Pix."],
        ["think", "Gerando cobrança"],
        ["tool", '<b>pagamentos.pix</b>(fatura) <span class="ok">→ QR Code gerado</span>'],
        ["bot", "Aqui está o seu Pix copia e cola. Assim que o pagamento cair, envio o recibo por aqui."],
      ],
    },
  };
  const chatBody = $("#chat-body");
  const chatTitle = $("#chat-title");
  let run = 0;
  const playAgent = async (key) => {
    const id = ++run;
    const s = scripts[key];
    chatTitle.textContent = s.title;
    chatBody.innerHTML = "";
    for (const [kind, text] of s.steps) {
      if (id !== run) return;
      const el = document.createElement("div");
      if (kind === "think") {
        el.className = "thinking";
        el.innerHTML = `${loader}<span>${text}</span>`;
        chatBody.appendChild(el);
        await sleep(reduce ? 0 : 1100);
        el.remove();
        continue;
      }
      el.className = kind === "user" ? "msg msg-user" : kind === "bot" ? "msg msg-bot" : "msg-tool";
      el.innerHTML = text;
      chatBody.appendChild(el);
      await sleep(reduce ? 0 : kind === "user" ? 900 : kind === "tool" ? 700 : 1500);
    }
  };
  const tabs = $$(".agent-tab");
  tabs.forEach((t) => t.addEventListener("click", () => {
    tabs.forEach((x) => x.setAttribute("aria-selected", String(x === t)));
    playAgent(t.dataset.agent);
  }));
  const chatIO = new IntersectionObserver((e) => {
    if (e[0].isIntersecting) { chatIO.disconnect(); playAgent("atendimento"); }
  }, { threshold: 0.3 });
  chatIO.observe($(".chat"));

  /* ---------- onda do processo desenhada pelo scroll ---------- */
  const pp = $("#process-path");
  const process = $(".process");
  const ppLen = pp.getTotalLength();
  pp.style.strokeDasharray = ppLen;
  pp.style.strokeDashoffset = reduce ? 0 : ppLen;

  // posiciona os pontos de cada etapa exatamente sobre a onda
  const steps = $$(".step");
  const placeDots = () => {
    if (getComputedStyle(pp.parentNode).display === "none") return;
    const pr = process.getBoundingClientRect();
    const samples = [];
    for (let i = 0; i <= 600; i++) samples.push(pp.getPointAtLength((ppLen * i) / 600));
    steps.forEach((s) => {
      const sr = s.getBoundingClientRect();
      const x = ((sr.left - pr.left) / pr.width) * 1200;
      const pt = samples.reduce((a, b) => (Math.abs(b.x - x) < Math.abs(a.x - x) ? b : a));
      s.style.setProperty("--dy", `${pt.y - (sr.top - pr.top) - 7}px`);
    });
  };
  placeDots();
  window.addEventListener("resize", placeDots);
  document.fonts && document.fonts.ready.then(placeDots);

  /* ---------- manifesto acende palavra a palavra ---------- */
  const mt = $("#manifesto-text");
  mt.innerHTML = mt.textContent.trim().split(/\s+/).map((w) => `<span class="w">${w}</span>`).join(" ");
  const mWords = $$(".w", mt);
  if (reduce) mWords.forEach((w) => w.classList.add("lit"));

  let ticking = false;
  const onScrollFx = () => {
    ticking = false;
    const vh = window.innerHeight;
    if (!reduce) {
      const r = process.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.2)));
      pp.style.strokeDashoffset = ppLen * (1 - Math.min(1, p * 1.6));

      const m = mt.getBoundingClientRect();
      const mp = Math.min(1, Math.max(0, (vh * 0.8 - m.top) / (m.height + vh * 0.25)));
      const lit = Math.round(mp * mWords.length * 1.15);
      mWords.forEach((w, i) => w.classList.toggle("lit", i < lit));
    }
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(onScrollFx); }
  }, { passive: true });
  onScrollFx();

  /* ---------- formulário → WhatsApp ---------- */
  const form = $("#form");
  const tel = $("#f-tel");
  tel.addEventListener("input", () => {
    let d = tel.value.replace(/\D/g, "").slice(0, 11);
    if (d.length > 6) tel.value = `(${d.slice(0, 2)}) ${d.slice(2, d.length - 4)}-${d.slice(-4)}`;
    else if (d.length > 2) tel.value = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    else tel.value = d;
  });
  const setErr = (input, errEl, msg) => {
    input.classList.toggle("invalid", !!msg);
    input.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) input.setAttribute("aria-describedby", errEl.id); else input.removeAttribute("aria-describedby");
    errEl.textContent = msg || "";
  };
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = $("#f-nome");
    let ok = true;
    if (nome.value.trim().length < 2) { setErr(nome, $("#e-nome"), "Diga como podemos te chamar."); ok = false; }
    else setErr(nome, $("#e-nome"));
    if (tel.value.replace(/\D/g, "").length < 10) { setErr(tel, $("#e-tel"), "Use o número com DDD, ex.: (19) 98460-7000."); ok = false; }
    else setErr(tel, $("#e-tel"));
    if (!ok) { form.querySelector(".invalid").focus(); return; }

    const servicos = $$('input[name="servico"]:checked').map((c) => c.value);
    const empresa = $("#f-empresa").value.trim();
    const msg = $("#f-msg").value.trim();
    const linhas = ["Olá, Domma! Quero um orçamento.", "", `Nome: ${nome.value.trim()}`];
    if (empresa) linhas.push(`Empresa: ${empresa}`);
    linhas.push(`WhatsApp: ${tel.value}`);
    if (servicos.length) linhas.push(`Interesse: ${servicos.join(", ")}`);
    if (msg) linhas.push("", `Projeto: ${msg}`);
    const texto = linhas.join("\n");

    const btn = $("#submit");
    btn.querySelector("span").textContent = "Abrindo o WhatsApp";
    const url = `https://wa.me/${WA}?text=${encodeURIComponent(texto)}`;
    const win = window.open(url, "_blank");
    // se o navegador bloquear a janela, oferece o link direto
    let fb = $("#wa-fallback");
    if (!fb) {
      fb = document.createElement("a");
      fb.id = "wa-fallback"; fb.className = "wa-fallback"; fb.target = "_blank"; fb.rel = "noopener";
      fb.textContent = "Não abriu? Toque aqui para abrir o WhatsApp";
      btn.after(fb);
    }
    fb.href = url;
    fb.hidden = !!win;
    setTimeout(() => { btn.querySelector("span").textContent = "Enviar pelo WhatsApp"; }, 2500);
  });
})();
