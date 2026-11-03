import React, { useRef } from "react";
import { motion, useInView, useScroll, useSpring } from "framer-motion";
import { EASE } from "../utils/helpers";
import { Reveal, SectionHead } from "./Common";
import { EXP } from "../data/portfolioData";

function ExpItem({ e }) {
  const ref = useRef(null);
  const on = useInView(ref, { once: true, margin: "0px 0px -35% 0px" });

  return (
    <div className="ex" ref={ref}>
      <motion.span
        className="dot"
        animate={{ background: on ? "var(--acc)" : "var(--bg)", scale: on ? 1 : 0.8 }}
        transition={{ duration: 0.5, ease: EASE }}
      />
      <Reveal className="ex-meta">
        <b>{e.when}</b>
        {e.where && <span>{e.where}</span>}
      </Reveal>
      <Reveal className="ex-card" delay={0.08}>
        <h3 className="ex-org">{e.org}</h3>
        <p className="ex-role">{e.role}</p>
        <ul className="pts">
          {e.pts.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ul className="tags" style={{ margin: 0 }}>
          {e.tags.map((t) => (
            <li className="chip" key={t}>
              {t}
            </li>
          ))}
        </ul>
      </Reveal>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 70%"] });
  const sy = useSpring(scrollYProgress, { stiffness: 100, damping: 26, restDelta: 0.001 });

  return (
    <section id="experience" className="sec">
      <SectionHead
        kicker="Experience"
        title="Where I've shipped"
        note="Newest first. The line fills as you scroll."
      />
      <div className="tl" ref={ref}>
        <div className="spine">
          <motion.div className="spine-fill" style={{ scaleY: sy }} />
        </div>
        {EXP.map((e) => (
          <ExpItem key={e.org} e={e} />
        ))}
      </div>
    </section>
  );
}
