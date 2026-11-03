import React, { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
} from "framer-motion";
import { wrap } from "../utils/helpers";

export default function Marquee({ items, speed = 70, outline = false, reverse = false }) {
  const x = useMotionValue(0);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);
  const sv = useSpring(vel, { damping: 50, stiffness: 400 });
  const vf = useTransform(sv, [0, 1000], [0, 5], { clamp: false });
  const dir = useRef(reverse ? 1 : -1);
  const one = useRef(null);
  const W = useRef(0);

  useEffect(() => {
    const m = () => {
      W.current = one.current ? one.current.offsetWidth : 0;
    };
    m();
    window.addEventListener("resize", m);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(m);
    return () => window.removeEventListener("resize", m);
  }, []);

  useAnimationFrame((t, d) => {
    if (reduce || !W.current) return;
    const v = vf.get();
    const base = reverse ? 1 : -1;
    dir.current = v < -0.05 ? -base : base;
    const move = dir.current * speed * (d / 1000) * (1 + Math.abs(v) * 1.2);
    x.set(wrap(-W.current, 0, x.get() + move));
  });

  const row = (k) => (
    <div className="copy" key={k} ref={k === 0 ? one : null}>
      {items.map((t) => (
        <span className={"mq-item" + (outline ? " out" : "")} key={t}>
          {t}
          <i className="mq-dot"></i>
        </span>
      ))}
    </div>
  );

  return (
    <div className="mq" aria-hidden="true">
      <motion.div className="track" style={{ x }}>
        {[0, 1, 2, 3].map(row)}
      </motion.div>
    </div>
  );
}
