import { useState, useRef } from 'react';
import { sound } from '../audio/soundFX';
import { Sparkles, Sliders, Volume2, Play } from 'lucide-react';

export default function CreativeLab() {
  // Spring Physics Sandbox State
  const [stiffness, setStiffness] = useState(180);
  const [damping, setDamping] = useState(14);
  const mass = 1;
  const [springPos, setSpringPos] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  // Audio Synthesizer Pad State
  const [activeFrequency, setActiveFrequency] = useState(null);
  const audioCanvasRef = useRef(null);

  // Trigger Spring Physics Impulse
  const triggerSpringImpulse = () => {
    sound.playClick();
    setIsSimulating(true);

    let position = 80; // displacement
    let velocity = 0;
    let lastTime = performance.now();

    const step = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      // Spring physics equation: F = -k*x - c*v; a = F/m
      const forceSpring = -stiffness * position;
      const forceDamper = -damping * velocity;
      const acceleration = (forceSpring + forceDamper) / mass;

      velocity += acceleration * dt;
      position += velocity * dt;

      setSpringPos(position);

      if (Math.abs(position) > 0.5 || Math.abs(velocity) > 0.5) {
        requestAnimationFrame(step);
      } else {
        setSpringPos(0);
        setIsSimulating(false);
      }
    };

    requestAnimationFrame(step);
  };

  // Play Micro-Tone & Draw Oscilloscope Wave
  const playTone = (freq) => {
    setActiveFrequency(freq);
    sound.playHover();

    try {
      sound.init();
      if (!sound.ctx) return;
      const osc = sound.ctx.createOscillator();
      const gain = sound.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, sound.ctx.currentTime);
      gain.gain.setValueAtTime(0.08, sound.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, sound.ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(sound.ctx.destination);

      osc.start();
      osc.stop(sound.ctx.currentTime + 0.3);

      // Draw wave on canvas
      const canvas = audioCanvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        ctx.strokeStyle = '#00F5D4';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin((x * freq * 0.01) % (Math.PI * 2)) * (h * 0.35);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
    } catch {
      // Audio suppression fallback
    }

    setTimeout(() => setActiveFrequency(null), 300);
  };

  const tones = [
    { label: 'C5', freq: 523.25 },
    { label: 'E5', freq: 659.25 },
    { label: 'G5', freq: 783.99 },
    { label: 'A5', freq: 880.00 },
    { label: 'C6', freq: 1046.50 }
  ];

  return (
    <section id="lab" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan" />
          <span>SECTION 04 // THE EXPERIMENTAL LAB</span>
        </div>
        <h2 className="font-syne font-black text-3xl sm:text-5xl text-white">
          MOTION & SENSORY LAB.
        </h2>
        <p className="text-white/60 font-sans text-sm sm:text-base mt-2 max-w-xl">
          Real-time physics engines, mathematical dampening curves, and synthesized browser acoustics. Where motion design meets creative code.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Module 1: Harmonic Damped Spring Simulator */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan font-bold flex items-center gap-2">
              <Sliders className="w-4 h-4" />
              SPRING OSCILLATION & INERTIAL MASS
            </span>
            <span className="font-mono text-[11px] text-white/40">
              HARMONIC MOTION (F = -kx - cv)
            </span>
          </div>

          {/* Spring Visual Target */}
          <div className="h-44 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
            
            <div
              className="w-36 h-20 rounded-xl bg-gradient-to-r from-cyan/30 via-blue-500/30 to-violet-500/30 border border-cyan/50 backdrop-blur-md flex flex-col items-center justify-center font-mono text-xs shadow-xl transition-shadow"
              style={{
                transform: `translateX(${springPos}px)`,
                boxShadow: `0 0 ${Math.abs(springPos) + 10}px rgba(0, 245, 212, 0.4)`
              }}
            >
              <span className="text-white font-bold">KINETIC NODE</span>
              <span className="text-cyan text-[10px]">ΔX: {Math.round(springPos)}px</span>
            </div>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">STIFFNESS (k): {stiffness}</span>
              <input
                type="range"
                min="50"
                max="400"
                value={stiffness}
                onChange={(e) => setStiffness(Number(e.target.value))}
                className="w-40 accent-cyan cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-white/60">DAMPING (c): {damping}</span>
              <input
                type="range"
                min="4"
                max="35"
                value={damping}
                onChange={(e) => setDamping(Number(e.target.value))}
                className="w-40 accent-cyan cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={triggerSpringImpulse}
              disabled={isSimulating}
              className="w-full py-2.5 rounded-xl bg-cyan hover:bg-cyan/90 text-black font-syne font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan/20"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{isSimulating ? 'OSCILLATING...' : 'APPLY 80PX KINETIC DISPLACEMENT'}</span>
            </button>
          </div>
        </div>

        {/* Module 2: Web Audio Synthesizer & Waveform Oscilloscope */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-widest text-cyan font-bold flex items-center gap-2">
              <Volume2 className="w-4 h-4" />
              SPATIAL AUDIO HARMONICS
            </span>
            <span className="font-mono text-[11px] text-white/40">
              NATIVE WEB AUDIO API
            </span>
          </div>

          {/* Live Waveform Oscilloscope */}
          <div className="h-44 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center relative p-3">
            <canvas
              ref={audioCanvasRef}
              width={400}
              height={140}
              className="w-full h-full"
            />
            {!activeFrequency && (
              <span className="absolute font-mono text-xs text-white/30 tracking-widest pointer-events-none">
                CLICK HARMONIC PADS TO SYNTHESIZE
              </span>
            )}
          </div>

          {/* Frequency Trigger Pads */}
          <div className="grid grid-cols-5 gap-2">
            {tones.map((t) => (
              <button
                key={t.freq}
                type="button"
                onClick={() => playTone(t.freq)}
                className={`py-3 rounded-xl border font-mono text-xs transition-all flex flex-col items-center justify-center gap-1 ${
                  activeFrequency === t.freq
                    ? 'bg-cyan text-black border-cyan font-bold scale-105 shadow-lg shadow-cyan/30'
                    : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10 hover:border-cyan/30'
                }`}
              >
                <span className="font-bold">{t.label}</span>
                <span className="text-[9px] opacity-60">{Math.round(t.freq)}Hz</span>
              </button>
            ))}
          </div>

          <p className="font-mono text-[11px] text-white/40 leading-relaxed text-center">
            Zero external sound files loaded. Synthesized procedurally inside the browser client at 0ms latency.
          </p>
        </div>

      </div>
    </section>
  );
}
