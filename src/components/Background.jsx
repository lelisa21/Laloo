import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let points = [];
    const mouse = { x: -999, y: -999 };
    let color = "#2DD4A0";
    let frame = 0;
    let raf = 0;

    function size() {
      const density = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * density;
      canvas.height = height * density;
      ctx.setTransform(density, 0, 0, density, 0, 0);
      const count = Math.min(80, Math.round((width * height) / 15000));
      points = [];
      for (let i = 0; i < count; i += 1) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
        });
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      if (frame % 60 === 0) {
        color =
          getComputedStyle(document.documentElement).getPropertyValue("--acc").trim() || color;
      }
      frame += 1;
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      for (let i = 0; i < points.length; i += 1) {
        const point = points[i];
        if (!reduce) {
          point.x += point.vx;
          point.y += point.vy;
          if (point.x < 0 || point.x > width) point.vx *= -1;
          if (point.y < 0 || point.y > height) point.vy *= -1;
        }

        const dx = point.x - mouse.x;
        const dy = point.y - mouse.y;
        const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
        if (distanceToMouse < 150) {
          ctx.globalAlpha = (1 - distanceToMouse / 150) * 0.5;
          ctx.beginPath();
          ctx.moveTo(point.x, point.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
          if (!reduce && distanceToMouse > 1) {
            point.x += (dx / distanceToMouse) * 0.6;
            point.y += (dy / distanceToMouse) * 0.6;
          }
        }

        for (let j = i + 1; j < points.length; j += 1) {
          const other = points[j];
          const ex = point.x - other.x;
          const ey = point.y - other.y;
          const distance = ex * ex + ey * ey;
          if (distance < 14400) {
            ctx.globalAlpha = (1 - distance / 14400) * 0.22;
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(other.x, other.y);
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduce) raf = window.requestAnimationFrame(draw);
    }

    const onPointerMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };

    window.addEventListener("resize", size);
    window.addEventListener("pointermove", onPointerMove);
    size();
    draw();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  return (
    <>
      <div className="aur" aria-hidden="true">
        <i />
        <i />
      </div>
      <canvas id="bg" ref={canvasRef} aria-hidden="true" />
    </>
  );
}
