// browser-control execute --session <id> --file tools/probe.js
// Opens and closes an email while sampling element geometry/opacity every
// animation frame (real speed), then captures a 0.2x slow-motion screenshot
// sequence for frame differencing. Output goes to $OUT (see below).
page.setDefaultTimeout(10000);
const OUT = "/private/var/folders/2j/6mslx1715gx8frsyn66sf1sh0000gn/T/opencode/focus-mail/probe";
const ROW = 7; // which row to open
await fs.promises.rm(OUT, { recursive: true, force: true });
await fs.promises.mkdir(`${OUT}/frames`, { recursive: true });

await page.goto("http://127.0.0.1:4391/");
await page.getByRole("list").waitFor();
await page.evaluate(() => document.fonts.ready);
if ((await page.evaluate(() => document.body.getAttribute("data-trylle-theme"))) !== "dark") {
  await page.getByRole("button", { name: /switch to dark/i }).click();
}
await page.mouse.move(5, 5);
await page.waitForTimeout(300);

const startSampler = () => page.evaluate(() => {
  const S = (window.__probe = { t0: performance.now(), samples: [], on: true });
  const q = (s) => document.querySelector(s);
  const rect = (el) => { const r = el.getBoundingClientRect(); return { top: r.top, height: r.height, left: r.left, width: r.width }; };
  const num = (v) => parseFloat(v) || 0;
  const loop = (now) => {
    if (!S.on) return;
    const s = { t: now - S.t0 };
    const reader = q("#reader");
    if (reader && !reader.hidden) {
      const cs = getComputedStyle(reader);
      const r = rect(reader);
      const m = cs.clipPath.match(/inset\(([^)]*)\)/);
      let cut = 0;
      if (m) { const parts = m[1].split(" round ")[0].trim().split(/\s+/).map(num); cut = parts.length >= 3 ? parts[2] : parts[0]; }
      s.card = { top: r.top, height: r.height - cut, left: r.left, width: r.width };
      for (const [k, sel] of Object.entries({ surface: ".reader-surface", ghost: ".reader-ghost", head: ".reader-head", body: ".reader-body" })) {
        const el = q(sel); if (el) s[k] = { opacity: num(getComputedStyle(el).opacity), ...rect(el) };
      }
      for (const [k, sel] of Object.entries({ ghostSubject: ".reader-ghost .mail-subject", subject: ".reader-subject", ghostFrom: ".reader-ghost .mail-from", meta: ".reader-meta", ghostBar: ".reader-ghost .mail-bar", headBar: ".reader-head .mail-bar" })) {
        const el = q(sel); if (el) s[k] = rect(el);
      }
    }
    const st = q("#stage"); const scs = getComputedStyle(st);
    const blur = scs.filter.match(/blur\(([\d.]+)px\)/);
    const tm = scs.transform.match(/matrix\(([^)]*)\)/);
    s.stage = { blur: blur ? num(blur[1]) : 0, opacity: num(scs.opacity), scale: tm ? num(tm[1].split(",")[0]) : 1 };
    S.samples.push(s);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
});
const stopSampler = () => page.evaluate(() => { window.__probe.on = false; return window.__probe.samples; });

const row = page.locator(".mail").nth(ROW);
const rb = await row.boundingBox();
const rowSnapshot = await row.evaluate((el) => { const r = el.getBoundingClientRect(); const s = el.querySelector(".mail-subject").getBoundingClientRect(); const f = el.querySelector(".mail-from").getBoundingClientRect(); return { top: r.top, height: r.height, subjectTop: s.top, subjectHeight: s.height, fromTop: f.top }; });

await page.mouse.move(rb.x + 300, rb.y + 20); await page.waitForTimeout(400);
await startSampler(); await page.mouse.click(rb.x + 300, rb.y + 20); await page.waitForTimeout(1100);
const openSamples = await stopSampler();
await page.waitForTimeout(200);
await startSampler(); await page.keyboard.press("Escape"); await page.waitForTimeout(1000);
const closeSamples = await stopSampler();
await fs.promises.writeFile(`${OUT}/trajectory.json`, JSON.stringify({ row: rowSnapshot, open: openSamples, close: closeSamples }));

// Slow-motion frames for pixel differencing.
await page.mouse.move(5, 5); await page.waitForTimeout(400);
const cdp = await page.context().newCDPSession(page);
const frames = []; let running = true; const t0 = Date.now();
const capture = (async () => { let i = 0; while (running) { const t = Date.now() - t0; const { data } = await cdp.send("Page.captureScreenshot", { format: "png", clip: { x: 0, y: 0, width: 1280, height: 900, scale: 1 } }); await fs.promises.writeFile(`${OUT}/frames/f${String(i).padStart(4, "0")}.png`, Buffer.from(data, "base64")); frames.push({ i, t }); i++; } })();
const marks = []; const stamp = (l) => marks.push({ label: l, t: Date.now() - t0 });
const slow = () => page.evaluate(() => document.getAnimations().forEach((a) => { a.playbackRate = 0.2; }));
await page.mouse.move(rb.x + 300, rb.y + 20); await page.waitForTimeout(500);
stamp("open"); await page.mouse.click(rb.x + 300, rb.y + 20); await slow();
await page.waitForTimeout(2600);
stamp("close"); await page.keyboard.press("Escape"); await slow();
await page.waitForTimeout(2400);
running = false; await capture;
await fs.promises.writeFile(`${OUT}/frames/marks.json`, JSON.stringify({ marks, frames, rate: 0.2 }));
return { openSamples: openSamples.length, closeSamples: closeSamples.length, frames: frames.length, out: OUT };
