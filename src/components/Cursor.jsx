import React, { useState, useEffect } from "react";
import { motion, useSpring, useMotionValue, useReducedMotion } from "framer-motion";
import { EASE, useFinePointer } from "../utils/helpers";

export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const x = useSpring(mx, { stiffness: 600, damping: 45, mass: 0.35 });
  const y = useSpring(my, { stiffness: 600, damping: 45, mass: 0.35 });
  const [lab, setLab] = useState(null);

  useEffect(() => {
    if (!fine || reduce) return;
    const mv = (e) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    const ov = (e) => {
      const t = e.target && e.target.closest ? e.target.closest("[data-cursor],a,button") : null;
      setLab(t ? t.getAttribute("data-cursor") || "" : null);
    };
    window.addEventListener("pointermove", mv, { passive: true });
    document.addEventListener("pointerover", ov);
    return () => {
      window.removeEventListener("pointermove", mv);
      document.removeEventListener("pointerover", ov);
    };
  }, [fine, reduce, mx, my]);

  if (!fine || reduce) return null;
  const big = lab !== null;

  return (
    <motion.div className="cur" style={{ x, y }} aria-hidden="true">
      <motion.div
        className={"cur-box" + (big ? " big" : "")}
        animate={{ width: big ? (lab ? 76 : 44) : 12, height: big ? (lab ? 76 : 44) : 12 }}
        transition={{ duration: 0.3, ease: EASE }}
      >
        {lab}
      </motion.div>
    </motion.div>
  );
}
