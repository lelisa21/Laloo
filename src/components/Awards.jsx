import React, { useState, useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";
import { EASE } from "../utils/helpers";
import { Reveal, SectionHead } from "./Common";
import { CERTS } from "../data/portfolioData";

function Count({ from = 0, to, dec = 0, pre = "", suf = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inV = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const [txt, setTxt] = useState(() => pre + to.toFixed(dec) + suf);

  useEffect(() => {
    const formatValue = (v) => pre + v.toFixed(dec) + suf;
    if (!inV || reduce) {
      setTxt(formatValue(to));
      return;
    }
    const c = animate(from, to, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setTxt(formatValue(v)),
    });
    return () => c.stop();
  }, [inV, from, to, dec, pre, suf, reduce]);

  return <span ref={ref}>{txt}</span>;
}

export default function Awards() {
  return (
    <section id="awards" className="sec">
      <SectionHead
        kicker="Awards"
        title="Recognition"
        note="Competitions, mentoring and certifications."
      />
      <div className="stats">
        <Reveal className="stat">
          <div className="stat-v">
            <Count to={97.5} dec={1} suf="%" />
          </div>
          <p className="stat-t">Winner, GDG AASTU Tech Fest 2026</p>
          <p className="stat-d">Final score of 97.5%.</p>
        </Reveal>
        <Reveal className="stat" delay={0.08}>
          <div className="stat-v">
            <Count from={79} to={4} pre="#" />
          </div>
          <p className="stat-t">Top 5 finalist, STARK Official Hackathon</p>
          <p className="stat-d">Placed 4th out of about 79 projects.</p>
        </Reveal>
        <Reveal className="stat" delay={0.16}>
          <div className="stat-v">ALX</div>
          <p className="stat-t">Certificate of Appreciation</p>
          <p className="stat-d">For peer mentoring and helping create a welcoming learning space.</p>
        </Reveal>
      </div>

      <div className="certs">
        <h3 className="mono" style={{ color: "var(--acc)", fontWeight: 500 }}>
          Certifications
        </h3>
        {CERTS.map(([a, b], i) => (
          <Reveal className="cert" key={a + b} delay={i * 0.05} y={16}>
            <span>{a}</span>
            <span>{b}</span>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
