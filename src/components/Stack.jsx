import React from "react";
import { Reveal, SectionHead } from "./Common";
import { STACK } from "../data/portfolioData";

export default function Stack() {
  return (
    <section id="stack" className="sec">
      <SectionHead kicker="Stack" title="Tools I reach for" note="Hover a cell." />
      <div className="stack">
        {STACK.map(([h, items], i) => (
          <Reveal className="cell" key={h} delay={(i % 4) * 0.07}>
            <h3>{h}</h3>
            <ul>
              {items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
