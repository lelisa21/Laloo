import { useState, useEffect, useRef } from 'react';
import { Terminal, ArrowRight, X } from 'lucide-react';
import { sound } from '../audio/soundFX';
import { personalInfo } from '../data/portfolioData';
import confetti from 'canvas-confetti';

export default function CommandPalette({ isOpen, onClose, viewMode, setViewMode }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const actions = [
    {
      id: 'cheretanet',
      title: 'Inspect Cheretanet Auction Platform',
      category: 'Projects',
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'gebeta',
      title: 'Inspect Gebeta Maps Go Routing Backend',
      category: 'Projects',
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'reunite',
      title: 'Inspect Reunite Missing Persons Platform',
      category: 'Projects',
      action: () => {
        window.location.hash = '#projects';
        onClose();
      }
    },
    {
      id: 'toggle-mode',
      title: `Switch View Mode (Current: ${viewMode.toUpperCase()})`,
      category: 'System',
      action: () => {
        sound.playSwitch();
        setViewMode(viewMode === 'design' ? 'systems' : 'design');
        onClose();
      }
    },
    {
      id: 'copy-email',
      title: 'Copy Email: lelisahailu22@gmail.com',
      category: 'Contact',
      action: () => {
        navigator.clipboard.writeText(personalInfo.email);
        sound.playSuccess();
        confetti({ particleCount: 30, spread: 50 });
        onClose();
      }
    },
    {
      id: 'toggle-sound',
      title: 'Toggle Web Audio Sound Synthesis',
      category: 'System',
      action: () => {
        sound.toggleMute();
        onClose();
      }
    },
    {
      id: 'jump-stack',
      title: 'View Concurrency & Skill Matrix',
      category: 'Navigation',
      action: () => {
        window.location.hash = '#stack';
        onClose();
      }
    },
    {
      id: 'jump-experience',
      title: 'View Leadership & Experience (GDG Tech Lead)',
      category: 'Navigation',
      action: () => {
        window.location.hash = '#experience';
        onClose();
      }
    },
    {
      id: 'jump-lab',
      title: 'Launch Motion & Sensory Lab',
      category: 'Navigation',
      action: () => {
        window.location.hash = '#lab';
        onClose();
      }
    },
    {
      id: 'github',
      title: 'Open GitHub Profile (@lelisa21)',
      category: 'External',
      action: () => {
        window.open(personalInfo.github, '_blank');
        onClose();
      }
    },
    {
      id: 'linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      action: () => {
        window.open(personalInfo.linkedin, '_blank');
        onClose();
      }
    }
  ];

  const filtered = actions.filter(a =>
    a.title.toLowerCase().includes(query.toLowerCase()) ||
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
      sound.playTerminal();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          sound.playClick();
          // trigger open
        }
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex(prev => (prev + 1) % (filtered.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        sound.playHover();
        setSelectedIndex(prev => (prev - 1 + (filtered.length || 1)) % (filtered.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          sound.playClick();
          filtered[selectedIndex].action();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onClose, viewMode, setViewMode]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl glass-panel rounded-2xl border border-white/20 shadow-2xl overflow-hidden bg-[#0a0d14]/95">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Terminal className="w-5 h-5 text-cyan shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type a command or jump to project... (e.g. Cheretanet, Go, Email)"
            className="w-full bg-transparent text-white font-mono text-sm placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-md text-white/40 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-6 text-center font-mono text-xs text-white/40">
              NO MATCHING COMMANDS FOUND
            </div>
          ) : (
            filtered.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    sound.playClick();
                    item.action();
                  }}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-cyan/15 border border-cyan/40 text-cyan'
                      : 'hover:bg-white/5 text-white/70'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-black/40 border border-white/10 text-white/40">
                      {item.category}
                    </span>
                    <span className="font-mono text-xs font-medium text-white">
                      {item.title}
                    </span>
                  </div>
                  <ArrowRight className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan translate-x-1' : 'text-white/20'} transition-transform`} />
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 border-t border-white/10 bg-black/40 font-mono text-[10px] text-white/40 flex items-center justify-between">
          <span>NAVIGATION: ↑ ↓ TO SELECT • ENTER TO RUN</span>
          <span>ESC TO CLOSE</span>
        </div>
      </div>
    </div>
  );
}
