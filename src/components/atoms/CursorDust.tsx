"use client";

import { useEffect, useRef } from "react";

// Azúcar espolvoreado: rose sugar grains falling slowly through the page.
// - Grains live in DOCUMENT space (worldY over the full scroll height) and are
//   drawn at worldY - scrollY, so scrolling down reveals *fresh* grains rather
//   than dragging the same ones — the field feels like it belongs to the page.
// - The cursor gives a playful UPWARD kick (not a radial shove); gravity pulls
//   them back down.
// Lives on a fixed -z-10 layer (globals.css) so it's never over objects.

const COLORS = ["#c0617a", "#bc7a88", "#d08259", "#a8546a", "#e09aaa"];
const REPEL_RADIUS = 85; // px around cursor that reacts
const KICK = 0.9; // playful upward impulse strength
const GRAVITY = 0.0022; // per-frame downward pull (gentle terminal fall)
const SPRITE = 20; // px of each pre-rendered grain

type P = { x: number; wy: number; vx: number; vy: number; r: number; a: number; c: number; tw: number; ts: number };

// A grain: tiny solid core + tight falloff (crystalline), not a wide soft blob.
function makeSprite(color: string): HTMLCanvasElement {
  const c = document.createElement("canvas");
  c.width = c.height = SPRITE;
  const g = c.getContext("2d")!;
  const m = SPRITE / 2;
  const grad = g.createRadialGradient(m, m, 0, m, m, m);
  grad.addColorStop(0, color);
  grad.addColorStop(0.28, color);
  grad.addColorStop(0.55, "rgba(255,255,255,0.25)");
  grad.addColorStop(1, "transparent");
  g.fillStyle = grad;
  g.fillRect(0, 0, SPRITE, SPRITE);
  g.fillStyle = color;
  g.beginPath();
  g.arc(m, m, SPRITE * 0.1, 0, Math.PI * 2);
  g.fill();
  return c;
}

export function CursorDust() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;
    const sprites = COLORS.map(makeSprite);

    let w = 0;
    let h = 0;
    let period = 0; // full document height the grains spread over
    let particles: P[] = [];
    let t = 0;
    const pointer = { x: -9999, y: -9999 };

    function seed() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      period = Math.max(document.documentElement.scrollHeight, h);
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      // scale count to the whole document so visible density stays constant
      const count = Math.min(380, Math.round((w * period) / 9000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        wy: Math.random() * period,
        vx: (Math.random() - 0.5) * 0.06,
        vy: 0.05 + Math.random() * 0.12, // gentle fall
        r: 0.8 + Math.random() ** 2 * 3.8,
        a: 0.25 + Math.random() * 0.4,
        c: Math.floor(Math.random() * sprites.length),
        tw: Math.random() * Math.PI * 2,
        ts: 0.6 + Math.random() * 1.8,
      }));
    }

    function draw(live: boolean) {
      const scrollY = window.scrollY;
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        if (live) {
          const sx = p.x;
          const sy = p.wy - scrollY;
          const dx = sx - pointer.x;
          const dy = sy - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_RADIUS) {
            const force = (1 - d / REPEL_RADIUS) ** 2;
            p.vy -= force * KICK; // playful upward kick
            p.vx += (dx / (d || 1)) * force * 0.5; // slight sideways scatter
          }
          p.vy += GRAVITY;
          p.vy *= 0.985; // air resistance → gentle terminal fall
          p.vx *= 0.95;
          p.vx += (Math.random() - 0.5) * 0.008; // faint shimmer drift
          p.x += p.vx;
          p.wy += p.vy;
          if (p.x < -10) p.x = w + 10;
          else if (p.x > w + 10) p.x = -10;
          if (p.wy > period) p.wy -= period;
          else if (p.wy < 0) p.wy += period;
        }

        const sy = p.wy - scrollY;
        if (sy < -12 || sy > h + 12) continue; // cull off-screen grains

        const twinkle = live ? 0.6 + 0.4 * Math.sin(t * p.ts + p.tw) : 1;
        let brightness = p.a * twinkle;
        let scale = 1;
        if (live) {
          const d = Math.hypot(p.x - pointer.x, sy - pointer.y);
          if (d < REPEL_RADIUS) {
            const force = (1 - d / REPEL_RADIUS) ** 2;
            brightness = Math.min(0.9, brightness + force * 0.6);
            scale = 1 + force * 0.7;
          }
        }
        const size = p.r * 2 * scale;
        ctx!.globalAlpha = brightness;
        ctx!.drawImage(sprites[p.c], p.x - size / 2, sy - size / 2, size, size);
      }
      ctx!.globalAlpha = 1;
    }

    seed();

    let raf = 0;
    if (reduced || touch) {
      draw(false); // static field — no cursor, no fall (battery/a11y)
      const onResize = () => {
        seed();
        draw(false);
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = pointer.y = -9999;
    };
    const onResize = () => seed();
    const loop = () => {
      t += 0.016;
      draw(true);
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseout", onLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
