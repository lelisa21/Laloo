import { useState } from 'react';
import { flagshipProjects } from '../data/portfolioData';
import ProjectCard from './ProjectCard';
import { sound } from '../audio/soundFX';
import { Cpu } from 'lucide-react';

export default function ProjectsSection({ viewMode }) {
  const [filter, setFilter] = useState('ALL');
  const [globalXray, setGlobalXray] = useState(viewMode === 'systems');

  const categories = ['ALL', 'REAL-TIME & GO', 'FULL-STACK PLATFORMS'];

  const filteredProjects = flagshipProjects.filter(p => {
    if (filter === 'ALL') return true;
    if (filter === 'REAL-TIME & GO') return p.techStack.includes('Go (Golang)') || p.techStack.includes('Socket.io');
    if (filter === 'FULL-STACK PLATFORMS') return p.category.includes('Full-Stack');
    return true;
  });

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
            <span className="w-1.5 h-1.5 bg-cyan rounded-full"></span>
            <span>SECTION 01 // PRODUCTION WORK</span>
          </div>
          <h2 className="font-syne font-black text-3xl sm:text-5xl text-white">
            FLAGSHIP ARCHITECTURES.
          </h2>
          <p className="text-white/60 font-sans text-sm sm:text-base mt-2 max-w-xl">
            Real products shipped to production. Every card features interactive architecture toggles, live execution sandboxes, and verified system metrics.
          </p>
        </div>

        {/* Filters & Global X-Ray Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                sound.playClick();
                setFilter(cat);
              }}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                filter === cat
                  ? 'bg-white/15 text-white border border-white/20 font-bold'
                  : 'bg-white/5 text-white/50 hover:text-white/80 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}

          <button
            type="button"
            onClick={() => {
              sound.playSwitch();
              setGlobalXray(!globalXray);
            }}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
              globalXray
                ? 'bg-cyan text-black shadow-lg shadow-cyan/20'
                : 'bg-white/5 text-cyan hover:bg-cyan/10 border border-cyan/30'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>{globalXray ? 'ALL X-RAYS ACTIVE' : 'TOGGLE ALL X-RAYS'}</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} defaultXray={globalXray} />
        ))}
      </div>
    </section>
  );
}
