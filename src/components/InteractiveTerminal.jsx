import { useState } from 'react';
import { personalInfo } from '../data/portfolioData';
import { sound } from '../audio/soundFX';
import { Send, Copy, CheckCircle2, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveTerminal() {
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    sound.playSuccess();
    setCopied(true);
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.85 },
      colors: ['#00F5D4', '#3B82F6', '#1E2BFF']
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    sound.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      sound.playSuccess();
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.8 },
        colors: ['#00F5D4', '#10B981', '#3B82F6']
      });

      // Also trigger a mailto fallback in case user wants to send from their native client
      const subject = encodeURIComponent(`Collaboration Inquiry from ${senderName || 'Visitor'}`);
      const body = encodeURIComponent(`${message}\n\nSender: ${senderName} (${senderEmail})`);
      window.open(`mailto:${personalInfo.email}?subject=${subject}&body=${body}`, '_blank');
    }, 600);
  };

  return (
    <section id="transmission" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto relative z-10">
      
      {/* Section Header */}
      <div className="mb-12 pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-widest uppercase mb-2">
          <span className="w-1.5 h-1.5 bg-cyan rounded-full"></span>
          <span>SECTION 05 // INITIATE TRANSMISSION</span>
        </div>
        <h2 className="font-syne font-black text-3xl sm:text-5xl text-white">
          LET'S BUILD TOGETHER.
        </h2>
        <p className="text-white/60 font-sans text-sm sm:text-base mt-2 max-w-xl">
          Whether you need a visionary UI/UX design system, a cinematic interactive experience, or a high-concurrency Go / MERN backend.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Quick Access & Telemetry Cards */}
        <div className="space-y-4">
          
          {/* Email Quick Copy Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-4">
            <div className="flex items-center gap-2 font-mono text-xs text-cyan tracking-wider uppercase">
              <Mail className="w-4 h-4" />
              <span>DIRECT INBOX</span>
            </div>
            <div>
              <div className="font-mono text-sm sm:text-base font-bold text-white break-all">
                {personalInfo.email}
              </div>
              <div className="font-sans text-xs text-white/50 mt-1">
                Typical response time: Under 12 hours
              </div>
            </div>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all"
            >
              {copied ? <CheckCircle2 className="w-4 h-4 text-cyan" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'EMAIL ADDRESS COPIED!' : 'COPY EMAIL TO CLIPBOARD'}</span>
            </button>
          </div>

          {/* Location & Status Card */}
          <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-white/50">
              <span>LOCATION</span>
              <span className="text-white font-semibold">{personalInfo.location}</span>
            </div>
            <div className="flex items-center justify-between text-white/50">
              <span>PHONE / TELEGRAM</span>
              <span className="text-white font-semibold">{personalInfo.phone}</span>
            </div>
            <div className="flex items-center justify-between text-white/50">
              <span>ROLE READINESS</span>
              <span className="text-emerald-400 font-bold">GLOBAL / REMOTE / HYBRID</span>
            </div>
          </div>

          {/* Social Nodes */}
          <div className="grid grid-cols-3 gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-xl glass-panel border border-white/5 hover:border-cyan/40 text-center font-mono text-xs text-white/80 hover:text-white transition-all flex flex-col items-center gap-1 group"
            >
              <span className="font-bold text-sm">GitHub</span>
              <span className="text-[10px] text-white/40 group-hover:text-cyan">@lelisa21</span>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-xl glass-panel border border-white/5 hover:border-blue-500/40 text-center font-mono text-xs text-white/80 hover:text-white transition-all flex flex-col items-center gap-1 group"
            >
              <span className="font-bold text-sm">LinkedIn</span>
              <span className="text-[10px] text-white/40 group-hover:text-blue-400">/in/lelisa21</span>
            </a>
            <a
              href={personalInfo.leetcode}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="p-3 rounded-xl glass-panel border border-white/5 hover:border-amber-400/40 text-center font-mono text-xs text-white/80 hover:text-white transition-all flex flex-col items-center gap-1 group"
            >
              <span className="font-bold text-sm">LeetCode</span>
              <span className="text-[10px] text-white/40 group-hover:text-amber-400">@lelisa21</span>
            </a>
          </div>

        </div>

        {/* Right: Interactive Terminal Dispatch Console */}
        <div className="lg:col-span-2 glass-panel rounded-2xl border border-white/10 p-6 sm:p-8 bg-[#090c14]/90 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 font-mono text-xs text-white/50">
                lelisa@transmission-node:~$ mail --send
              </span>
            </div>
            <span className="font-mono text-[10px] text-cyan">
              TLS ENCRYPTED DISPATCH
            </span>
          </div>

          {submitted ? (
            <div className="py-12 text-center space-y-3 font-mono">
              <CheckCircle2 className="w-12 h-12 text-cyan mx-auto animate-bounce" />
              <h3 className="font-syne font-extrabold text-2xl text-white">
                TRANSMISSION DISPATCHED.
              </h3>
              <p className="text-white/60 text-xs max-w-md mx-auto">
                Thank you for reaching out. A communication thread has been queued and Lelisa will respond promptly.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-white/60 block">
                    IDENTITY // YOUR NAME
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="e.g. Elena Vance"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs placeholder:text-white/30 focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-white/60 block">
                    RETURN ADDRESS // YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    placeholder="e.g. elena@company.com"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs placeholder:text-white/30 focus:border-cyan focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-white/60 block">
                  PAYLOAD // MESSAGE OR PROJECT BRIEF
                </label>
                <textarea
                  rows="4"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your vision, system requirements, or project timeline..."
                  required
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white font-mono text-xs placeholder:text-white/30 focus:border-cyan focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan to-blue-600 text-black font-syne font-black text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-xl shadow-cyan/20"
              >
                {isSubmitting ? (
                  <span>TRANSMITTING PACKETS...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 fill-black" />
                    <span>TRANSMIT MESSAGE DIRECTLY</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}
