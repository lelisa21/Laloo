import React, { useState, useRef, useContext } from "react";
import { motion, useScroll, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE, copyText } from "../utils/helpers";
import { ToastCtx } from "../context/ToastContext";

export function Arrow() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 11 11 3M5 3h6v6" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function Reveal({ children, delay = 0, y = 28, as = "div", className = "", style }) {
  const reduce = useReducedMotion();
  const Tag = motion[as] || motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0.25, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

export function Rule() {
  return (
    <motion.div
      className="rule"
      initial={{ scaleX: 0.15 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, amount: 1 }}
      transition={{ duration: 1.1, ease: EASE }}
    />
  );
}

export function SectionHead({ kicker, title, note }) {
  return (
    <header className="sh">
      <Reveal className="kicker">{kicker}</Reveal>
      <div className="sh-row">
        <Reveal as="h4" className="sh-title" y={40}>
          {title}
        </Reveal>
        {note && (
          <Reveal as="p" className="sh-note" delay={0.1}>
            {note}
          </Reveal>
        )}
      </div>
      <Rule />
    </header>
  );
}

export function Magnetic({ children, strength = 0.3 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType === "touch" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}

export function CopyBtn({ value, label }) {
  const toast = useContext(ToastCtx);
  const [done, setDone] = useState(false);

  const click = async () => {
    const ok = await copyText(value);
    toast(ok ? label + " copied" : "Select the text to copy it");
    if (ok) {
      setDone(true);
      setTimeout(() => setDone(false), 1600);
    }
  };

  return (
    <Magnetic>
      <button className="btn" onClick={click}>
        {done ? "Copied" : "Copy " + label.toLowerCase()}
      </button>
    </Magnetic>
  );
}

export function ScrollBar() {
  const { scrollYProgress } = useScroll();
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });
  return <motion.div className="progress" style={{ scaleX: sx }} aria-hidden="true" />;
}
