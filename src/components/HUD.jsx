import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, Cpu, Sparkles } from 'lucide-react';
import { sound } from '../audio/soundFX';

export default function HUD({ viewMode, setViewMode, onOpenCommandPalette }) {
  const [time, setTime] = useState('');
  const [isMuted, setIsMuted] = useState(sound.getMuted());

  // Addis Ababa live clock (UTC+3)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Africa/Addis_Ababa',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Intl.DateTimeFormat([], options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handleToggleMode = (mode) => {
    if (viewMode !== mode) {
      sound.playSwitch();
      setViewMode(mode);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-4 py-2.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-xl">
        
        {/* Left: Brand & Telemetry Badge */}
        <div className="flex items-center gap-3">
          <a
            href="#hero"
            onClick={() => sound.playClick()}
            className="flex items-center gap-2.5 text-bone group text-decoration-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-blue-600 flex items-center justify-center font-syne font-black text-black text-sm tracking-tighter shadow-lg group-hover:scale-105 transition-transform">
              LH
            </div>
            <div className="flex flex-col">
              <span className="font-syne font-extrabold text-sm tracking-wide text-white group-hover:text-cyan transition-colors flex items-center gap-1.5">
                LELISA HAILU
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-cyan animate-pulse"></span>
              </span>
              <span className="font-mono text-[9px] text-white/50 tracking-wider">
                TECH LEAD @ GDG AASTU
              </span>
            </div>
          </a>

          {/* Addis Ababa World Clock */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 font-mono text-[11px] text-white/70">
            <span className="text-white/40">ADDIS ABABA</span>
            <span className="text-cyan font-semibold">{time || '05:38:11'}</span>
            <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">EAT</span>
          </div>
        </div>

        {/* Center: Dual-Lens Perspective Switcher */}
        <div className="flex items-center bg-black/40 p-1 rounded-xl border border-white/10 shadow-inner">
          <button
            type="button"
            onClick={() => handleToggleMode('design')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 ${
              viewMode === 'design'
                ? 'bg-gradient-to-r from-cyan/20 to-blue-500/20 text-cyan border border-cyan/40 shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }`}
            title="Switch to Vision & Design Experience"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">VISION / DESIGN</span>
            <span className="sm:hidden">DESIGN</span>
          </button>

          <button
            type="button"
            onClick={() => handleToggleMode('systems')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-300 ${
              viewMode === 'systems'
                ? 'bg-gradient-to-r from-blue-500/20 to-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
                : 'text-white/50 hover:text-white/80'
            }`}
            title="Switch to Systems & Concurrency Telemetry"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SYSTEMS / CODE</span>
            <span className="sm:hidden">SYSTEMS</span>
          </button>
        </div>

        {/* Right: Quick Actions & Sound FX */}
        <div className="flex items-center gap-2">
          {/* Omni Command Palette Trigger */}
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              onOpenCommandPalette();
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition-all text-xs font-mono group"
            title="Open Command Palette (Cmd + K / Ctrl + K)"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline text-[11px]">COMMAND</span>
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[9px] bg-black/40 border border-white/10 rounded text-white/40 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Sound Synthesizer Mute Toggle */}
          <button
            type="button"
            onClick={handleToggleSound}
            className={`p-2 rounded-lg border transition-all ${
              isMuted
                ? 'bg-white/5 border-white/10 text-white/40 hover:text-white/60'
                : 'bg-cyan/10 border-cyan/30 text-cyan hover:bg-cyan/20'
            }`}
            title={isMuted ? 'Unmute Audio Synthesis' : 'Mute Audio Synthesis'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Transmission Action */}
          <a
            href="#transmission"
            onClick={() => sound.playClick()}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan to-blue-600 text-black font-syne font-bold text-xs tracking-wider hover:opacity-90 transition-opacity shadow-lg"
          >
            CONNECT
          </a>
        </div>
      </div>
    </header>
  );
}
