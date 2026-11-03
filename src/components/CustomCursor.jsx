import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable if pointer is fine (mouse/trackpad, not touch)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let animId;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;

    const onMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element cursor cues
      const target = e.target;
      if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) {
        setCursorType('pointer');
      } else if (target.closest('pre') || target.closest('code')) {
        setCursorType('code');
      } else if (target.closest('[data-cursor="xray"]')) {
        setCursorType('xray');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const lerp = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      setTrailingPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(lerp);
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    animId = requestAnimationFrame(lerp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const isPointer = cursorType === 'pointer';
  const isCode = cursorType === 'code';
  const isXray = cursorType === 'xray';

  return (
    <div className="custom-cursor fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {/* Precision center dot */}
      <div
        className="fixed -top-1 -left-1 w-2 h-2 rounded-full bg-cyan transition-transform duration-75"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          boxShadow: '0 0 10px #00f5d4'
        }}
      />

      {/* Trailing ambient dynamic ring */}
      <div
        className={`fixed rounded-full border transition-all duration-200 flex items-center justify-center ${
          isPointer
            ? 'w-12 h-12 -top-6 -left-6 border-cyan bg-cyan/10 scale-110'
            : isXray
            ? 'w-16 h-16 -top-8 -left-8 border-violet-400 bg-violet-500/15 scale-125'
            : isCode
            ? 'w-10 h-10 -top-5 -left-5 border-blue-400/80 bg-blue-500/10'
            : 'w-8 h-8 -top-4 -left-4 border-white/20'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x}px, ${trailingPos.y}px, 0)`,
          backdropFilter: isPointer || isXray ? 'invert(0.1)' : 'none'
        }}
      >
        {isXray && (
          <span className="text-[9px] font-mono font-bold tracking-widest text-violet-300">X-RAY</span>
        )}
      </div>

      {/* Mini telemetry coordinate badge on screen edge */}
      <div className="fixed bottom-3 right-4 font-mono text-[10px] text-white/30 tracking-widest select-none flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan/60 animate-pulse"></span>
        <span>X:{Math.round(pos.x)} Y:{Math.round(pos.y)}</span>
      </div>
    </div>
  );
}

