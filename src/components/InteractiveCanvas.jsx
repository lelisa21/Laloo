import { useEffect, useRef } from 'react';

export default function InteractiveCanvas({ viewMode = 'design' }) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000, radius: 180 });
  const animFrameRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const handlePointerMove = (e) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 14000), 85);
      const pts = [];

      for (let i = 0; i < count; i++) {
        pts.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          baseRadius: Math.random() * 2 + 1.2,
          radius: Math.random() * 2 + 1.2,
          // Colors for design mode
          hue: Math.random() > 0.5 ? 172 : 225, // Teal or Cobalt/Blue
          // Grid lock targets for systems mode
          gridX: (Math.floor(Math.random() * 20) + 1) * (width / 21),
          gridY: (Math.floor(Math.random() * 14) + 1) * (height / 15),
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
      particlesRef.current = pts;
    };

    resize();

    let lastTime = performance.now();

    const render = (currentTime) => {
      animFrameRef.current = requestAnimationFrame(render);
      const delta = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.12;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.12;

      ctx.clearRect(0, 0, width, height);

      const isSystems = viewMode === 'systems';
      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      // Draw subtle background grid in systems mode
      if (isSystems) {
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
        ctx.lineWidth = 1;
        const step = 60;
        for (let x = 0; x < width; x += step) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += step) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulsePhase += delta * 2;

        if (isSystems) {
          // Snap toward grid points in systems mode
          p.x += (p.gridX - p.x) * 0.05;
          p.y += (p.gridY - p.y) * 0.05;
        } else {
          // Free fluid drift in design mode
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Mouse interaction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 1.5;
          if (isSystems) {
            // In systems mode, push slightly and excite
            p.x -= (dx / dist) * force * 15;
            p.y -= (dy / dist) * force * 15;
          } else {
            // In design mode, fluid vortex swirl
            const angle = Math.atan2(dy, dx) + Math.PI / 2;
            p.x += Math.cos(angle) * force * 3 - (dx / dist) * force * 2;
            p.y += Math.sin(angle) * force * 3 - (dy / dist) * force * 2;
          }
        }

        // Render particle
        const pulse = Math.sin(p.pulsePhase) * 0.4 + 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.baseRadius * (isSystems ? 1.4 : pulse), 0, Math.PI * 2);

        if (isSystems) {
          // Monochromatic telemetry cyan / green phosphor
          ctx.fillStyle = dist < mouse.radius ? '#00f5d4' : 'rgba(0, 245, 212, 0.45)';
          ctx.shadowColor = '#00f5d4';
          ctx.shadowBlur = dist < mouse.radius ? 12 : 4;
        } else {
          // Iridescent cyan / cobalt gradient feel
          ctx.fillStyle = p.hue === 172 ? 'rgba(0, 245, 212, 0.55)' : 'rgba(59, 130, 246, 0.55)';
          ctx.shadowColor = p.hue === 172 ? '#00f5d4' : '#3b82f6';
          ctx.shadowBlur = 8;
        }
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow for lines
      }

      // Draw connection lines between nearby particles
      const connectionDist = isSystems ? 100 : 120;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * (isSystems ? 0.18 : 0.12);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);

            if (isSystems) {
              // Right-angle trace line in systems mode
              ctx.lineTo(p2.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(0, 245, 212, ${alpha * 1.5})`;
            } else {
              // Direct smooth line in design mode
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(147, 197, 253, ${alpha})`;
            }

            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    };

    animFrameRef.current = requestAnimationFrame(render);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animFrameRef.current);
      } else {
        lastTime = performance.now();
        animFrameRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [viewMode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

