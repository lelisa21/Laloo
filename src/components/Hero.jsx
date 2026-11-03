import { useState } from 'react';
import { ArrowRight, Code, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../audio/soundFX';
import confetti from 'canvas-confetti';

export default function Hero({ viewMode, setViewMode }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    sound.playSuccess();
    setCopied(true);
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#00F5D4', '#3B82F6', '#A855F7']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const isSystems = viewMode === 'systems';

  return (
    <section id="hero" className="relative pt-32 sm:pt-40 pb-20 px-4 sm:px-6 max-w-7xl mx-auto z-10">
      
      {/* Top Status & Telemetry Pill */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 radar-dot"></span>
          <span className="font-mono text-xs text-white/90 font-medium tracking-wide">
            AVAILABLE FOR GLOBAL & HIGH-IMPACT ROLES
          </span>
        </div>

        <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 font-mono text-xs text-cyan">
          <Zap className="w-3.5 h-3.5" />
          <span>WINNER GDG AASTU TECH FEST (97.5%)</span>
        </div>
      </div>

      {/* Main Kinetic Headline */}
      <div className="mb-8">
        <h1 className="font-syne font-black text-4xl sm:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] text-white">
          {isSystems ? (
            <>
              CONCURRENCY <br />
              <span className="text-gradient-cyan">IN MOTION.</span>
            </>
          ) : (
            <>
              THE ARCHITECTURE <br />
              <span className="text-gradient-cyan">OF CRAFT & CODE.</span>
            </>
          )}
        </h1>
        
        <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white/70 font-sans leading-relaxed">
          {isSystems ? (
            <>
              High-throughput Go microservices, sub-40ms real-time WebSocket state machines, 
              and distributed multi-tenant architectures engineered with mathematical precision in Addis Ababa.
            </>
          ) : (
            <>
              I bridge the gap between <strong className="text-white font-semibold">UI/UX design craft</strong>, 
              <strong className="text-cyan font-semibold"> kinetic motion</strong>, and 
              <strong className="text-blue-400 font-semibold"> high-scale full-stack systems</strong>. 
              Turning ambitious visions into memorable digital realities.
            </>
          )}
        </p>
      </div>

      {/* Real-Time Concurrency Telemetry HUD (Systems Mode only) */}
      {isSystems && (
        <div className="mb-10 p-4 rounded-xl bg-black/60 border border-emerald-500/30 font-mono text-xs text-emerald-400/90 flex flex-wrap items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>RUNTIME: GO 1.24 + VITE 8 + NODE.JS</span>
          </div>
          <div className="flex items-center gap-4 text-white/60">
            <span>GOROUTINES: 12 POOLED</span>
            <span>WEBSOCKET: CHERETANET LIVE</span>
            <span className="text-emerald-400 font-bold">LATENCY: ~38ms</span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-4 mb-16">
        <a
          href="#projects"
          onClick={() => sound.playClick()}
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan to-blue-600 text-black font-syne font-black text-sm tracking-wider hover:opacity-95 hover:scale-[1.02] transition-all shadow-xl shadow-cyan/20 group"
        >
          <span>EXPLORE FLAGSHIP PROJECTS</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>

        <button
          type="button"
          onClick={() => {
            sound.playSwitch();
            setViewMode(isSystems ? 'design' : 'systems');
          }}
          className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-sm tracking-wide transition-all"
        >
          {isSystems ? <Sparkles className="w-4 h-4 text-cyan" /> : <Code className="w-4 h-4 text-emerald-400" />}
          <span>{isSystems ? 'SWITCH TO DESIGN VISION' : 'ACTIVATE ARCHITECTURE X-RAY'}</span>
        </button>

        <button
          type="button"
          onClick={handleCopyEmail}
          className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-white/70 hover:text-white font-mono text-xs transition-colors"
          title="Click to copy email address"
        >
          {copied ? <ShieldCheck className="w-4 h-4 text-cyan" /> : null}
          <span>{copied ? 'EMAIL COPIED!' : personalInfo.email}</span>
        </button>
      </div>

      {/* Verified Accolades & Performance Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
        {personalInfo.metrics.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl glass-panel border border-white/5 hover:border-cyan/30 transition-all duration-300 group"
          >
            <div className="font-mono text-2xl sm:text-3xl font-extrabold text-cyan group-hover:scale-105 transition-transform">
              {item.value}
            </div>
            <div className="font-syne font-bold text-xs sm:text-sm text-white mt-1">
              {item.label}
            </div>
            <div className="font-sans text-[11px] text-white/50 mt-0.5">
              {item.desc}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
