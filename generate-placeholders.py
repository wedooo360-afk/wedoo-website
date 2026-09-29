"""
Generates labelled placeholder imagery for every project in /public/work/<slug>/.

These are NOT final visuals. Each image carries its target path in the corner so it is
obvious which file to replace. Drop real photography / case-study images in with the same
file names and the site picks them up automatically.

Run:  python3 scripts/generate-placeholders.py
Needs: pip install pillow numpy fonttools brotli
"""
from pathlib import Path
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "work"
FONT = str(ROOT / "scripts" / "fonts" / "Archivo.ttf")
MONO = str(ROOT / "node_modules" / "geist" / "dist" / "fonts" / "geist-mono" / "GeistMono-Regular.ttf")

PAPER = (241, 240, 235)
INK = (17, 17, 17)
MASS = (12, 21, 26)


def hexrgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i : i + 2], 16) for i in (0, 2, 4))


PROJECTS = [
    # slug, display word(s), tone, accent, paper
    ("soutsakan", "Soutsakan", "#1E2A4A", "#C9B37E", "#ECE8DE"),
    ("futura-school", "Futura", "#D24A2C", "#1B1B1B", "#F3ECE0"),
    ("kyae-oh-king", "Kyae Oh King", "#6B1A14", "#E7AE3A", "#F1E6D3"),
    ("star-exam", "Star Exam", "#0F4C45", "#EFD24A", "#E9EDE6"),
]

SHOTS = [
    # name, size, composition
    ("hero", (2400, 1500), "field"),
    ("image-01", (2400, 1350), "strip"),
    ("image-02", (1200, 1500), "specimen"),
    ("image-03", (1200, 1500), "poster"),
    ("image-04", (2400, 1100), "palette"),
    ("image-05", (1600, 1600), "screens"),
    ("image-06", (1600, 1000), "detail"),
]


def font(size, wght=800, wdth=110):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_axes([wght, wdth])
    except Exception:
        pass
    return f


def mono(size):
    return ImageFont.truetype(MONO, size)


def grain(img, amount=9):
    arr = np.asarray(img).astype(np.int16)
    rng = np.random.default_rng(7)
    noise = rng.normal(0, amount, arr.shape[:2])[..., None]
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    return Image.fromarray(arr)


def label(d, w, h, text, color, idx):
    s = max(14, int(w * 0.009))
    m = mono(s)
    pad = int(w * 0.022)
    d.text((pad, h - pad - s), f"PLACEHOLDER  ·  {text}  ·  {w}×{h}", font=m, fill=color)
    d.text((w - pad, pad), idx, font=m, fill=color, anchor="ra")


def text_w(d, s, f):
    b = d.textbbox((0, 0), s, font=f)
    return b[2] - b[0], b[3] - b[1], b


def compose(kind, size, word, tone, accent, paper, path_label, idx):
    w, h = size
    if kind == "field":
        img = Image.new("RGB", size, tone)
        d = ImageDraw.Draw(img)
        # hairline 12-col grid
        for i in range(1, 12):
            x = int(w * i / 12)
            d.line([(x, 0), (x, h)], fill=tuple(min(255, c + 14) for c in tone), width=1)
        f = font(int(h * 0.46), 850, 118)
        tw, th, b = text_w(d, word, f)
        d.text((int(w * 0.03) - b[0], int(h * 0.58) - b[1]), word, font=f, fill=paper)
        d.rectangle([int(w * 0.70), int(h * 0.12), int(w * 0.82), int(h * 0.30)], fill=accent)
        lc = paper
    elif kind == "strip":
        img = Image.new("RGB", size, paper)
        d = ImageDraw.Draw(img)
        f = font(int(h * 0.22), 800, 125)
        y = int(h * 0.1)
        row = 0
        while y < h:
            s = (word + "  ") * 6
            col = tone if row % 2 == 0 else accent
            d.text((-int(w * 0.07) * row, y), s, font=f, fill=col)
            y += int(h * 0.24)
            row += 1
        lc = INK
    elif kind == "specimen":
        img = Image.new("RGB", size, tone)
        d = ImageDraw.Draw(img)
        f = font(int(w * 0.62), 800, 100)
        d.text((int(w * 0.06), int(h * 0.04)), "Aa", font=f, fill=paper)
        m = mono(int(w * 0.022))
        for i, wt in enumerate(["Light 300", "Regular 400", "Medium 500", "Bold 700", "Black 900"]):
            d.text((int(w * 0.07), int(h * 0.62) + i * int(w * 0.045)), wt, font=m, fill=accent)
        lc = paper
    elif kind == "poster":
        img = Image.new("RGB", size, accent)
        d = ImageDraw.Draw(img)
        d.rectangle([0, int(h * 0.58), w, h], fill=tone)
        f = font(int(w * 0.78), 900, 80)
        d.text((int(w * 0.04), int(h * 0.02)), idx.split("/")[1].strip(), font=f, fill=tone)
        f2 = font(int(w * 0.07), 700, 110)
        d.text((int(w * 0.06), int(h * 0.64)), word, font=f2, fill=paper)
        lc = paper
    elif kind == "palette":
        img = Image.new("RGB", size, paper)
        d = ImageDraw.Draw(img)
        sw = [tone, accent, MASS, tuple(int(c * 0.6 + 255 * 0.4) for c in tone)]
        cw = w // len(sw)
        m = mono(int(h * 0.026))
        for i, c in enumerate(sw):
            top = int(h * (0.18 + 0.1 * i))
            d.rectangle([i * cw, top, (i + 1) * cw, h], fill=c)
            hx = "#%02X%02X%02X" % c
            d.text((i * cw + int(w * 0.012), top - int(h * 0.05)), hx, font=m, fill=INK)
        lc = paper
    elif kind == "screens":
        img = Image.new("RGB", size, paper)
        d = ImageDraw.Draw(img)
        pw, ph = int(w * 0.24), int(w * 0.5)
        for i in range(3):
            x = int(w * 0.1) + i * int(w * 0.29)
            y = int(h * 0.16) + (i % 2) * int(h * 0.1)
            d.rectangle([x, y, x + pw, y + ph], fill=tone if i != 1 else INK)
            d.rectangle([x + int(pw * 0.1), y + int(ph * 0.08), x + int(pw * 0.75), y + int(ph * 0.13)], fill=accent)
            for j in range(5):
                yy = y + int(ph * (0.5 + j * 0.07))
                d.rectangle([x + int(pw * 0.1), yy, x + int(pw * (0.9 - 0.12 * (j % 3))), yy + int(ph * 0.025)], fill=paper)
        lc = INK
    else:  # detail
        img = Image.new("RGB", size, MASS)
        d = ImageDraw.Draw(img)
        f = font(int(h * 1.5), 900, 125)
        d.text((-int(w * 0.08), -int(h * 0.42)), word[0], font=f, fill=tone)
        d.rectangle([int(w * 0.62), int(h * 0.62), int(w * 0.95), int(h * 0.64)], fill=accent)
        lc = paper
    d = ImageDraw.Draw(img)
    label(d, w, h, path_label, lc, idx)
    return grain(img)


def main():
    for slug, word, tone, accent, paper in PROJECTS:
        tone, accent, paper = hexrgb(tone), hexrgb(accent), hexrgb(paper)
        folder = OUT / slug
        folder.mkdir(parents=True, exist_ok=True)
        for i, (name, size, kind) in enumerate(SHOTS):
            idx = f"{slug.upper()} / {i:02d}"
            img = compose(kind, size, word, tone, accent, paper, f"/work/{slug}/{name}.jpg", idx)
            img.save(folder / f"{name}.jpg", quality=80, optimize=True, progressive=True)
        print("wrote", folder)

    # Studio placeholder (used in hero + about)
    ph = OUT.parent / "placeholders"
    ph.mkdir(exist_ok=True)
    w, h = 1200, 1600
    img = Image.new("RGB", (w, h), (205, 202, 193))
    d = ImageDraw.Draw(img)
    d.ellipse([int(w * 0.28), int(h * 0.18), int(w * 0.72), int(h * 0.52)], fill=(150, 146, 137))
    d.rectangle([int(w * 0.12), int(h * 0.56), int(w * 0.88), h], fill=(150, 146, 137))
    label(d, w, h, "/placeholders/studio.jpg (team or founder portrait)", INK, "STUDIO / 00")
    grain(img, 11).save(ph / "studio.jpg", quality=80, optimize=True, progressive=True)
    print("wrote studio placeholder")


if __name__ == "__main__":
    main()
