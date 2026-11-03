import { ArrowUp } from 'lucide-react';
import { sound } from '../audio/soundFX';

export default function Footer() {
  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 py-12 px-4 sm:px-6 relative z-10 bg-[#05070a]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Coordinates */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan animate-pulse"></span>
            <span className="font-syne font-black text-sm tracking-wider text-white">
              LELISA HAILU
            </span>
            <span className="font-mono text-xs text-white/40">
              // CRAFT & CODE
            </span>
          </div>
          <span className="font-mono text-[11px] text-white/40 mt-1">
            ADDIS ABABA, ETHIOPIA • 9.0192° N, 38.7525° E
          </span>
        </div>

        {/* Center: System Manifesto */}
        <div className="font-mono text-xs text-white/50 text-center">
          ENGINEERED WITH REACT 19 • GO ARCHITECTURES • WEB AUDIO API
        </div>

        {/* Right: Back to Top */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-2 rounded-xl glass-panel border border-white/10 text-white/70 hover:text-white font-mono text-xs hover:border-cyan/40 transition-all group"
          >
            <span>RETURN TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
