import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  animate,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "../utils/helpers";
import { Arrow, Reveal, Magnetic } from "./Common";
import portraitImg from "../assets/portrait.jpg";

function Letter({ ch, i, mx, my, reduce }) {
  const ref = useRef(null);
  const c = useRef({ x: -9999, y: -9999, r: 300 });

  useEffect(() => {
    const m = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      c.current = {
        x: r.left + r.width / 2 + window.scrollX,
        y: r.top + r.height / 2 + window.scrollY,
        r: Math.max(r.height * 1.5, 220),
      };
    };
    m();
    window.addEventListener("resize", m);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(m);
    const t = setTimeout(m, 1600);
    return () => {
      window.removeEventListener("resize", m);
      clearTimeout(t);
    };
  }, []);

  const raw = useTransform([mx, my], ([x, y]) => {
    const dx = x - c.current.x,
      dy = (y - c.current.y) * 1.15;
    const t = Math.max(0, 1 - Math.hypot(dx, dy) / c.current.r);
    return 78 + 47 * t * t;
  });

  const w = useSpring(raw, { stiffness: 220, damping: 24, mass: 0.6 });
  const wg = useTransform(w, [78, 125], [700, 900]);
  const fvs = useMotionTemplate`"wdth" ${w}, "wght" ${wg}`;

  return (
    <span ref={ref} className="mask">
      <motion.span
        className="glyph"
        aria-hidden="true"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.055 }}
        style={{ fontVariationSettings: fvs }}
      >
        {ch}
      </motion.span>
    </span>
  );
}

function Name() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const box = useRef(null);

  useEffect(() => {
    if (reduce || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const x0 = r.left + window.scrollX,
      x1 = x0 + r.width * 0.78;
    my.set(r.top + window.scrollY + r.height * 0.5);
    let ctl = animate(mx, [x0, x1, x0], { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1.4 });

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      if (ctl) {
        ctl.stop();
        ctl = null;
      }
      mx.set(e.pageX);
      my.set(e.pageY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (ctl) ctl.stop();
    };
  }, [reduce, mx, my]);

  const lines = ["LELISA", "HAILU"];

  return (
    <h1 className="name" ref={box} aria-label="Lelisa Hailu">
      {lines.map((ln, li) => (
        <span className="name-line" key={ln}>
          {[...ln].map((ch, i) => (
            <Letter key={i} ch={ch} i={i + li * 6} mx={mx} my={my} reduce={reduce} />
          ))}
        </span>
      ))}
    </h1>
  );
}

function Portrait() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const [hov, setHov] = useState(false);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHov(false);
  };

  return (
    <motion.figure
      className={"portrait" + (hov ? " hov" : "")}
      onPointerMove={onMove}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
    >
      <img src={portraitImg} alt="Portrait of Lelisa Hailu" width="449" height="520" />
      <div className="tint"></div>
      <figcaption>
        <span>Lelisa Hailu</span>
        <span>Addis Ababa</span>
      </figcaption>
    </motion.figure>
  );
}

function GridBg() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);
  return <motion.div className="gridbg" style={{ y }} aria-hidden="true" />;
}

export default function Hero({ go }) {
  return (
    <section id="top" className="hero">
      <GridBg />
      <div className="eyebrow mono">
        <span>Full Stack Engineer · MERN · Next.js · Go</span>
        <span>Addis Ababa, Ethiopia · 9.03° N 38.74° E</span>
      </div>

      <div className="hero-grid">
        <div className="name-col">
          <Name />
          <Reveal as="p" className="hero-copy" delay={0.9}>
            I build real products end to end: real-time systems, solid REST APIs and platforms people actually use,
            mainly with the MERN stack, Next.js and Go.
          </Reveal>

          <Reveal className="hero-actions" delay={1.05}>
            <Magnetic>
              <button className="btn solid" onClick={() => go("work")} data-cursor="Go">
                See the work <Arrow />
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn" onClick={() => go("contact")}>
                Get in touch
              </button>
            </Magnetic>
          </Reveal>

          <Reveal as="ul" className="chips" delay={1.2}>
            <li className="chip">
              <b>Technical Lead</b> · GDG AASTU
            </li>
            <li className="chip">
              <b>Back End Intern</b> · Gebeta Maps
            </li>
            <li className="chip">
              <b>BSc Software Eng.</b> · AASTU, May 2028
            </li>
          </Reveal>
        </div>

        <Portrait />
      </div>

      <div className="scrollhint mono">
        <i></i>Scroll
      </div>
    </section>
  );
}
