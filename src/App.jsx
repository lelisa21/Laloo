import { useState, useEffect } from 'react';
import HUD from './components/HUD';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import ConcurrencyMatrix from './components/ConcurrencyMatrix';
import ExperienceTimeline from './components/ExperienceTimeline';
import CreativeLab from './components/CreativeLab';
import InteractiveTerminal from './components/InteractiveTerminal';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import InteractiveCanvas from './components/InteractiveCanvas';
import CommandPalette from './components/CommandPalette';
import { sound } from './audio/soundFX';

function App() {
  const [viewMode, setViewMode] = useState('design');
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  // Keyboard shortcut listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        sound.playClick();
        setIsCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#08090d] text-[#f1f5f9] selection:bg-cyan-400/20 selection:text-cyan-300 overflow-x-hidden font-sans">
      {/* Dynamic Cursor with Spatial Magnetism */}
      <CustomCursor />

      {/* Kinetic WebGL / Canvas 2D Particle Background */}
      <InteractiveCanvas viewMode={viewMode} />

      {/* Floating Tactical HUD Navigation */}
      <HUD
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
      />

      {/* Main Experiential Canvas */}
      <main className="relative z-10 space-y-12">
        <Hero viewMode={viewMode} setViewMode={setViewMode} />
        <ProjectsSection viewMode={viewMode} />
        <ConcurrencyMatrix />
        <ExperienceTimeline />
        <CreativeLab />
        <InteractiveTerminal />
      </main>

      {/* Footer */}
      <Footer />

      {/* Omni-Command Palette Modal */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </div>
  );
}

export default App;
