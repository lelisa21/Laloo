import { experienceTimeline, awardsAndAccolades, personalInfo } from '../data/portfolioData';
import { Award, Briefcase, GraduationCap, ChevronRight, CheckCircle2 } from 'lucide-react';

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="py-20 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
          <span className="w-1.5 h-1.5 bg-cyan rounded-full"></span>
          <span>SECTION 03 // TRAJECTORY & PROVEN RECORD</span>
        </div>
        <h2 className="font-syne font-black text-3xl sm:text-5xl text-white">
          EXPERIENCE & HONORS.
        </h2>
        <p className="text-white/60 font-sans text-sm sm:text-base mt-2 max-w-xl">
          From leading hundreds of developers as GDG AASTU Tech Lead to engineering high-concurrency Go services for Gebeta Maps.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Work & Leadership Timeline (2 spans) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 font-mono text-xs text-white/50 tracking-wider uppercase mb-2">
            <Briefcase className="w-4 h-4 text-cyan" />
            <span>PRODUCTION POSITIONS & LEADERSHIP</span>
          </div>

          <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-cyan before:via-blue-500 before:to-transparent">
            {experienceTimeline.map((item, idx) => (
              <div key={idx} className="relative group">
                {/* Node point on timeline */}
                <span className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-obsidian border-2 border-cyan group-hover:scale-125 transition-transform" />

                <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-cyan/30 transition-all duration-300">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-cyan/10 border border-cyan/30 text-cyan font-mono text-[11px] font-bold">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-white/40">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-syne font-extrabold text-xl text-white">
                    {item.role}
                  </h3>
                  <div className="font-sans text-sm text-cyan font-medium mb-3">
                    {item.organization} • <span className="text-white/50">{item.location}</span>
                  </div>

                  <ul className="space-y-2 mt-3 font-sans text-xs sm:text-sm text-white/70">
                    {item.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2">
                        <ChevronRight className="w-3.5 h-3.5 text-cyan shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Awards & Education */}
        <div className="space-y-8">
          
          {/* Awards & Accolades */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-white/50 tracking-wider uppercase mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>AWARDS & COMPETITIVE WINS</span>
            </div>

            {awardsAndAccolades.map((award, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl glass-panel border border-white/5 hover:border-amber-400/40 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[11px] font-bold text-amber-400">
                    {award.score}
                  </span>
                  <span className="font-mono text-[10px] text-white/40">
                    {award.issuer}
                  </span>
                </div>
                <h4 className="font-syne font-extrabold text-base text-white group-hover:text-amber-300 transition-colors">
                  {award.title}
                </h4>
                <p className="font-sans text-xs text-white/60 mt-1">
                  {award.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Education & Academic Rigor */}
          <div className="p-6 rounded-2xl glass-panel border border-white/5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-white/50 tracking-wider uppercase">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>ACADEMIC FOUNDATION</span>
            </div>

            <div>
              <div className="font-syne font-extrabold text-lg text-white">
                {personalInfo.education.degree}
              </div>
              <div className="font-sans text-sm text-cyan font-medium">
                {personalInfo.education.institution}
              </div>
              <div className="font-mono text-xs text-white/40 mt-0.5">
                {personalInfo.education.expectedYear}
              </div>
            </div>

            <div className="pt-3 border-t border-white/5 space-y-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-white/40 block">
                ACCREDITATIONS & CERTIFICATIONS
              </span>
              {personalInfo.education.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-center gap-2 font-mono text-xs text-white/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
