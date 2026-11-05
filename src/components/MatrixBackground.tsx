"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const fontSize = 18;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let width = 0;
    let height = 0;
    let drops: number[] = [];
    let animationId = 0;
    let previousTime = 0;

    function resize() {
      if (!canvas || !context) return;

      width = window.innerWidth;
      height = window.innerHeight;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);

      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      drops = Array.from(
        { length: Math.ceil(width / fontSize) },
        () => Math.random() * height / fontSize,
      );

      if (motion.matches) draw();
    }

    function draw() {
      if (!context) return;

      // La transparencia deja un rastro detrás de cada número.
      context.fillStyle = "rgba(0, 0, 0, 0.08)";
      context.fillRect(0, 0, width, height);
      context.font = `${fontSize}px monospace`;

      drops.forEach((drop, column) => {
        context.fillStyle =
          Math.random() > 0.98 ? "#caffdb" : "#00c853";

        context.fillText(
          Math.random() > 0.5 ? "1" : "0",
          column * fontSize,
          drop * fontSize,
        );

        if (drop * fontSize > height && Math.random() > 0.975) {
          drops[column] = 0;
        } else {
          drops[column] += 0.65;
        }
      });
    }

    function animate(time: number) {
      // Limita la animación a unos 24 cuadros por segundo.
      if (time - previousTime >= 1000 / 24) {
        if (!document.hidden) draw();
        previousTime = time;
      }

      animationId = requestAnimationFrame(animate);
    }

    function start() {
      cancelAnimationFrame(animationId);
      previousTime = 0;

      if (!motion.matches) {
        animationId = requestAnimationFrame(animate);
      }
    }

    resize();
    start();

    window.addEventListener("resize", resize);
    motion.addEventListener("change", start);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      motion.removeEventListener("change", start);
    };
  }, []);

  return (
    <div className="matrix-background" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="matrix-overlay" />
    </div>
  );
}