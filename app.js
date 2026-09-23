(() => {
  const now = new Date();
  const minutesAgo = (m) => new Date(now.getTime() - m * 60000);
  const daysAgo = (d, h = 10, m = 0) => {
    const x = new Date(now);
    x.setDate(x.getDate() - d);
    x.setHours(h, m, 0, 0);
    return x;
  };

  const LABELS = {
    Work: "var(--color-sky-500)",
    Personal: "var(--color-violet-500)",
    Finance: "var(--color-emerald-500)",
    Newsletter: "var(--color-amber-500)",
    Travel: "var(--color-teal-400)",
    Receipts: "var(--color-orange-500)",
    Urgent: "var(--color-red-500)",
    Sent: "var(--brand)",
  };
  const ME = "you@embox.email";

  const MAIL = [
    { from: "Priya Natarajan", subject: "Design review moved to 3pm", label: "Work", at: minutesAgo(23), unread: true,
      snippet: "Heads up — I pushed the review back an hour so Marco can join from the airport. Same room, same Figma file. I added two questions about the empty state to the doc, mostly around what we show before the first search.",
      body: [
        "Heads up — I pushed the review back an hour so Marco can join from the airport. Same room, same Figma file.",
        "I added two questions about the empty state to the doc, mostly around what we show before the first search. My instinct is that a blank list with just the search bar is the point, but I want to hear the counterargument before we commit.",
        "If 3 doesn't work for you, grab me before lunch and we'll find another slot this week.",
        "— Priya",
      ] },
    { from: "Mercury", subject: "Your September statement is ready", label: "Finance", at: minutesAgo(64), unread: true,
      snippet: "Statement for account ••4821 covering Aug 21 – Sep 20 is available. Ending balance $48,210.33. No fees were charged this period.",
      body: [
        "Your statement for account ••4821 covering Aug 21 – Sep 20 is now available.",
        "Ending balance: $48,210.33. Deposits: $61,400.00. Withdrawals: $54,912.18. No fees were charged this period.",
        "You can download the PDF from the Statements tab in your dashboard. Reply to this email or message support if anything looks off.",
      ] },
    { from: "Mom", subject: "Sunday?", label: "Personal", at: daysAgo(0, 8, 5), unread: true,
      snippet: "Dad wants to try the new Ethiopian place on Division. Around 1? Let me know if Sam is coming so I can book for four.",
      body: [
        "Dad wants to try the new Ethiopian place on Division. Around 1?",
        "Let me know if Sam is coming so I can book for four. They apparently get busy after church lets out.",
        "Also bring the book you borrowed, your aunt wants it back before her trip.",
        "Love, Mom",
      ] },
    { from: "PagerDuty", subject: "[Resolved] High error rate on api-eu-west", label: "Urgent", at: daysAgo(0, 2, 14), unread: true,
      snippet: "Incident #4412 auto-resolved after 11 minutes. Error rate peaked at 4.2% and returned to baseline at 09:14 UTC. The postmortem doc is linked below and owned by the on-call engineer.",
      body: [
        "Incident #4412 has been resolved.",
        "Triggered 09:03 UTC · Resolved 09:14 UTC · Duration 11 minutes. Error rate on api-eu-west peaked at 4.2% before returning to baseline. The alert auto-resolved after three consecutive healthy checks.",
        "A postmortem document has been created and assigned to the on-call engineer. Review is due within 48 hours.",
      ] },
    { from: "Marco Bellini", subject: "Re: Onboarding copy — final pass", label: "Work", at: daysAgo(0, 7, 48), unread: false,
      snippet: "Took your notes on the second screen. Shortened the headline and dropped “seamless”. Should be good to ship unless legal has thoughts.",
      body: [
        "Took your notes on the second screen. Shortened the headline to six words and dropped “seamless” — you were right, nobody says that out loud.",
        "The third screen still has the long disclaimer, but that one's legal's call. I've pinged them; if they don't come back by Thursday we ship as-is.",
        "Doc is updated in place, same link as before.",
        "M",
      ] },
    { from: "United Airlines", subject: "Check in now: SFO → PDX, Sep 22", label: "Travel", at: daysAgo(1, 18, 45), unread: false,
      snippet: "Your flight UA 1183 departs tomorrow at 6:45 PM from Terminal 3. Check-in is open. Seat 14C. Boarding begins at 6:10 PM.",
      body: [
        "Check-in is now open for your upcoming flight.",
        "UA 1183 · San Francisco (SFO) → Portland (PDX) · Departs Sep 22, 6:45 PM · Terminal 3, gate posted 2 hours before departure. Seat 14C. Boarding begins at 6:10 PM.",
        "Bags: 1 carry-on and 1 personal item included. Add a checked bag before you arrive at the airport to save $5.",
      ] },
    { from: "Dense Discovery", subject: "#312 — The case for slower software", label: "Newsletter", at: daysAgo(1, 6, 0), unread: false,
      snippet: "This week: an essay on interfaces that make you wait on purpose, a monospace typeface with actual italics, and a tiny Mac utility for pausing notifications by app.",
      body: [
        "Hello friends,",
        "This week's lead essay argues that some interfaces should make you wait on purpose — not through slowness, but through deliberate pauses that let a decision settle. It's a short read and it's stuck with me all week.",
        "Also in this issue: a monospace typeface with actual italics rather than slanted romans, a tiny Mac utility that pauses notifications per app instead of globally, and a lovely photo essay on Tokyo's remaining public payphones.",
        "Until next week,\nKai",
      ] },
    { from: "Stripe", subject: "Receipt from Linear ($96.00)", label: "Receipts", at: daysAgo(1, 0, 3), unread: false,
      snippet: "Thanks for your payment. Linear Standard, 8 seats, billed monthly. Card ending 0113. Receipt #2791-4402.",
      body: [
        "Thanks for your payment.",
        "Linear Standard · 8 seats · billed monthly · $96.00. Paid with card ending 0113. Receipt #2791-4402.",
        "Questions about this charge? Contact Linear directly; Stripe processes payments on their behalf.",
      ] },
    { from: "Jun Park", subject: "Q4 roadmap draft is up", label: "Work", at: daysAgo(2, 16, 20), unread: false,
      snippet: "Rough cut is in Notion under Planning → Q4. I'd love your take on the “themes” section before Thursday — it's mostly the focus and notifications work we talked about.",
      body: [
        "Rough cut is in Notion under Planning → Q4.",
        "I'd love your take on the “themes” section before Thursday — it's mostly the focus and notifications work we talked about, plus one speculative bet on a keyboard-first mail client that I'm not sure survives the review.",
        "Leave comments inline; I'll do a consolidation pass Wednesday night.",
        "Jun",
      ] },
    { from: "Sam Okafor", subject: "Trail run Saturday", label: "Personal", at: daysAgo(3, 21, 12), unread: false,
      snippet: "Forest Park, Wildwood from the Stone House, 7am before it gets warm. Bringing the dog. Coffee at Sterling after?",
      body: [
        "Forest Park, Wildwood from the Stone House, 7am before it gets warm. Bringing the dog, she needs it.",
        "Thinking 8–9 miles, easy pace, nobody's training for anything. Coffee at Sterling after?",
        "Say yes.",
      ] },
    { from: "Wealthfront", subject: "Recurring deposit scheduled", label: "Finance", at: daysAgo(3, 9, 0), unread: false,
      snippet: "$1,500.00 will be transferred from Mercury Checking on Sep 25. You can edit or skip this transfer until Sep 24.",
      body: [
        "A recurring deposit is scheduled.",
        "$1,500.00 will be transferred from Mercury Checking ••4821 to your Automated Investing account on Sep 25. Funds typically settle within 2–3 business days.",
        "You can edit or skip this transfer any time before Sep 24 from the Transfers page.",
      ] },
    { from: "Interconnected", subject: "How the Kindle almost had a keyboard again", label: "Newsletter", at: daysAgo(4, 7, 30), unread: false,
      snippet: "A short one this week: a 2019 patent, a prototype photo that surfaced last month, and why e-ink input keeps losing to the phone in your other hand.",
      body: [
        "A short one this week.",
        "In 2019 Amazon filed a patent for a Kindle with a detachable keyboard cover. Last month a prototype photo surfaced on a Japanese auction site. It never shipped, and I think the reason is simple: e-ink input keeps losing to the phone in your other hand.",
        "Some thoughts on why that is, and why I still want one anyway.",
      ] },
    { from: "Airbnb", subject: "Your stay in Hood River is confirmed", label: "Travel", at: daysAgo(6, 13, 2), unread: false,
      snippet: "Oct 3 – Oct 5 · Cabin with river view · Host: Dana. Check-in after 3 PM. Cancellation is free until Sep 26.",
      body: [
        "You're going to Hood River.",
        "Oct 3 – Oct 5 · Cabin with river view · 2 guests · Host: Dana. Check-in after 3 PM, checkout by 11 AM. The door code will be sent the morning of arrival.",
        "Cancellation is free until Sep 26. After that, the first night is non-refundable.",
      ] },
    { from: "GitHub", subject: "[embox] 3 pull requests need your review", label: "Work", at: daysAgo(8, 11, 41), unread: false,
      snippet: "sidebar: remove folder tree (#41) · search: add label: prefix (#43) · list: clamp snippets to two lines (#44).",
      body: [
        "You have 3 pull requests awaiting review in embox.",
        "#41 sidebar: remove folder tree — 12 files changed. #43 search: add label: prefix — 3 files changed. #44 list: clamp snippets to two lines — 1 file changed.",
        "Reviews requested 8 days ago.",
      ] },
    { from: "Apple", subject: "Your receipt from Apple.", label: "Receipts", at: daysAgo(12, 4, 17), unread: false,
      snippet: "iCloud+ 2 TB · $9.99 · Renews Oct 9. Billed to the card ending 0113.",
      body: [
        "iCloud+ with 2 TB of storage · $9.99 · Renews Oct 9.",
        "Billed to the card ending 0113. You can manage or cancel your subscription in Settings → your name → Subscriptions.",
      ] },
  ].map((m, i) => ({ ...m, id: `m${i}`, archived: false, sent: false }))
    .sort((a, b) => b.at - a.at);

  const VIEWS = [
    { id: "inbox", name: "Inbox", has: (m) => !m.archived && !m.sent, empty: "Inbox zero" },
    { id: "unread", name: "Unread", has: (m) => !m.archived && !m.sent && m.unread, empty: "All caught up" },
    { id: "sent", name: "Sent", has: (m) => m.sent && !m.archived, empty: "Nothing sent yet" },
    { id: "archive", name: "Archive", has: (m) => m.archived, empty: "Nothing archived yet" },
  ];
  let view = VIEWS[0];
  let open = null; // message shown in the reader, or null in list mode
  let composing = false;
  let draft = { to: "", subject: "", body: "" };
  const selected = new Set(); // ids of rows picked with x

  /* ---------- persistence ---------- */

  // Archive and read state, sent mail and the draft survive a reload.
  const STORE = "embox-state";
  function loadState() {
    let saved = null;
    try { saved = JSON.parse(localStorage.getItem(STORE)); } catch {}
    if (!saved || saved.v !== 1) return;
    for (const m of MAIL) {
      const f = saved.flags?.[m.id];
      if (f) { m.archived = !!f.archived; m.unread = !!f.unread; }
    }
    for (const s of saved.sent || []) MAIL.push({ ...s, at: new Date(s.at) });
    MAIL.sort((a, b) => b.at - a.at);
    if (saved.draft) draft = { ...draft, ...saved.draft };
  }
  function save() {
    const flags = {};
    for (const m of MAIL) if (!m.sent) flags[m.id] = { archived: m.archived, unread: m.unread };
    const sent = MAIL.filter((m) => m.sent).map((m) => ({ ...m, at: m.at.toISOString() }));
    try { localStorage.setItem(STORE, JSON.stringify({ v: 1, flags, sent, draft })); } catch {}
  }
  loadState();

  const $ = (sel) => document.querySelector(sel);
  const list = $("#list");
  const empty = $("#empty");
  const count = $("#count");
  const filters = $("#filters");
  const views = $("#views");
  const meta = $(".meta");
  const search = $("#search");
  const toggle = $("#theme-toggle");
  const themeIcon = $("#theme-icon");
  const reader = $("#reader");
  const stage = $("#stage");
  const stageWrap = $(".stage-wrap");
  const toolbar = $(".toolbar");
  const toast = $("#toast");
  const toastText = toast.querySelector(".toast-text");
  const toastUndo = $("#toast-undo");
  const shortcuts = $("#shortcuts");

  const EASE_OUT = "cubic-bezier(.2, .8, .2, 1)";
  const EASE = "cubic-bezier(.4, 0, .2, 1)";
  const reduceMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  function formatTime(d) {
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
    }
    const opts = { month: "short", day: "numeric" };
    if (d.getFullYear() !== now.getFullYear()) opts.year = "numeric";
    return d.toLocaleDateString([], opts);
  }

  function formatWhen(d) {
    if (d.toDateString() === now.toDateString()) return "Today";
    const day = d.toLocaleDateString([], { weekday: "short" });
    return `${day} ${d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  }

  function parseQuery(q) {
    const f = { label: null, unread: false, text: [] };
    for (const t of q.trim().toLowerCase().split(/\s+/).filter(Boolean)) {
      if (t.startsWith("label:")) f.label = t.slice(6);
      else if (t === "is:unread" || t === "in:unread") f.unread = true;
      else f.text.push(t);
    }
    return f;
  }

  function matches(m, f) {
    if (f.label && m.label.toLowerCase() !== f.label) return false;
    if (f.unread && !m.unread) return false;
    if (!f.text.length) return true;
    const hay = `${m.subject} ${m.from} ${m.snippet} ${m.label}`.toLowerCase();
    return f.text.every((t) => hay.includes(t));
  }

  const currentFilter = () => parseQuery(search.value);
  const inView = () => MAIL.filter(view.has);
  const visibleMail = () => inView().filter((m) => matches(m, currentFilter()));

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function labelButton(name) {
    const b = el("button", "label", name);
    b.type = "button";
    b.style.setProperty("--label", LABELS[name] || "var(--muted-foreground)");
    b.setAttribute("aria-label", `Filter by ${name}`);
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      setQuery(`label:${name.toLowerCase()}`);
    });
    return b;
  }

  function barButton(name) {
    const b = el("button", "mail-bar");
    b.type = "button";
    b.title = name;
    b.setAttribute("aria-label", `Filter by ${name}`);
    b.addEventListener("click", (e) => {
      e.stopPropagation();
      setQuery(`label:${name.toLowerCase()}`);
    });
    return b;
  }

  function tagEl(name) {
    const tag = el("span", "mail-tag");
    tag.setAttribute("aria-hidden", "true");
    tag.append(el("span", null, name));
    return tag;
  }

  function row(m) {
    const li = el("li", "mail");
    li.tabIndex = 0;
    li.dataset.id = m.id;
    li.style.setProperty("--label", LABELS[m.label] || "var(--muted-foreground)");
    if (m.unread) li.dataset.unread = "";
    if (selected.has(m.id)) li.dataset.selected = "";

    const head = el("div", "mail-head");
    head.append(el("h2", "mail-subject", m.subject));

    const time = el("time", "mail-time", formatTime(m.at));
    time.dateTime = m.at.toISOString();

    const snippet = el("p", "mail-snippet");
    snippet.append(el("span", "mail-from", m.sent ? `To ${m.to}` : m.from), document.createTextNode(m.snippet));

    li.append(tagEl(m.label), barButton(m.label), head, time, snippet);
    // ⌘/Ctrl/Shift-click selects; once anything is selected, a plain click does too.
    li.addEventListener("mousedown", (e) => { if (e.shiftKey) e.preventDefault(); });
    li.addEventListener("click", (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || selected.size) toggleSelect(li);
      else openMail(m);
    });
    return li;
  }

  const rowFor = (m) => list.querySelector(`.mail[data-id="${m.id}"]`);
  const mailFor = (li) => MAIL.find((x) => x.id === li.dataset.id);

  /* ---------- selection ---------- */

  function toggleSelect(li) {
    const id = li.dataset.id;
    if (selected.has(id)) selected.delete(id); else selected.add(id);
    li.toggleAttribute("data-selected", selected.has(id));
    updateCount(currentFilter());
  }
  function selectAll() {
    for (const li of list.querySelectorAll(".mail")) { selected.add(li.dataset.id); li.dataset.selected = ""; }
    updateCount(currentFilter());
  }
  function clearSelection() {
    selected.clear();
    for (const li of list.querySelectorAll(".mail[data-selected]")) delete li.dataset.selected;
    updateCount(currentFilter());
  }
  const selectedRows = () => [...list.querySelectorAll(".mail[data-selected]")];

  /* ---------- read state ---------- */

  const syncUnread = (m) => rowFor(m)?.toggleAttribute("data-unread", m.unread);

  // Marks everything read if any of it is unread, otherwise marks it all unread.
  function toggleRead(msgs) {
    if (!msgs.length) return;
    const before = msgs.map((m) => m.unread);
    const unread = !before.some(Boolean);
    const apply = (value) => {
      msgs.forEach((m, i) => { m.unread = value === null ? before[i] : value; syncUnread(m); });
      save();
      updateCount(currentFilter());
    };
    apply(unread);
    const n = msgs.length > 1 ? ` · ${msgs.length} messages` : "";
    const action = pushUndo({ undo() { apply(null); showToast(`Marked ${unread ? "read" : "unread"} again`); } });
    showToast(`Marked ${unread ? "unread" : "read"}${n}`, { undo: action });
  }

  /* ---------- reader ---------- */

  function renderReader(m) {
    reader.style.setProperty("--label", LABELS[m.label] || "var(--muted-foreground)");
    const bar = el("span", "mail-bar");
    bar.setAttribute("aria-hidden", "true");

    const head = el("header", "reader-head");
    const subject = el("h1", "reader-subject", m.subject);
    subject.id = "reader-subject";
    // Same text as the row's time, so it never changes; the day context lives in the sender line.
    const time = el("time", "reader-time", formatTime(m.at));
    time.dateTime = m.at.toISOString();
    time.title = m.at.toLocaleString([], { dateStyle: "full", timeStyle: "short" });
    const metaLine = el("p", "reader-meta");
    const rest = el("span", "reader-meta-rest", `${m.sent ? `to ${m.to}` : "to me"} · ${formatWhen(m.at)}`);
    metaLine.append(el("strong", null, m.sent ? "You" : m.from), document.createTextNode(" · "), rest);
    head.append(bar, subject, time, metaLine);

    const body = el("div", "reader-body");
    for (const p of m.body) body.append(el("p", null, p));

    const foot = el("footer", "reader-foot");
    for (const [key, what] of [["↩", "Reply"], ["e", "Archive"], ["↑↓", "Next / previous"], ["esc", "Back"]]) {
      const hint = el("span");
      hint.append(el("kbd", "tl-kbd", key), document.createTextNode(what));
      foot.append(hint);
    }

    const reply = el("form", "reply");
    reply.hidden = true;
    reply.noValidate = true;
    const ta = el("textarea", "tl-textarea");
    ta.placeholder = `Reply to ${m.from}…`;
    ta.rows = 4;
    ta.setAttribute("aria-label", `Reply to ${m.from}`);
    const actions = el("div", "reply-actions");
    const send = el("button", "tl-button", "Send");
    send.type = "submit";
    send.dataset.variant = "success";
    send.dataset.size = "sm";
    const sendHint = el("kbd", "tl-kbd", "⌘↩");
    const discard = el("button", "tl-button", "Discard");
    discard.type = "button";
    discard.dataset.variant = "ghost";
    discard.dataset.size = "sm";
    discard.addEventListener("click", () => closeReply());
    actions.append(send, sendHint, discard);
    reply.append(ta, actions);
    reply.addEventListener("submit", (e) => { e.preventDefault(); sendReply(); });

    const content = el("div", "reader-content");
    content.append(head, body, foot, reply);
    reader.replaceChildren(el("div", "reader-surface"), content);
  }

  function transition(update) {
    if (document.startViewTransition && !reduceMotion()) {
      return document.startViewTransition(update).finished;
    }
    update();
    return Promise.resolve();
  }

  /* Open/close choreography. The list stays where it is and falls out of focus
     (blur, dim, recede) while the chosen row rises out of it and unrolls into
     the card. A clone of the row rides on top of the card and crosses over to
     the card's own header, so the motion is one continuous object. */

  const RISE = 336;
  const FALL = 272;
  const LIFT = "cubic-bezier(.45, 0, .15, 1)"; // slow lift-off, soft landing
  let openScrollY = 0;
  let hiddenRow = null;
  let morph = null;

  // The pieces of the row that have no counterpart in the card (time, snippet
  // remainder, tag) ride outside the clipped card on a stand-in. Its subject,
  // sender and bar are hidden: the card's own header plays those, moving from
  // the row's geometry into place.
  function ghostOf(li, top) {
    const g = li.cloneNode(true);
    g.classList.add("reader-ghost");
    g.removeAttribute("tabindex");
    g.style.visibility = ""; // the source row is hidden while its card is open
    g.style.top = `${top}px`;
    g.dataset.lift = "";
    if (li.previousElementSibling) g.dataset.divider = "";
    g.setAttribute("aria-hidden", "true");
    stageWrap.append(g);
    return g;
  }

  // Layout-space top of an element within the stage-wrap, immune to the
  // stage's recede transform (getBoundingClientRect is not).
  function layoutTop(el) {
    let t = 0;
    for (let n = el; n && n !== stageWrap; n = n.offsetParent) t += n.offsetTop;
    return t;
  }

  // The open email always sits at the top of the column, just under the
  // toolbar in the current viewport; the row travels up to meet it.
  function placeReader() {
    const wrapTop = stageWrap.getBoundingClientRect().top;
    const top = toolbar.getBoundingClientRect().bottom + 8;
    reader.style.top = `${Math.max(0, Math.round(top - wrapTop))}px`;
  }

  // A computed color with its alpha zeroed, so it can be interpolated in and out.
  const clear = (c) => {
    const m = c.match(/^([a-z]+)\((.*)\)$/i);
    if (!m) return "transparent";
    const [, fn, body] = m;
    if (/^(rgb|hsl)a?$/.test(fn)) {
      const parts = body.split(/[\s,/]+/).filter(Boolean).slice(0, 3);
      return `${fn.replace(/a$/, "")}a(${parts.join(", ")}, 0)`;
    }
    return `${fn}(${body.replace(/\s*\/.*$/, "")} / 0)`;
  };

  // The card's shadow with its colors zeroed, so it can be interpolated in and out.
  const shadowOf = (el) => {
    const end = getComputedStyle(el).boxShadow;
    return { end, start: end === "none" ? "none" : end.replace(/(rgba?|hsla?|oklch|oklab|color)\([^)]*\)/g, "transparent") };
  };

  // Longer trips get a little more time so distant rows don't snap.
  const travel = (base, dy) => base + Math.min(128, Math.abs(dy) * 0.16);

  const keyframes = (el, frames, opts) => el.animate(frames, { fill: "both", ...opts }).finished;
  const parts = () => ({
    surface: reader.querySelector(".reader-surface"),
    subject: reader.querySelector(".reader-subject"),
    metaLine: reader.querySelector(".reader-meta"),
    metaRest: reader.querySelector(".reader-meta-rest"),
    time: reader.querySelector(".reader-time"),
    bar: reader.querySelector(".reader-head .mail-bar"),
    firstPara: reader.querySelector(".reader-body p"),
    rest: [...reader.querySelectorAll(".reader-body, .reader-foot, .reply")],
  });

  // Row-state geometry for everything that moves, expressed in each element's
  // own frame. `dy` is the vertical offset between the ghost's box and the
  // card's box, so measurements taken across the two line up.
  function geometry(ghost, p, dy) {
    const r = (el) => el.getBoundingClientRect();
    const gs = ghost.querySelector(".mail-subject"), gf = ghost.querySelector(".mail-from");
    const gb = ghost.querySelector(".mail-bar"), gt = ghost.querySelector(".mail-time"), gp = ghost.querySelector(".mail-snippet");
    const gsCS = getComputedStyle(gs), hsCS = getComputedStyle(p.subject);
    const gtCS = getComputedStyle(gt), htCS = getComputedStyle(p.time);
    const barCS = getComputedStyle(p.bar);
    const gsr = r(gs), hsr = r(p.subject);
    const gbr = r(gb), hbr = r(p.bar), gtr = r(gt), htr = r(p.time), gpr = r(gp), fpr = r(p.firstPara);
    const px = (n) => `${n}px`;
    // Nothing inside the card may animate `transform`: Chrome places transform-animated
    // children off the parent's static layout while the parent's box is animating.
    // Movement is `top`/`left`, growth is `font-size` inside a fixed line box.
    return {
      subject: {
        at: { top: px(gsr.top - hsr.top - dy - (hsr.height - gsr.height) / 2), fontSize: gsCS.fontSize, fontWeight: gsCS.fontWeight, color: gsCS.color, letterSpacing: gsCS.letterSpacing === "normal" ? "0px" : gsCS.letterSpacing },
        end: { top: "0px", fontSize: hsCS.fontSize, fontWeight: hsCS.fontWeight, color: hsCS.color, letterSpacing: hsCS.letterSpacing === "normal" ? "0px" : hsCS.letterSpacing },
      },
      time: {
        at: { top: px(gtr.top - htr.top - dy), left: px(gtr.right - htr.right), fontWeight: gtCS.fontWeight, color: gtCS.color },
        end: { top: "0px", left: "0px", fontWeight: htCS.fontWeight, color: htCS.color },
      },
      meta: px(r(gf).top - r(p.metaLine).top - dy),
      surfaceColor: getComputedStyle(p.surface).backgroundColor,
      restColor: getComputedStyle(p.metaRest).color,
      barTop: `${parseFloat(barCS.top) + (gbr.top - hbr.top - dy)}px`,
      barBottom: `${parseFloat(barCS.bottom) - (gbr.bottom - hbr.bottom - dy)}px`,
      barTopEnd: barCS.top,
      barBottomEnd: barCS.bottom,
      // the snippet remainder heads for the first body paragraph
      snippet: `translateY(${fpr.top - gpr.top + dy}px)`,
    };
  }

  function retractTag(ghost) {
    // Let the tag's own transition slide it back behind the bar (a move, not a fade).
    const tag = ghost.querySelector(".mail-tag > span");
    if (tag) getComputedStyle(tag).translate; // commit the lifted state first
    delete ghost.dataset.lift;
  }

  async function openMail(m) {
    if (open === m || morph) return;
    const li = rowFor(m);
    const wasOpen = open !== null;
    open = m;
    if (m.unread) { m.unread = false; save(); }

    if (wasOpen || !li || reduceMotion()) {
      // Already reading (↑/↓), or nothing to rise from: swap content in place.
      const content = reader.querySelector(".reader-content");
      if (wasOpen && content && !reduceMotion()) {
        await content.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: EASE }).finished;
      }
      renderReader(m);
      if (!wasOpen) { placeReader(); openScrollY = window.scrollY; stage.dataset.behind = ""; }
      if (hiddenRow) hiddenRow.style.visibility = "";
      hiddenRow = rowFor(m);
      if (hiddenRow) hiddenRow.style.visibility = "hidden";
      reader.hidden = false;
      if (!reduceMotion()) {
        reader.querySelector(".reader-content").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: EASE_OUT });
      }
      reader.focus({ preventScroll: true });
      return;
    }

    openScrollY = window.scrollY;
    const rowTop = layoutTop(li);
    const rowHeight = li.offsetHeight;
    renderReader(m);
    reader.hidden = false;
    placeReader();
    const cardTop = parseFloat(reader.style.top);
    const dy = rowTop - cardTop;
    const fullHeight = reader.offsetHeight;
    const shadow = shadowOf(reader);
    const ghost = ghostOf(li, rowTop);

    const p = parts();
    const g = geometry(ghost, p, dy);
    const gSnippet = ghost.querySelector(".mail-snippet");
    ghost.dataset.morph = ""; // hide the ghost's subject/sender/time/bar: the card's header plays them
    retractTag(ghost);

    li.style.visibility = "hidden";
    hiddenRow = li;
    stage.dataset.behind = "";

    const D = travel(RISE, dy);
    const nodes = [reader, ghost, p.surface, p.subject, p.time, p.metaLine, p.metaRest, p.bar, gSnippet, ...p.rest];
    morph = Promise.all([
      // The card is the row's box, travelling up and unrolling. It moves via `top`,
      // not transform: a clipping parent that also transforms stops painting its
      // composited children mid-flight in Chrome.
      keyframes(reader, [
        { top: `${cardTop + dy}px`, height: `${rowHeight}px`, borderRadius: "10px", boxShadow: shadow.start },
        { top: `${cardTop}px`, height: `${fullHeight}px`, borderRadius: "16px", boxShadow: shadow.end },
      ], { duration: D, easing: LIFT }),
      keyframes(ghost, [{ transform: "translateY(0)" }, { transform: `translateY(${-dy}px)` }], { duration: D, easing: LIFT }),
      // Nothing inside the card animates opacity: that would composite it and Chrome then
      // paints the card's text at its final position while the box is still travelling.
      keyframes(p.surface, [{ backgroundColor: clear(g.surfaceColor) }, { backgroundColor: g.surfaceColor }], { duration: D * 0.3, easing: EASE_OUT }),
      // header pieces travel from the row's geometry into place
      keyframes(p.subject, [g.subject.at, g.subject.end], { duration: D, easing: LIFT }),
      keyframes(p.time, [g.time.at, g.time.end], { duration: D, easing: LIFT }),
      keyframes(p.metaLine, [{ top: g.meta }, { top: "0px" }], { duration: D, easing: LIFT }),
      keyframes(p.bar, [{ top: g.barTop, bottom: g.barBottom }, { top: g.barTopEnd, bottom: g.barBottomEnd }], { duration: D, easing: LIFT }),
      keyframes(p.metaRest, [
        { color: clear(g.restColor), left: "-8px" }, { color: g.restColor, left: "0px" },
      ], { delay: D * 0.2, duration: D * 0.45, easing: EASE_OUT }),
      // row-only pieces head toward where their information ends up
      keyframes(gSnippet, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: g.snippet }], { duration: D * 0.5, easing: EASE }),
      // the body is revealed by the card unrolling; it just settles upward
      ...p.rest.map((node) => keyframes(node, [{ top: "16px" }, { top: "0px" }], { duration: D, easing: LIFT })),
    ]);
    await morph;
    morph = null;
    ghost.remove();
    nodes.forEach((node) => node.getAnimations().forEach((a) => a.cancel()));
    reader.focus({ preventScroll: true });
  }

  async function closeReader({ instant = false } = {}) {
    if (!open || morph) return;
    const m = open;
    open = null;
    const li = hiddenRow && hiddenRow.isConnected ? hiddenRow : rowFor(m);

    const finish = () => {
      reader.hidden = true;
      reader.replaceChildren();
      if (hiddenRow) {
        hiddenRow.style.visibility = "";
        if (!m.unread) delete hiddenRow.dataset.unread;
      }
      hiddenRow = null;
      delete stage.dataset.behind;
      // Re-render only if the message no longer belongs in this view (e.g. Unread).
      if (!view.has(m) || !li) render(); else updateCount(currentFilter());
    };

    if (instant || !li || reduceMotion()) {
      finish();
      return;
    }

    window.scrollTo({ top: openScrollY, behavior: "instant" });
    const rowTop = layoutTop(li);
    const cardTop = parseFloat(reader.style.top);
    const dy = rowTop - cardTop;
    const fullHeight = reader.offsetHeight;
    const rowHeight = li.offsetHeight;
    const shadow = shadowOf(reader);
    const ghost = ghostOf(li, rowTop);
    if (!m.unread) delete ghost.dataset.unread;
    delete ghost.dataset.lift; // tag stays behind the bar; the real row's hover/focus brings it out

    const p = parts();
    const g = geometry(ghost, p, dy);
    const gSnippet = ghost.querySelector(".mail-snippet");
    ghost.dataset.morph = "";

    const D = travel(FALL, dy);
    delete stage.dataset.behind;
    morph = Promise.all([
      keyframes(reader, [
        { top: `${cardTop}px`, height: `${fullHeight}px`, borderRadius: "16px", boxShadow: shadow.end },
        { top: `${cardTop + dy}px`, height: `${rowHeight}px`, borderRadius: "10px", boxShadow: shadow.start },
      ], { duration: D, easing: LIFT }),
      keyframes(ghost, [{ transform: `translateY(${-dy}px)` }, { transform: "translateY(0)" }], { duration: D, easing: LIFT }),
      keyframes(p.subject, [g.subject.end, g.subject.at], { duration: D, easing: LIFT }),
      keyframes(p.time, [g.time.end, g.time.at], { duration: D, easing: LIFT }),
      keyframes(p.metaLine, [{ top: "0px" }, { top: g.meta }], { duration: D, easing: LIFT }),
      keyframes(p.bar, [{ top: g.barTopEnd, bottom: g.barBottomEnd }, { top: g.barTop, bottom: g.barBottom }], { duration: D, easing: LIFT }),
      keyframes(p.metaRest, [
        { color: g.restColor, left: "0px" }, { color: clear(g.restColor), left: "-8px" },
      ], { duration: D * 0.4, easing: EASE }),
      keyframes(gSnippet, [{ opacity: 0, transform: g.snippet }, { opacity: 1, transform: "none" }], { delay: D * 0.45, duration: D * 0.55, easing: EASE_OUT }),
      ...p.rest.map((node) => keyframes(node, [{ top: "0px" }, { top: "16px" }], { duration: D, easing: LIFT })),
      keyframes(p.surface, [{ backgroundColor: g.surfaceColor }, { backgroundColor: clear(g.surfaceColor) }], { delay: D * 0.6, duration: D * 0.4, easing: EASE }),
    ]);
    await morph;
    morph = null;
    finish();
    ghost.remove();
    // Filling animations outlive their elements' usefulness; a stale one on the
    // card (height/top) would clip the next open into an empty box.
    reader.getAnimations().forEach((a) => a.cancel());
    reader.style.height = "";
    li.focus({ preventScroll: true });
  }

  function step(dir) {
    const items = visibleMail();
    const i = items.indexOf(open);
    const next = items[i + dir];
    if (next) openMail(next);
  }

  /* ---------- reply ---------- */

  const replyForm = () => reader.querySelector(".reply");
  const inReply = () => !!replyForm() && !replyForm().hidden;

  function openReply(text = "") {
    const form = replyForm();
    if (!form || !form.hidden) return;
    form.hidden = false;
    form.querySelector("textarea").value = text;
    if (!reduceMotion()) {
      form.animate(
        [{ opacity: 0, transform: "translateY(6px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 220, easing: EASE_OUT },
      );
    }
    form.querySelector("textarea").focus();
    form.scrollIntoView({ block: "nearest", behavior: reduceMotion() ? "instant" : "smooth" });
  }

  async function closeReply() {
    const form = replyForm();
    if (!form || form.hidden) return;
    if (!reduceMotion()) {
      await form.animate(
        [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0, transform: "translateY(4px)" }],
        { duration: 140, easing: EASE },
      ).finished;
    }
    form.hidden = true;
    form.querySelector("textarea").value = "";
    reader.focus({ preventScroll: true });
  }

  /* ---------- toast and undo ---------- */

  let toastTimer;
  let toastAction = null; // the undoable action the toast's Undo button reverses
  function showToast(text, { undo = null, duration } = {}) {
    toastText.textContent = text;
    toastAction = undo;
    toastUndo.hidden = !undo;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, duration ?? (undo ? 5000 : 2200));
  }
  function hideToast() { toast.hidden = true; toastAction = null; }
  toastUndo.addEventListener("click", () => { if (toastAction) undoAction(toastAction); });

  // Undoable actions, newest last. `z` reverses the newest one.
  const undoStack = [];
  function pushUndo(action) {
    undoStack.push(action);
    if (undoStack.length > 20) undoStack.shift();
    return action;
  }
  function undoAction(action) {
    const i = undoStack.indexOf(action);
    if (i < 0) return;
    undoStack.splice(i, 1);
    if (toastAction === action) hideToast();
    action.undo();
  }
  function undoLast() {
    const action = undoStack.at(-1);
    if (action) undoAction(action); else showToast("Nothing to undo");
  }

  // Re-render the list behind whatever is open, keeping keyboard focus and the open row hidden.
  function refreshList() {
    if (morph) { morph.then(() => refreshList()); return; }
    const focusedId = document.activeElement?.closest?.("#list .mail")?.dataset.id;
    render();
    if (open) {
      hiddenRow = rowFor(open);
      if (hiddenRow) hiddenRow.style.visibility = "hidden";
    }
    if (focusedId) list.querySelector(`.mail[data-id="${focusedId}"]`)?.focus({ preventScroll: true });
  }

  // Sending waits a few seconds so it can be taken back. Opening a new message
  // or leaving the page sends anything still waiting.
  const SEND_DELAY = 5000;
  const pendingSends = new Set();
  function queueSend(m, { sending, sent, restore }) {
    const action = {
      undo() {
        clearTimeout(action.timer);
        pendingSends.delete(action);
        restore();
      },
      commit() {
        clearTimeout(action.timer);
        pendingSends.delete(action);
        const i = undoStack.indexOf(action);
        if (i >= 0) undoStack.splice(i, 1);
        MAIL.unshift(m);
        save();
        if (view.has(m)) refreshList(); else updateCount(currentFilter());
        if (toastAction === action) showToast(sent);
      },
    };
    action.timer = setTimeout(action.commit, SEND_DELAY);
    pendingSends.add(action);
    pushUndo(action);
    showToast(sending, { undo: action, duration: SEND_DELAY + 500 });
  }
  const flushSends = () => [...pendingSends].forEach((a) => a.commit());
  window.addEventListener("pagehide", flushSends);

  const plain = (text) => ({
    snippet: text.replace(/\s+/g, " ").slice(0, 160),
    body: text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean),
  });

  async function sendReply() {
    const form = replyForm();
    const text = form.querySelector("textarea").value.trim();
    if (!text) { form.querySelector("textarea").focus(); return; }
    const m = open;
    await closeReply();
    const reply = {
      id: `s${Date.now()}`, from: "You", to: m.from, label: "Sent", at: new Date(),
      subject: /^re:/i.test(m.subject) ? m.subject : `Re: ${m.subject}`,
      unread: false, archived: false, sent: true, ...plain(text),
    };
    queueSend(reply, {
      sending: `Sending reply to ${m.from}…`,
      sent: `Reply sent to ${m.from}`,
      async restore() {
        if (morph) await morph;
        if (open !== m) await openMail(m);
        openReply(text);
      },
    });
  }

  /* ---------- compose ---------- */

  function renderCompose() {
    reader.style.setProperty("--label", "var(--brand)");
    const bar = el("span", "mail-bar");
    bar.setAttribute("aria-hidden", "true");

    const head = el("header", "reader-head");
    const title = el("h1", "reader-subject", "New message");
    title.id = "reader-subject";
    const metaLine = el("p", "reader-meta");
    metaLine.append(el("strong", null, "You"), document.createTextNode(" · "), el("span", "reader-meta-rest", ME));
    head.append(bar, title, metaLine);

    // One writing surface: header lines with inline "To:" / "Subject:" labels,
    // a rule, then the body. Enter moves down a line; Backspace on an empty
    // line moves back up.
    const form = el("form", "compose");
    form.noValidate = true;
    const sheet = el("div", "compose-sheet");
    const line = (name, label, placeholder) => {
      const wrap = el("label", `compose-line compose-${name}`);
      const input = el("input", "compose-input");
      input.name = name;
      input.type = "text";
      input.placeholder = placeholder;
      input.autocomplete = "off";
      input.spellcheck = false;
      input.value = draft[name];
      // Keep password managers out of the header lines.
      for (const a of ["data-1p-ignore", "data-lpignore", "data-bwignore", "data-form-type"]) input.setAttribute(a, a === "data-form-type" ? "other" : "true");
      if (label) wrap.append(el("span", "compose-label", label));
      wrap.append(input);
      return wrap;
    };
    const body = el("textarea", "compose-body");
    body.name = "body";
    body.placeholder = "Write your message…";
    body.rows = 7;
    body.value = draft.body;
    body.setAttribute("aria-label", "Message");
    sheet.append(line("to", "To:", ""), line("subject", null, "Subject"), body);
    // The card's title follows the subject as you type.
    const syncTitle = () => { title.textContent = form.subject.value.trim() || "New message"; };
    sheet.addEventListener("input", (e) => { if (e.target.name === "subject") syncTitle(); });
    const order = ["to", "subject", "body"];
    sheet.addEventListener("keydown", (e) => {
      const i = order.indexOf(e.target.name);
      if (i < 0 || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Enter" && e.target.tagName === "INPUT") {
        e.preventDefault();
        form[order[i + 1]].focus();
      } else if (e.key === "Backspace" && i > 0 && !e.target.value && (e.target.tagName === "INPUT" || e.target.selectionStart === 0)) {
        e.preventDefault();
        const prev = form[order[i - 1]];
        prev.focus();
        prev.setSelectionRange(prev.value.length, prev.value.length);
      }
    });
    const error = el("p", "tl-field-error compose-error");
    error.hidden = true;
    const actions = el("div", "reply-actions");
    const send = el("button", "tl-button", "Send");
    send.type = "submit";
    send.dataset.variant = "success";
    send.dataset.size = "sm";
    const discard = el("button", "tl-button", "Discard");
    discard.type = "button";
    discard.dataset.variant = "ghost";
    discard.dataset.size = "sm";
    discard.addEventListener("click", () => closeCompose({ discard: true }));
    actions.append(send, el("kbd", "tl-kbd", "⌘↩"), discard);
    form.append(sheet, error, actions);
    form.addEventListener("submit", (e) => { e.preventDefault(); sendCompose(); });
    if (draft.subject) title.textContent = draft.subject;
    form.addEventListener("input", () => {
      error.hidden = true;
      draft = composeValues(); // a reload mid-sentence keeps the draft
      save();
    });

    const content = el("div", "reader-content");
    content.append(head, form);
    reader.replaceChildren(el("div", "reader-surface"), content);
  }

  const composeValues = () => {
    const f = reader.querySelector(".compose");
    return f ? { to: f.to.value.trim(), subject: f.subject.value.trim(), body: f.body.value.trim() } : { ...draft };
  };
  const focusFirstEmpty = () => {
    const f = reader.querySelector(".compose");
    (["to", "subject", "body"].map((n) => f[n]).find((i) => !i.value.trim()) || f.body).focus({ preventScroll: true });
  };

  async function openCompose() {
    if (composing || morph) return;
    flushSends();
    composing = true;

    if (open) {
      // Reading: the card stays, its content becomes the composer; the row returns to the list.
      open = null;
      if (hiddenRow) { hiddenRow.style.visibility = ""; hiddenRow = null; }
      const content = reader.querySelector(".reader-content");
      if (content && !reduceMotion()) {
        await content.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 100, easing: EASE }).finished;
      }
      renderCompose();
      if (!reduceMotion()) {
        reader.querySelector(".reader-content").animate([{ opacity: 0 }, { opacity: 1 }], { duration: 140, easing: EASE_OUT });
      }
      focusFirstEmpty();
      return;
    }

    openScrollY = window.scrollY;
    renderCompose();
    reader.hidden = false;
    placeReader();
    stage.dataset.behind = "";
    if (reduceMotion()) { focusFirstEmpty(); return; }

    // No source row: the card unrolls from a row-height sliver just under the toolbar.
    const cardTop = parseFloat(reader.style.top);
    const fullHeight = reader.offsetHeight;
    const shadow = shadowOf(reader);
    const surface = reader.querySelector(".reader-surface");
    const bar = reader.querySelector(".reader-head .mail-bar");
    const barCS = getComputedStyle(bar);
    const barMid = bar.getBoundingClientRect().height / 2;
    const surfaceColor = getComputedStyle(surface).backgroundColor;
    const form = reader.querySelector(".compose");
    const title = reader.querySelector(".reader-subject");
    const metaLine = reader.querySelector(".reader-meta");
    const metaStrong = metaLine.querySelector("strong");
    const titleColor = getComputedStyle(title).color, metaColor = getComputedStyle(metaLine).color, strongColor = getComputedStyle(metaStrong).color;
    const D = RISE;
    morph = Promise.all([
      keyframes(reader, [
        { top: `${cardTop + 18}px`, height: "40px", borderRadius: "10px", boxShadow: shadow.start },
        { top: `${cardTop}px`, height: `${fullHeight}px`, borderRadius: "16px", boxShadow: shadow.end },
      ], { duration: D, easing: LIFT }),
      keyframes(surface, [{ backgroundColor: clear(surfaceColor) }, { backgroundColor: surfaceColor }], { duration: D * 0.3, easing: EASE_OUT }),
      // the tube lights from a point in the middle and extends to the header's height
      keyframes(bar, [
        { top: `${parseFloat(barCS.top) + barMid - 3}px`, bottom: `${parseFloat(barCS.bottom) + barMid - 3}px` },
        { top: barCS.top, bottom: barCS.bottom },
      ], { duration: D, easing: LIFT }),
      // the header arrives with the card: title from just below, meta a beat later
      keyframes(title, [{ top: "10px", color: clear(titleColor) }, { top: "0px", color: titleColor }], { duration: D * 0.7, easing: EASE_OUT }),
      keyframes(metaLine, [{ top: "10px", color: clear(metaColor) }, { top: "0px", color: metaColor }], { delay: D * 0.15, duration: D * 0.7, easing: EASE_OUT }),
      keyframes(metaStrong, [{ color: clear(strongColor) }, { color: strongColor }], { delay: D * 0.15, duration: D * 0.7, easing: EASE_OUT }),
      keyframes(form, [{ top: "24px" }, { top: "0px" }], { duration: D, easing: LIFT }),
    ]);
    await morph;
    morph = null;
    [reader, surface, bar, title, metaLine, metaStrong, form].forEach((node) => node.getAnimations().forEach((a) => a.cancel()));
    focusFirstEmpty();
  }

  async function closeCompose({ discard = false, sent = false } = {}) {
    if (!composing || morph) return;
    const values = composeValues();
    const hasContent = !sent && !discard && Object.values(values).some(Boolean);
    draft = discard || sent ? { to: "", subject: "", body: "" } : values;
    save();
    composing = false;

    const finish = () => {
      reader.hidden = true;
      reader.replaceChildren();
      reader.getAnimations().forEach((a) => a.cancel());
      reader.style.height = "";
      reader.style.opacity = "";
      delete stage.dataset.behind;
      render();
    };

    if (reduceMotion()) { finish(); }
    else if (sent) {
      // Up and away, while the list comes back into focus.
      const cardTop = parseFloat(reader.style.top);
      delete stage.dataset.behind;
      morph = keyframes(reader, [
        { top: `${cardTop}px`, opacity: 1 }, { top: `${cardTop - 36}px`, opacity: 0 },
      ], { duration: 240, easing: "cubic-bezier(.4, 0, 1, 1)" });
      await morph;
      morph = null;
      finish();
    } else {
      // Roll back up into the sliver it came from.
      const cardTop = parseFloat(reader.style.top);
      const fullHeight = reader.offsetHeight;
      const shadow = shadowOf(reader);
      const surface = reader.querySelector(".reader-surface");
      const surfaceColor = getComputedStyle(surface).backgroundColor;
      const form = reader.querySelector(".compose");
      const bar = reader.querySelector(".reader-head .mail-bar");
      const barCS = getComputedStyle(bar);
      const barMid = bar.getBoundingClientRect().height / 2;
      const title = reader.querySelector(".reader-subject");
      const metaLine = reader.querySelector(".reader-meta");
      const metaStrong = metaLine.querySelector("strong");
      const titleColor = getComputedStyle(title).color, metaColor = getComputedStyle(metaLine).color, strongColor = getComputedStyle(metaStrong).color;
      const D = FALL;
      delete stage.dataset.behind;
      morph = Promise.all([
        keyframes(reader, [
          { top: `${cardTop}px`, height: `${fullHeight}px`, borderRadius: "16px", boxShadow: shadow.end },
          { top: `${cardTop + 18}px`, height: "40px", borderRadius: "10px", boxShadow: shadow.start },
        ], { duration: D, easing: LIFT }),
        keyframes(bar, [
          { top: barCS.top, bottom: barCS.bottom },
          { top: `${parseFloat(barCS.top) + barMid - 3}px`, bottom: `${parseFloat(barCS.bottom) + barMid - 3}px` },
        ], { duration: D, easing: LIFT }),
        keyframes(metaLine, [{ top: "0px", color: metaColor }, { top: "10px", color: clear(metaColor) }], { duration: D * 0.5, easing: EASE }),
        keyframes(metaStrong, [{ color: strongColor }, { color: clear(strongColor) }], { duration: D * 0.5, easing: EASE }),
        keyframes(title, [{ top: "0px", color: titleColor }, { top: "10px", color: clear(titleColor) }], { delay: D * 0.1, duration: D * 0.5, easing: EASE }),
        keyframes(surface, [{ backgroundColor: surfaceColor }, { backgroundColor: clear(surfaceColor) }], { delay: D * 0.55, duration: D * 0.45, easing: EASE }),
        keyframes(form, [{ top: "0px" }, { top: "24px" }], { duration: D, easing: LIFT }),
      ]);
      await morph;
      morph = null;
      finish();
    }

    if (hasContent) showToast("Draft saved · press c to resume");
    else if (discard && Object.values(values).some(Boolean)) {
      const action = pushUndo({
        async undo() {
          if (morph) await morph;
          if (composing) return;
          draft = values;
          save();
          openCompose();
        },
      });
      showToast("Draft discarded", { undo: action });
    }
    (list.querySelector(".mail") || search).focus({ preventScroll: true });
  }

  function sendCompose() {
    const form = reader.querySelector(".compose");
    const values = composeValues();
    const error = reader.querySelector(".compose-error");
    const fail = (field, text) => { error.textContent = text; error.hidden = false; form[field].focus(); };
    if (!values.to) return fail("to", "Add a recipient.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.to) && !/^[A-Za-z][\w' -]{0,40}$/.test(values.to)) return fail("to", "That doesn't look like an address or a name.");
    if (!values.body) return fail("body", "Write something first.");
    const to = values.to.includes("@") ? values.to.split("@")[0].replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) : values.to;
    const m = {
      id: `s${Date.now()}`, from: "You", to, subject: values.subject || "(no subject)", label: "Sent", at: new Date(),
      unread: false, archived: false, sent: true, ...plain(values.body),
    };
    closeCompose({ sent: true }).then(() => queueSend(m, {
      sending: `Sending to ${to}…`,
      sent: `Sent to ${to}`,
      async restore() {
        draft = values;
        save();
        if (morph) await morph;
        openCompose();
      },
    }));
  }

  /* ---------- archive ---------- */

  function recede(li, delay = 0) {
    const h = li.offsetHeight;
    const cs = getComputedStyle(li);
    const away = li.animate(
      [
        { transform: "perspective(900px) translateZ(0)", filter: "blur(0px)", opacity: 1 },
        { transform: "perspective(900px) translateZ(-180px)", filter: "blur(12px)", opacity: 0 },
      ],
      { duration: 336, delay, easing: EASE, fill: "forwards" },
    );
    const collapse = li.animate(
      [
        { height: `${h}px`, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom },
        { height: "0px", paddingTop: "0px", paddingBottom: "0px" },
      ],
      { duration: 264, delay: delay + 96, easing: EASE, fill: "forwards" },
    );
    return Promise.all([away.finished, collapse.finished]);
  }

  // `e` in Archive moves mail back to the inbox; everywhere else it archives.
  async function archiveRows(lis) {
    lis = lis.filter((li) => li.isConnected && !li.dataset.archiving);
    if (!lis.length) return;
    const rows = [...list.querySelectorAll(".mail")];
    const focusIdx = rows.indexOf(document.activeElement);
    const hadFocus = focusIdx >= 0 && lis.includes(rows[focusIdx]);
    const msgs = lis.map(mailFor);
    const toArchive = !msgs[0].archived;
    for (const li of lis) { li.dataset.archiving = ""; selected.delete(li.dataset.id); }

    if (!reduceMotion()) {
      await new Promise((r) => setTimeout(r, 120)); // let the tube flare
      await Promise.all(lis.map((li, i) => recede(li, Math.min(i, 8) * 28)));
    }

    msgs.forEach((m) => { m.archived = toArchive; });
    lis.forEach((li) => li.remove());
    save();
    updateCount(currentFilter());
    const remaining = list.querySelectorAll(".mail");
    if (!remaining.length) { empty.hidden = false; empty.textContent = emptyText(); }
    if (hadFocus) {
      // The next row that survived, else the nearest one above.
      const next = rows.slice(focusIdx + 1).find((r) => r.isConnected) || rows.slice(0, focusIdx).reverse().find((r) => r.isConnected);
      (next || search).focus({ preventScroll: true });
    }

    const n = msgs.length;
    const home = msgs.every((m) => m.sent) ? "Sent" : "Inbox";
    const did = toArchive ? (n > 1 ? `Archived ${n} messages` : "Archived") : (n > 1 ? `Moved ${n} messages to ${home}` : `Moved to ${home}`);
    const action = pushUndo({
      undo() {
        msgs.forEach((m) => { m.archived = !toArchive; });
        save();
        refreshList();
        const back = msgs.map(rowFor).filter(Boolean);
        if (!reduceMotion()) {
          back.forEach((li) => li.animate(
            [{ opacity: 0, transform: "translateY(-6px)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "blur(0px)" }],
            { duration: 260, easing: EASE_OUT },
          ));
        }
        if (!open && !composing && back[0]) back[0].focus({ preventScroll: true });
        showToast(toArchive ? "Archive undone" : "Moved back to Archive");
      },
    });
    showToast(did, { undo: action });
  }
  const archive = (li) => archiveRows([li]);

  async function archiveOpen() {
    const m = open;
    await closeReader();
    const li = rowFor(m);
    if (li) archive(li);
  }

  /* ---------- list chrome ---------- */

  function emptyText() {
    const q = search.value.trim();
    return q ? `No mail matches “${q}”` : view.empty;
  }

  const hint = (key, what) => {
    const s = el("span", "meta-hint");
    s.append(el("kbd", "tl-kbd", key), document.createTextNode(what));
    return s;
  };

  function updateCount(f) {
    if (selected.size) {
      count.replaceChildren(
        el("strong", "count-selected", `${selected.size} selected`),
        hint("e", view.id === "archive" ? "Move out" : "Archive"), hint("u", "Read"), hint("esc", "Clear"),
      );
      return;
    }
    // Outside a selection the right side stays quiet: just the "c New" hint.
    count.replaceChildren();
  }

  function updateFilters(f) {
    filters.replaceChildren();
    if (!f.label && !f.unread) return;
    if (f.label) {
      const name = Object.keys(LABELS).find((k) => k.toLowerCase() === f.label) || f.label;
      filters.append(labelButton(name));
    }
    if (f.unread) filters.append(el("span", null, f.label ? " · unread" : "Unread"));
    const clear = el("button", "filter-clear", "Clear");
    clear.type = "button";
    clear.addEventListener("click", () => setQuery(""));
    filters.append(clear);
  }

  function updateViews() {
    views.replaceChildren(
      ...VIEWS.map((v) => {
        const b = el("button", "view", v.name);
        b.type = "button";
        if (v === view) b.setAttribute("aria-current", "true");
        b.addEventListener("click", () => switchView(v));
        return b;
      }),
    );
    const hint = el("kbd", "tl-kbd", "← →");
    hint.title = "Arrow keys or Tab switch mailbox";
    views.append(hint);
  }

  function switchView(next) {
    if (next === view) return;
    view = next;
    const hadRowFocus = document.activeElement?.classList.contains("mail");
    transition(() => {
      render();
      if (hadRowFocus) list.querySelector(".mail")?.focus({ preventScroll: true });
    });
  }

  function cycleView(dir) {
    const i = VIEWS.indexOf(view);
    switchView(VIEWS[(i + dir + VIEWS.length) % VIEWS.length]);
  }

  function render() {
    const f = currentFilter();
    const visible = inView().filter((m) => matches(m, f));
    // Selection only covers rows you can see.
    for (const id of selected) if (!visible.some((m) => m.id === id)) selected.delete(id);
    list.replaceChildren(...visible.map(row));
    list.hidden = false;
    empty.hidden = visible.length > 0;
    empty.textContent = visible.length ? "" : emptyText();
    updateCount(f);
    updateFilters(f);
    updateViews();
  }

  function setQuery(q) {
    if (open) closeReader({ instant: true });
    search.value = q;
    render();
    search.focus();
    search.setSelectionRange(q.length, q.length);
  }

  // Clicking anywhere in the blurred space behind the card closes it.
  document.addEventListener("pointerdown", (e) => {
    if ((!open && !composing) || morph || shortcuts.open) return;
    if (reader.contains(e.target) || toolbar.contains(e.target) || toast.contains(e.target)) return;
    if (composing) closeCompose(); else closeReader();
  });

  /* ---------- hover ---------- */

  // Chrome leaves :hover stuck when the pointer exits through a tab or app
  // switch, so row hover styles are gated off until the pointer moves again.
  const root = document.documentElement;
  const pointerAway = () => root.setAttribute("data-pointer-away", "");
  const pointerBack = () => root.removeAttribute("data-pointer-away");
  window.addEventListener("blur", pointerAway);
  root.addEventListener("mouseleave", pointerAway);
  document.addEventListener("visibilitychange", () => { if (document.hidden) pointerAway(); });
  document.addEventListener("mousemove", pointerBack, { passive: true });
  document.addEventListener("pointerdown", pointerBack);

  /* ---------- keyboard ---------- */

  search.addEventListener("input", () => {
    if (open) closeReader({ instant: true });
    render();
  });
  search.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (search.value) { e.preventDefault(); setQuery(""); }
      else search.blur();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      list.querySelector(".mail")?.focus();
    }
  });

  document.addEventListener("keydown", (e) => {
    const inField = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

    // The shortcut sheet is modal: it closes itself on Escape, and ? toggles it.
    if (shortcuts.open) {
      if (e.key === "?") { e.preventDefault(); shortcuts.close(); }
      return;
    }

    // Reply mode: the textarea owns the keyboard.
    if (open && inReply()) {
      if (e.key === "Escape") { e.preventDefault(); closeReply(); }
      else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); sendReply(); }
      return;
    }

    // Compose mode: the fields own the keyboard.
    if (composing) {
      if (e.key === "Escape") { e.preventDefault(); closeCompose(); }
      else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); sendCompose(); }
      return;
    }

    if (inField) return;
    const mod = (e.metaKey || e.ctrlKey) && !e.altKey && !e.shiftKey;
    if (mod && e.key.toLowerCase() === "z") { e.preventDefault(); undoLast(); return; }
    if (mod && e.key.toLowerCase() === "a" && !open) { e.preventDefault(); selectAll(); return; }
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (e.key === "?") {
      e.preventDefault();
      shortcuts.showModal();
      shortcuts.focus(); // the sheet, not its close button, so no focus ring greets you
      return;
    }
    if (e.key === "z") { e.preventDefault(); undoLast(); return; }

    // Reader mode.
    if (open) {
      if (e.key === "Escape") { e.preventDefault(); closeReader(); }
      else if (e.key === "u") { e.preventDefault(); toggleRead([open]); closeReader(); }
      else if (e.key === "c") { e.preventDefault(); openCompose(); }
      else if (e.key === "Enter") { e.preventDefault(); openReply(); }
      else if (e.key === "e") { e.preventDefault(); archiveOpen(); }
      else if (e.key === "ArrowDown" || e.key === "j") { e.preventDefault(); step(1); }
      else if (e.key === "ArrowUp" || e.key === "k") { e.preventDefault(); step(-1); }
      else if (e.key === "/") { e.preventDefault(); search.focus(); search.select(); }
      return;
    }

    // List mode.
    if (e.key === "Tab") { e.preventDefault(); cycleView(e.shiftKey ? -1 : 1); return; }
    if (e.key === "ArrowRight") { e.preventDefault(); cycleView(1); return; }
    if (e.key === "ArrowLeft") { e.preventDefault(); cycleView(-1); return; }
    if (e.key === "/") { e.preventDefault(); search.focus(); search.select(); return; }
    if (e.key === "c") { e.preventDefault(); openCompose(); return; }
    const rows = [...list.querySelectorAll(".mail")];
    const idx = rows.indexOf(document.activeElement);
    // Row actions apply to the selection, else the focused row, else the hovered one.
    const target = idx >= 0 ? rows[idx] : (root.hasAttribute("data-pointer-away") ? null : list.querySelector(".mail:hover"));
    if (e.key === "Escape" && selected.size) {
      e.preventDefault();
      clearSelection();
    } else if (e.key === "Enter" && idx >= 0) {
      e.preventDefault();
      openMail(mailFor(rows[idx]));
    } else if (e.key === "x") {
      if (target) { e.preventDefault(); toggleSelect(target); }
    } else if (e.key === "e") {
      const lis = selected.size ? selectedRows() : target ? [target] : [];
      if (lis.length) { e.preventDefault(); archiveRows(lis); }
    } else if (e.key === "u") {
      const lis = selected.size ? selectedRows() : target ? [target] : [];
      if (lis.length) { e.preventDefault(); toggleRead(lis.map(mailFor)); }
    } else if (e.key === "ArrowDown" || e.key === "j") {
      e.preventDefault();
      (rows[idx + 1] || rows[0])?.focus();
    } else if (e.key === "ArrowUp" || e.key === "k") {
      e.preventDefault();
      if (idx <= 0) search.focus(); else rows[idx - 1].focus();
    } else if (e.key === "Escape" && idx >= 0) {
      search.focus();
    }
  });

  /* ---------- shortcut sheet ---------- */

  shortcuts.querySelector("[data-close]").addEventListener("click", () => shortcuts.close());
  // Clicking the backdrop (the dialog element itself, outside its content) closes it.
  shortcuts.addEventListener("click", (e) => { if (e.target === shortcuts) shortcuts.close(); });

  /* ---------- theme ---------- */

  function applyTheme(mode) {
    document.body.setAttribute("data-trylle-theme", mode);
    const dark = mode === "dark";
    themeIcon.setAttribute("href", dark ? "#i-sun" : "#i-moon");
    toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    $("#favicon").href = dark ? "./favicon-dark.svg" : "./favicon-light.svg";
  }
  toggle.addEventListener("click", () => {
    const next = document.body.getAttribute("data-trylle-theme") === "dark" ? "light" : "dark";
    localStorage.setItem("embox-theme", next);
    applyTheme(next);
  });
  applyTheme(document.body.getAttribute("data-trylle-theme") || "light");

  render();
})();
