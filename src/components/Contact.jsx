import { Arrow, Reveal, SectionHead, CopyBtn } from "./Common";
import { EMAIL, PHONE, LINKS } from "../data/portfolioData";

export default function Contact({ go }) {
  const words = [["Let's"], ["build"], ["something"], ["people"], ["use."]];

  return (
    <section id="contact" className="sec">
      <SectionHead kicker="Contact" title="Say hello" />
      <h2 className="cta">
        {words.map(([w], i) => (
          <Reveal
            as="span"
            className={"wd" + (w === "build" ? " hl" : "")}
            key={w}
            delay={i * 0.08}
            y={50}
          >
            {w}
          </Reveal>
        ))}
      </h2>

      <div className="contact-grid">
        <div className="c">
          <span className="mono" style={{ color: "var(--acc)" }}>
            Email
          </span>
          <span className="c-val">{EMAIL}</span>
          <CopyBtn value={EMAIL} label="Email" />
        </div>
        <div className="c">
          <span className="mono" style={{ color: "var(--acc)" }}>
            Phone
          </span>
          <span className="c-val">{PHONE}</span>
          <CopyBtn value={PHONE} label="Phone" />
        </div>
        <div className="c">
          <span className="mono" style={{ color: "var(--acc)" }}>
            Elsewhere
          </span>
          <ul className="c-links">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} target="_blank" rel="noopener noreferrer">
                  <span>{l.label}</span>
                  <small>{l.handle}</small>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="foot mono">
        <span>© 2026 Lelisa Hailu · Built with React and Framer Motion</span>
        <button className="btn" onClick={() => go("top")}>
          Back to top <Arrow />
        </button>
      </footer>
    </section>
  );
}
