import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { SectionHead, Reveal } from "./Common";
import { PROFILE } from "../data/portfolioData";

function Word({ w, p, a, b, reduce }) {
  const o = useTransform(p, [a, b], [0, 1]);
  return (
    <span className="w">
      <span className="w-base">{w}</span>
      <motion.span className="w-top" aria-hidden="true" style={{ opacity: reduce ? 1 : o }}>
        {w}
      </motion.span>
    </span>
  );
}

function ScrollText({ text, className }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.55"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word
          key={i}
          w={w}
          p={scrollYProgress}
          a={i / words.length}
          b={(i + 1) / words.length}
          reduce={reduce}
        />
      ))}
    </p>
  );
}

export default function About() {
  return (
    <section id="about" className="sec">
      <SectionHead
        kicker="About"
        title="Profile"
        note="Based in Addis Ababa. Currently leading engineering at GDG AASTU and shipping Go services for a navigation app."
      />
      <ScrollText className="about-text" text={PROFILE} />
      <div className="info">
        <Reveal>
          <h3>Education</h3>
          <p>
            <strong>BSc Software Engineering</strong>
            <small>Addis Ababa Science and Technology University (AASTU) · Expected May 2028</small>
          </p>
          <p>
            <strong>ALX Africa</strong>
            <small>Professional Frontend Development & Training</small>
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h3>Right now</h3>
          <p>
            <strong>Technical Lead</strong>
            <small>GDG AASTU · Oct 2026 – Present</small>
          </p>
          <p>
            <strong>Back End Developer Intern</strong>
            <small>Gebeta Maps · Jun 2026 – Present · Remote</small>
          </p>
        </Reveal>
        <Reveal delay={0.16}>
          <h3>Languages</h3>
          <div className="lang">
            <span>English</span>
            <span>Fluent</span>
          </div>
          <div className="lang">
            <span>Amharic</span>
            <span>Native</span>
          </div>
          <div className="lang">
            <span>Afan Oromo</span>
            <span>Native</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
