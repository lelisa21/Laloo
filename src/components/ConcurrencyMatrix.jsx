import { useState } from 'react';
import { skillsMatrix } from '../data/portfolioData';
import { sound } from '../audio/soundFX';
import { Server, Layout, Sparkles, Terminal } from 'lucide-react';

export default function ConcurrencyMatrix() {
  const [activeTab, setActiveTab] = useState('backend');

  const tabs = [
    { id: 'backend', label: 'SYSTEMS & BACKEND', icon: Server, count: skillsMatrix.backend.length },
    { id: 'frontend', label: 'FRONTEND & DESIGN SYSTEMS', icon: Layout, count: skillsMatrix.frontend.length },
    { id: 'motionAndDesign', label: 'MOTION & SPATIAL CRAFT', icon: Sparkles, count: skillsMatrix.motionAndDesign.length },
    { id: 'devopsAndTools', label: 'DEVOPS & PIPELINES', icon: Terminal, count: skillsMatrix.devopsAndTools.length }
  ];

  const currentSkills = skillsMatrix[activeTab] || [];

  return (
    <section id="stack" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-10 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
          <span className="w-1.5 h-1.5 bg-cyan rounded-full"></span>
          <span>SECTION 02 // TECHNICAL DEPTH</span>
        </div>
        <h2 className="font-syne font-black text-3xl sm:text-5xl text-white">
          THE CONCURRENCY MATRIX.
        </h2>
        <p className="text-white/60 font-sans text-sm sm:text-base mt-2 max-w-2xl">
          A breakdown of engineered competencies across the stack. Built for high concurrency, responsive visual design, and mission-critical reliability.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                sound.playClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-cyan/20 to-blue-500/20 text-cyan border border-cyan/40 shadow-lg shadow-cyan/10 font-bold'
                  : 'glass-panel text-white/60 hover:text-white border-white/5'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className="ml-1 px-1.5 py-0.2 rounded bg-black/40 text-[10px] text-white/40">
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Skill Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentSkills.map((skill, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl glass-panel border border-white/5 hover:border-cyan/30 transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-syne font-extrabold text-base text-white group-hover:text-cyan transition-colors">
                {skill.name}
              </span>
              <span className="font-mono text-xs text-cyan font-bold">
                {skill.level}%
              </span>
            </div>

            {/* Precision Progress Bar */}
            <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden mb-3">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan to-blue-500 transition-all duration-700 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>

            <p className="font-mono text-xs text-white/50 leading-relaxed">
              {skill.note}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

