# uv run --no-project --with matplotlib --with numpy --with pillow tools/motion_report.py <probe-dir>
# Produces, next to the probe data:
#   trajectory.png  - per-frame geometry/opacity curves for open and close (steps = pops)
#   energy.png      - per-frame pixel-difference energy from the slow-motion frames (spikes = jumps)
#   onion-*.png     - onion-skin trails of the slow-motion frames
import json, sys, pathlib
import numpy as np
from PIL import Image, ImageChops
import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt

out = pathlib.Path(sys.argv[1])
traj = json.load(open(out / "trajectory.json"))
row = traj["row"]

def series(samples, path):
    xs, ys = [], []
    for s in samples:
        v = s
        for k in path.split("."):
            v = v.get(k) if isinstance(v, dict) else None
            if v is None:
                break
        if v is not None:
            xs.append(s["t"]); ys.append(v)
    return xs, ys

fig, axes = plt.subplots(4, 2, figsize=(15, 13), sharex="col")
for col, (label, samples) in enumerate([("open", traj["open"]), ("close", traj["close"])]):
    ax = axes[0][col]
    for path, name in [("card.top", "card top"), ("ghostSubject.top", "row subject top"), ("subject.top", "card subject top"), ("ghostFrom.top", "row sender top"), ("meta.top", "card sender top")]:
        ax.plot(*series(samples, path), label=name, lw=1.4)
    ax.axhline(row["top"], color="gray", ls=":", lw=.8); ax.axhline(row["subjectTop"], color="gray", ls=":", lw=.8)
    ax.set_title(f"{label}: vertical positions (px)"); ax.invert_yaxis(); ax.legend(fontsize=8)

    ax = axes[1][col]
    ax.plot(*series(samples, "card.height"), label="card visible height", lw=1.4)
    ax.plot(*series(samples, "subject.height"), label="card subject height", lw=1.4)
    ax.plot(*series(samples, "ghostBar.height"), label="row bar height", lw=1)
    ax.plot(*series(samples, "headBar.height"), label="card bar height", lw=1)
    ax.axhline(row["height"], color="gray", ls=":", lw=.8)
    ax.set_title(f"{label}: sizes (px)"); ax.legend(fontsize=8)

    ax = axes[2][col]
    for path, name in [("ghost.opacity", "row ghost"), ("head.opacity", "card header"), ("body.opacity", "card body"), ("surface.opacity", "card surface")]:
        ax.plot(*series(samples, path), label=name, lw=1.4)
    ax.plot(*series(samples, "stage.opacity"), label="list opacity", lw=1, ls="--")
    ax.set_title(f"{label}: opacity"); ax.set_ylim(-.05, 1.05); ax.legend(fontsize=8)

    ax = axes[3][col]
    ts, blur = series(samples, "stage.blur"); ax.plot(ts, blur, label="list blur px", lw=1.4)
    ts2, sc = series(samples, "stage.scale"); ax.plot(ts2, [(1 - v) * 400 for v in sc], label="list recede (1-scale)*400", lw=1)
    dts = np.diff([s["t"] for s in samples]); ax.plot([s["t"] for s in samples][1:], dts, label="frame interval ms", lw=.8, color="k", alpha=.6)
    ax.set_title(f"{label}: list depth + frame pacing"); ax.set_xlabel("ms"); ax.legend(fontsize=8)
    long = int((dts > 20).sum()); ax.text(0.99, 0.95, f"frames {len(samples)} · >20ms gaps: {long} · max {dts.max():.0f}ms", transform=ax.transAxes, ha="right", va="top", fontsize=8)
fig.tight_layout(); fig.savefig(out / "trajectory.png", dpi=110)

# Frame differencing on the slow-motion capture.
fdir = out / "frames"
meta = json.load(open(fdir / "marks.json"))
frames = meta["frames"]; rate = meta.get("rate", 1)
marks = {m["label"]: m["t"] for m in meta["marks"]}
crop = (230, 60, 1050, 900)
prev = None; energy = []
for f in frames:
    im = Image.open(fdir / f"f{f['i']:04d}.png").convert("L").crop(crop)
    if prev is not None:
        d = np.asarray(ImageChops.difference(im, prev), dtype=np.float32)
        energy.append((f["t"], d.mean(), d.max()))
    prev = im
fig, ax = plt.subplots(figsize=(15, 4))
ts = [e[0] for e in energy]; ax.plot(ts, [e[1] for e in energy], lw=1.4, label="mean |Δ| per frame")
for k, v in marks.items(): ax.axvline(v, color="gray", ls=":", lw=.8); ax.text(v, ax.get_ylim()[1] * .95, k, fontsize=8)
ax.set_xlabel(f"capture ms (animation at {rate}x)"); ax.set_title("Motion energy between consecutive frames — smooth motion is a smooth hump; a pop is a spike"); ax.legend()
fig.tight_layout(); fig.savefig(out / "energy.png", dpi=110)

# Onion-skin trails: every Nth frame in a window, composited.
def onion(label, t_from, t_to, name, step=3):
    sel = [f for f in frames if t_from <= f["t"] <= t_to][::step]
    if not sel: return
    base = Image.open(fdir / f"f{sel[0]['i']:04d}.png").convert("RGB").crop((230, 120, 1050, 620))
    acc = np.zeros((base.height, base.width, 3), dtype=np.float32)
    for f in sel:
        im = np.asarray(Image.open(fdir / f"f{f['i']:04d}.png").convert("RGB").crop((230, 120, 1050, 620)), dtype=np.float32)
        acc += im
    Image.fromarray(np.clip(acc / len(sel), 0, 255).astype(np.uint8)).save(out / name)
onion("open", marks["open"], marks["open"] + 620 / rate, "onion-open.png")
onion("close", marks["close"], marks["close"] + 520 / rate, "onion-close.png")
print("wrote", out / "trajectory.png", out / "energy.png")
