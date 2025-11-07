import React, { useEffect, useRef, useState } from "react";

export function HeroSection() {
  const rows = [4, 3, 2, 2, 2, 3, 3, 4];
  const leftCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const leftAnimRef = useRef<number | null>(null);
  const rightAnimRef = useRef<number | null>(null);
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());
  const [time, setTime] = useState(0);

  // 🕒 grid ripple timer
  useEffect(() => {
    const interval = setInterval(() => setTime((t) => t + 0.03), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    function setupCanvas(
      canvas: HTMLCanvasElement,
      side: "left" | "right",
      animRef: React.MutableRefObject<number | null>
    ) {
      const ctx = canvas.getContext("2d", { alpha: true })!;
      let DPR = Math.max(1, window.devicePixelRatio || 1);
      let w = 0,
        h = 0;

      type CellState = {
        r: number;
        c: number;
        phase: "idle" | "enter" | "hold" | "exit";
        start: number;
        durationEnter: number;
        durationHold: number;
        durationExit: number;
        fadeProgress: number;
      };

      const cells: (CellState | null)[] = [];
      const COLORS = { a: "#007BFF", b: "#00FFF0" };

      const ENTER_MS = 180;
      const HOLD_MS = 900;
      const EXIT_MS = 180;
      const SPAWN_INTERVAL = 900;

      function resize() {
        DPR = Math.max(1, window.devicePixelRatio || 1);
        w = window.innerWidth / 2;
        h = window.innerHeight;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        canvas.width = Math.round(w * DPR);
        canvas.height = Math.round(h * DPR);
        ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

        const rowHeight = h / rows.length;
        const cellSize = rowHeight;
        cells.length = 0;
        for (let r = 0; r < rows.length; r++) {
          const count = rows[r];
          for (let c = 0; c < count; c++) {
            cells.push({
              r,
              c,
              phase: "idle",
              start: 0,
              durationEnter: ENTER_MS,
              durationHold: HOLD_MS,
              durationExit: EXIT_MS,
              fadeProgress: 0,
            });
          }
        }
      }

      function coordsForCell(state: CellState) {
        const rowHeight = h / rows.length;
        const cellSize = rowHeight;
        let x = state.c * cellSize;
        const y = state.r * rowHeight;
        if (side === "right") x = w - (state.c + 1) * cellSize;
        return { x, y, s: cellSize };
      }

      function spawnCluster() {
        const now = performance.now();
        if (cells.length === 0) return;
        const clusterSize = 1 + Math.floor(Math.random() * 3);
        const newActive = new Set<string>();

        for (let i = 0; i < clusterSize; i++) {
          const idx = Math.floor(Math.random() * cells.length);
          const cell = cells[idx];
          if (!cell) continue;
          cell.phase = "enter";
          cell.start = now + i * 100;
          cell.fadeProgress = 0;
          newActive.add(`${cell.r},${cell.c}`);
        }

        setActiveCells((prev) => {
          const updated = new Set(prev);
          newActive.forEach((k) => updated.add(k));
          return updated;
        });

        setTimeout(() => {
          setActiveCells((prev) => {
            const updated = new Set(prev);
            newActive.forEach((k) => updated.delete(k));
            return updated;
          });
        }, HOLD_MS + 300);
      }

      let lastSpawn = 0;

      function cleanup(now: number) {
        for (const cell of cells) {
          if (!cell) continue;
          if (cell.phase === "exit" && now - cell.start > cell.durationExit) {
            cell.phase = "idle";
            cell.fadeProgress = 0;
          }
        }
      }

      function draw(now: number) {
        ctx.clearRect(0, 0, w, h);
        for (const cell of cells) {
          if (!cell) continue;
          const { x, y, s } = coordsForCell(cell);
          let localT = 0;

          if (cell.phase === "enter") {
            const dt = now - cell.start;
            localT = Math.min(1, dt / cell.durationEnter);
            cell.fadeProgress = localT;
            if (localT >= 1) {
              cell.phase = "hold";
              cell.start = now;
            }
          } else if (cell.phase === "hold") {
            const dt = now - cell.start;
            cell.fadeProgress = 1;
            if (dt > cell.durationHold) {
              cell.phase = "exit";
              cell.start = now;
            }
          } else if (cell.phase === "exit") {
            const dt = now - cell.start;
            localT = Math.min(1, dt / cell.durationExit);
            cell.fadeProgress = localT;
          }

          if (cell.phase !== "idle") {
            const gx =
              side === "left"
                ? ctx.createLinearGradient(x, y, x + s, y)
                : ctx.createLinearGradient(x + s, y, x, y);

            gx.addColorStop(0, COLORS.a);
            gx.addColorStop(1, COLORS.b);
            ctx.save();
            ctx.shadowBlur = 18 * Math.min(1, s / 140);
            ctx.shadowColor = COLORS.b;
            ctx.fillStyle = gx;

            const isRight = side === "right";
            if (cell.phase === "enter") {
              const visibleWidth = s * cell.fadeProgress;
              if (!isRight) ctx.fillRect(x, y, visibleWidth, s);
              else ctx.fillRect(x + (s - visibleWidth), y, visibleWidth, s);
            } else if (cell.phase === "hold") {
              ctx.fillRect(x, y, s, s);
            } else if (cell.phase === "exit") {
              ctx.fillRect(x, y, s, s);
              const maskGrad = isRight
                ? ctx.createLinearGradient(x + s, 0, x, 0)
                : ctx.createLinearGradient(x, 0, x + s, 0);
              maskGrad.addColorStop(0, "rgba(0,0,0,1)");
              maskGrad.addColorStop(cell.fadeProgress, "rgba(0,0,0,0)");
              ctx.globalCompositeOperation = "destination-out";
              ctx.fillStyle = maskGrad;
              ctx.fillRect(x, y, s, s);
              ctx.globalCompositeOperation = "source-over";
            }
            ctx.restore();
          }
        }
      }

      function frame(now: number) {
        if (!lastSpawn) lastSpawn = now;
        if (now - lastSpawn > SPAWN_INTERVAL) {
          spawnCluster();
          lastSpawn = now - Math.random() * 100;
        }
        cleanup(now);
        draw(now);
        animRef.current = requestAnimationFrame(frame);
      }

      resize();
      window.addEventListener("resize", resize);
      animRef.current = requestAnimationFrame(frame);

      return () => {
        window.removeEventListener("resize", resize);
        if (animRef.current) cancelAnimationFrame(animRef.current);
      };
    }

    if (leftCanvasRef.current)
      setupCanvas(leftCanvasRef.current, "left", leftAnimRef);
    if (rightCanvasRef.current)
      setupCanvas(rightCanvasRef.current, "right", rightAnimRef);
  }, []);

  // 💫 glow diffusion helper
  const getGlowIntensity = (r: number, c: number) => {
    let maxGlow = 0;
    activeCells.forEach((key) => {
      const [ar, ac] = key.split(",").map(Number);
      const dist = Math.sqrt((ar - r) ** 2 + (ac - c) ** 2);
      const intensity = Math.max(0, 1 - dist / 2);
      if (intensity > maxGlow) maxGlow = intensity;
    });
    const ripple = 0.1 * Math.sin(time * 2 + r * 0.8 + c * 0.6);
    return Math.min(1, maxGlow + ripple);
  };

  return (
    <>
      {/* Import Kumar One font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Kumar+One&family=Manrope:wght@300;400&display=swap"
        rel="stylesheet"
      />

      <section className="relative w-full min-h-screen bg-black overflow-hidden">
        {/* Left Grid */}
        <div className="absolute left-0 top-0 h-full flex flex-col text-transparent">
          {rows.map((count, r) => (
            <div key={r} className="flex h-[12.5vh]">
              {Array.from({ length: count }).map((_, c) => {
                const glow = getGlowIntensity(r, c);
                const borderOpacity = 0.18 + 0.17 * glow;
                const outerGlow = 0.08 + 0.2 * glow;
                const innerGlow = 0.12 + 0.2 * glow;
                return (
                  <div
                    key={c}
                    className="aspect-square h-full w-auto"
                    style={{
                      width: `calc(12.5vh)`,
                      border: `1px solid rgba(255,255,255,${borderOpacity})`,
                      boxShadow: `inset 0 0 6px rgba(255,255,255,${innerGlow}),
                                   0 0 8px rgba(255,255,255,${outerGlow})`,
                      borderRadius: "2px",
                      transition: "all 0.4s ease",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <canvas
          ref={leftCanvasRef}
          className="absolute left-0 top-0 pointer-events-none"
        />

        {/* Right Grid */}
        <div className="absolute right-0 top-0 h-full flex flex-col items-end text-transparent">
          {rows.map((count, r) => (
            <div key={r} className="flex h-[12.5vh]">
              {Array.from({ length: count }).map((_, c) => {
                const glow = getGlowIntensity(r, c);
                const borderOpacity = 0.18 + 0.17 * glow;
                const outerGlow = 0.08 + 0.2 * glow;
                const innerGlow = 0.12 + 0.2 * glow;
                return (
                  <div
                    key={c}
                    className="aspect-square h-full w-auto"
                    style={{
                      width: `calc(12.5vh)`,
                      border: `1px solid rgba(255,255,255,${borderOpacity})`,
                      boxShadow: `inset 0 0 6px rgba(255,255,255,${innerGlow}),
                                   0 0 8px rgba(255,255,255,${outerGlow})`,
                      borderRadius: "2px",
                      transition: "all 0.4s ease",
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <canvas
          ref={rightCanvasRef}
          className="absolute right-0 top-0 pointer-events-none"
        />

        {/* ✨ Center Hero Section */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center space-y-3">
          <h1
            className="text-white text-[7vw] tracking-tight"
            style={{
              fontFamily: "'Kumar One', sans-serif",
              fontWeight: "700",
              letterSpacing: "-0.02em",
            }}
          >
            NoCap Rewu
          </h1>
          <p
            className="text-gray-400 text-[1.3vw] tracking-wide"
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: "300",
            }}
          >
            where design meets next-gen rhythm ⚡
          </p>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
