import { useState } from 'react';
import { ExternalLink, Eye, Cpu, Zap, Play, RefreshCw } from 'lucide-react';
import { sound } from '../audio/soundFX';
import confetti from 'canvas-confetti';

export default function ProjectCard({ project, defaultXray = false }) {
  const [isXray, setIsXray] = useState(defaultXray);
  
  // Interactive Simulation States
  // For Cheretanet
  const [currentBid, setCurrentBid] = useState(1240);
  const [bidHistory, setBidHistory] = useState([
    { user: 'Client_984', amount: 1240, latency: '34ms', time: 'Just now' },
    { user: 'Client_211', amount: 1220, latency: '39ms', time: '12s ago' }
  ]);
  const [isBidding, setIsBidding] = useState(false);

  // For Gebeta Maps
  const [routingStatus, setRoutingStatus] = useState('IDLE');
  const [routingTelemetry, setRoutingTelemetry] = useState(null);

  const toggleXray = () => {
    sound.playSwitch();
    setIsXray(!isXray);
  };

  const handleSimulateBid = () => {
    if (isBidding) return;
    setIsBidding(true);
    sound.playClick();

    setTimeout(() => {
      const nextBid = currentBid + 25;
      setCurrentBid(nextBid);
      setBidHistory(prev => [
        { user: 'You (Visitor)', amount: nextBid, latency: `${Math.floor(Math.random() * 15 + 28)}ms`, time: 'Just now' },
        ...prev.slice(0, 3)
      ]);
      setIsBidding(false);
      sound.playSuccess();
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#00F5D4', '#3B82F6']
      });
    }, 350);
  };

  const handleSimulateRouting = () => {
    setRoutingStatus('COMPUTING');
    sound.playClick();
    setTimeout(() => {
      setRoutingTelemetry({
        origin: 'Bole Intl Airport (ADD)',
        destination: 'AASTU Campus, Akaki',
        distance: '18.4 km',
        latency: '12.4ms',
        concurrency: '4 Goroutines pooled',
        optimalAlgorithm: 'A* with Heuristic Weighting'
      });
      setRoutingStatus('RESOLVED');
      sound.playSuccess();
    }, 400);
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-500 overflow-hidden ${
        isXray
          ? 'bg-[#080c14] border-cyan/40 shadow-2xl shadow-cyan/10'
          : 'glass-panel border-white/10 hover:border-white/20'
      }`}
    >
      {/* Card Header & Controls */}
      <div className="p-6 sm:p-8 border-b border-white/5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: project.accentColor, boxShadow: `0 0 10px ${project.accentColor}` }}
            />
            <span className="font-mono text-xs uppercase tracking-widest text-white/50">
              {project.category} // {project.year}
            </span>
          </div>
          <h3 className="font-syne font-black text-2xl sm:text-3xl text-white mt-1">
            {project.title}
          </h3>
        </div>

        {/* X-Ray Mode Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleXray}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              isXray
                ? 'bg-cyan text-black shadow-lg shadow-cyan/20'
                : 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10'
            }`}
          >
            {isXray ? <Cpu className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{isXray ? 'SURFACE VIEW' : 'ARCHITECTURE X-RAY'}</span>
          </button>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-1 p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors border border-white/10"
              title="Open Live Platform"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-8">
        {!isXray ? (
          /* STANDARD / DESIGN VIEW */
          <div className="space-y-6">
            <p className="text-white/80 font-sans text-base leading-relaxed">
              {project.summary}
            </p>

            {/* Design & UX Insight */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
              <span className="font-mono text-[11px] uppercase tracking-wider text-cyan font-bold block mb-1">
                UI/UX & Creative Engineering Rationale
              </span>
              <p className="text-white/70 text-sm font-sans italic">
                "{project.designPhilosophy}"
              </p>
            </div>

            {/* INTERACTIVE MINI SIMULATORS */}
            {project.id === 'cheretanet' && (
              <div className="p-5 rounded-xl bg-black/50 border border-cyan/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan animate-ping"></span>
                    <span className="font-mono text-xs text-white font-bold">
                      LIVE CHERETANET BIDDING COCKPIT (INTERACTIVE)
                    </span>
                  </div>
                  <span className="font-mono text-xs text-cyan font-extrabold text-lg">
                    ${currentBid.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSimulateBid}
                    disabled={isBidding}
                    className="flex-1 py-2.5 rounded-lg bg-gradient-to-r from-cyan to-blue-500 text-black font-syne font-black text-xs uppercase tracking-wider hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan/10"
                  >
                    {isBidding ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
                    <span>{isBidding ? 'SYNCING REDIS MUTEX...' : 'PLACE $25 LIVE BID'}</span>
                  </button>
                </div>

                {/* Simulated Real-Time Audit Feed */}
                <div className="space-y-1 pt-2 border-t border-white/10 font-mono text-[11px]">
                  {bidHistory.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-white/50">
                      <span className="text-white/80">{item.user} placed ${item.amount}</span>
                      <span className="text-cyan">{item.latency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.id === 'gebeta-maps' && (
              <div className="p-5 rounded-xl bg-black/50 border border-blue-500/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white font-bold flex items-center gap-2">
                    <Cpu className="w-3.5 h-3.5 text-blue-400" />
                    GO CONCURRENT ROUTING SIMULATOR
                  </span>
                  <span className="font-mono text-[11px] text-blue-400">
                    ADIS ABABA TRANSIT GRAPH
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateRouting}
                  disabled={routingStatus === 'COMPUTING'}
                  className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-syne font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                >
                  {routingStatus === 'COMPUTING' ? (
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-white" />
                  )}
                  <span>
                    {routingStatus === 'COMPUTING'
                      ? 'CONCURRENTLY COMPUTING GRAPH (GO)...'
                      : 'DISPATCH CONCURRENT PATHFINDER (GO)'}
                  </span>
                </button>

                {routingTelemetry && (
                  <div className="p-3 rounded-lg bg-blue-950/40 border border-blue-500/30 font-mono text-xs space-y-1 text-white/80 animate-fadeIn">
                    <div className="text-cyan font-bold">✓ {routingTelemetry.optimalAlgorithm}</div>
                    <div className="flex justify-between text-white/60">
                      <span>Vector: {routingTelemetry.origin} → {routingTelemetry.destination}</span>
                      <span className="text-emerald-400">{routingTelemetry.latency}</span>
                    </div>
                    <div className="text-[10px] text-white/40">{routingTelemetry.concurrency}</div>
                  </div>
                )}
              </div>
            )}

            {/* Performance Metrics Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/5">
              {Object.entries(project.metrics).map(([key, val], idx) => (
                <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5">
                  <div className="font-mono text-[10px] uppercase text-white/40">{key}</div>
                  <div className="font-syne font-bold text-sm text-white mt-0.5">{val}</div>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-mono text-[11px] text-white/70"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ) : (
          /* ARCHITECTURE X-RAY VIEW (Code & Concurrency Pipeline) */
          <div className="space-y-6 animate-fadeIn font-mono text-xs">
            <div className="p-3 rounded-lg bg-cyan/10 border border-cyan/30 text-cyan flex items-center gap-2">
              <Zap className="w-4 h-4 shrink-0" />
              <span>
                <strong>SYSTEM TOPOLOGY:</strong> {project.xrayData.architecture}
              </span>
            </div>

            {/* Pipeline Execution Flow */}
            <div className="space-y-2">
              <div className="text-white/40 uppercase tracking-widest text-[10px]">
                CONCURRENT PIPELINE STAGES
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.xrayData.pipelineSteps.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-black/40 border border-white/5">
                    <span className="text-cyan font-bold block">{s.step}</span>
                    <span className="text-white/60 text-[11px] mt-0.5 block">{s.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Syntax-Highlighted Systems Architecture Snippet */}
            <div>
              <div className="flex items-center justify-between text-white/40 uppercase tracking-widest text-[10px] mb-2">
                <span>PRODUCTION ARCHITECTURE SNIPPET</span>
                <span className="text-cyan">READ-ONLY TELEMETRY</span>
              </div>
              <pre className="p-4 rounded-xl bg-black/80 border border-white/10 overflow-x-auto text-[11px] leading-relaxed text-emerald-300 font-mono">
                <code>{project.xrayData.systemSnippet}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
