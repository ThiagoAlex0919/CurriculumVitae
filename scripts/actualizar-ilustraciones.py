#!/usr/bin/env python3
"""
Pipeline de ilustraciones de /experiencia.
Detecta PNGs nuevos o actualizados en public/ilustraciones, les limpia
el lienzo (velo semitransparente + fondo blanco conectado al borde) y
los convierte a WebP. Uso:  python3 scripts/actualizar-ilustraciones.py
"""
import os, sys
import numpy as np
from PIL import Image

DIR = os.path.join(os.path.dirname(__file__), "..", "public", "ilustraciones")
# estas conservan su suelo blanco opaco (van full-bleed por CSS)
NO_FLOOD = {"moon.png", "innicion_.png"}

def clean(path):
    f = os.path.basename(path)
    im = Image.open(path).convert("RGBA")
    a = np.array(im).astype(np.uint8)
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    al = a[..., 3].astype(int)
    whitish = (r >= 222) & (g >= 222) & (b >= 222)

    semi = (al > 0) & (al < 250) & whitish
    a[..., 3][semi] = 0
    al[semi] = 0

    if f not in NO_FLOOD:
        bg = whitish | (al == 0)
        h, w = bg.shape
        s = 4
        H, W = h // s, w // s
        small = bg[:H*s, :W*s].reshape(H, s, W, s).all(axis=(1, 3))
        conn = np.zeros_like(small)
        conn[0, :] = small[0, :]; conn[-1, :] = small[-1, :]
        conn[:, 0] |= small[:, 0]; conn[:, -1] |= small[:, -1]
        while True:
            grown = conn.copy()
            grown[1:, :] |= conn[:-1, :]; grown[:-1, :] |= conn[1:, :]
            grown[:, 1:] |= conn[:, :-1]; grown[:, :-1] |= conn[:, 1:]
            grown &= small
            if (grown == conn).all(): break
            conn = grown
        full = np.zeros_like(bg)
        full[:H*s, :W*s] = np.repeat(np.repeat(conn, s, axis=0), s, axis=1)
        full &= bg
        for _ in range(8):
            grown = full.copy()
            grown[1:, :] |= full[:-1, :]; grown[:-1, :] |= full[1:, :]
            grown[:, 1:] |= full[:, :-1]; grown[:, :-1] |= full[:, 1:]
            grown &= bg
            full = grown
        full[0:2, :] |= bg[0:2, :]; full[-2:, :] |= bg[-2:, :]
        full[:, 0:2] |= bg[:, 0:2]; full[:, -2:] |= bg[:, -2:]
        a[..., 3][full] = 0

    Image.fromarray(a).save(path)

def main():
    os.chdir(DIR)
    pend = []
    for f in sorted(os.listdir(".")):
        if not f.endswith(".png"): continue
        w = f.replace(".png", ".webp")
        if not os.path.exists(w) or os.path.getmtime(f) > os.path.getmtime(w):
            pend.append(f)
    if not pend:
        print("Nada que actualizar."); return
    for f in pend:
        clean(f)
        f_webp = f.replace(".png", ".webp")
        Image.open(f).save(f_webp, "WEBP", quality=82, method=4)
        print("actualizado:", f, "->", f_webp, flush=True)

if __name__ == "__main__":
    main()
