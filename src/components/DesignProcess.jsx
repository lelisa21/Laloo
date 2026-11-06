import { useEffect, useRef } from "react";

const STAGES = [
  {
    title: "Sketch",
    copy: "Talk to people, draw the flow on paper, find what actually matters before any pixels.",
    tags: ["Paper", "User chats"],
  },
  {
    title: "Wireframe",
    copy: "Structure before style: layout, hierarchy, spacing and every state the screen can be in.",
    tags: ["Figma", "8pt grid"],
  },
  {
    title: "Interface",
    copy: "Type, colour, motion and the details. Same screen, now with a personality.",
    tags: ["Tailwind", "shadcn/ui", "Framer-style motion"],
  },
  {
    title: "Ship",
    copy: "Code it, test it, deploy it, then watch real people use it and listen again.",
    tags: ["Jest", "SuperTest", "GitHub Actions", "Vercel"],
  },
];

export default function DesignProcess() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const find = (selector) => root.querySelector(selector);
    const frame = find(".fr");
    const screen = find(".scr");
    const list = find(".dl");
    const seed = find("#wtb");
    const buttons = Array.from(root.querySelectorAll(".ds"));

    if (!frame || !screen || !list || !buttons.length) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let activeStage = 0;
    let auto = true;
    let advanceTimer = 0;
    let seedTimer = 0;
    let observer = null;

    function setStage(stage) {
      activeStage = stage;
      frame.dataset.k = String(stage);
      screen.dataset.k = String(stage);
      screen.dataset.ui = stage >= 2 ? "1" : "0";
      buttons.forEach((button, index) => button.classList.toggle("on", index === stage));
    }

    function advance() {
      if (!auto) return;
      setStage((activeStage + 1) % 4);
      advanceTimer = window.setTimeout(advance, 3700);
    }

    const onButtonClick = (index) => {
      auto = false;
      window.clearTimeout(advanceTimer);
      list.classList.add("hold");
      setStage(index);
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => onButtonClick(index));
    });

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting && auto && !advanceTimer) {
            advanceTimer = window.setTimeout(advance, 3700);
          }
        },
        { threshold: 0.4 }
      );
      observer.observe(frame);
    }

    if (!reduced) {
      seedTimer = window.setInterval(() => {
        if (activeStage === 0 && seed) {
          seed.setAttribute("seed", String(Math.floor(Math.random() * 30)));
        }
      }, 170);
    }

    setStage(0);

    return () => {
      window.clearTimeout(advanceTimer);
      window.clearInterval(seedTimer);
      observer?.disconnect();
    };
  }, []);

  return (
    <section
      id="design"
      style={{
        background: "color-mix(in srgb,var(--surface) 70%,transparent)",
        borderBlock: "1px solid var(--line)",
      }}
    >
      <div className="wrap" ref={rootRef}>
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <filter id="wob">
            <feTurbulence id="wtb" type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="3" />
            <feDisplacementMap in="SourceGraphic" scale="3.5" />
          </filter>
        </svg>
        <h2>How I design</h2>
        <p className="lead">
          One Cheretanet screen, four stages. Watch it grow from a chalk sketch into a shipped
          product, or tap a stage to jump there.
        </p>
        <div className="dz">
          <div className="fr" data-k="0">
            <div className="scr" data-k="0" data-ui="0">
              <div className="hd">
                <b>cheretanet</b>
                <span className="nv">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
              <div className="im">
                <span className="lbl">photo of the lot</span>
                <svg viewBox="0 0 64 64" aria-hidden="true">
                  <path d="M22 52C14 44 16 28 32 24c16 4 18 20 10 28z" />
                  <path d="M32 24v-8M27 16h10M44 36l10-10 2 4M20 34c-10 0-10 12 1 12" />
                </svg>
              </div>
              <div className="tt">Hand-carved jebena</div>
              <div className="rw2">
                <div className="pr">
                  <small>Current bid</small>
                  <b>ETB 12,400</b>
                </div>
                <div className="tmr">00:14</div>
              </div>
              <div className="bt">Place bid</div>
              <ul className="ls">
                <li>
                  <span>Hana</span>
                  <span>12,400</span>
                </li>
                <li>
                  <span>Dawit</span>
                  <span>12,300</span>
                </li>
              </ul>
            </div>
            <div className="nt g0">
              <p className="n" style={{ top: 104 }}>
                ← photo first. People buy what they see.
              </p>
              <p className="n" style={{ top: 270 }}>
                ← timer = pressure. keep it calm?
              </p>
              <p className="n" style={{ top: 345 }}>
                ← one thumb, one tap
              </p>
            </div>
            <div className="nt g1">
              <p className="n" style={{ top: 104 }}>
                8pt grid
                <br />
                16px gutters
              </p>
              <p className="n" style={{ top: 276 }}>
                timer 76 × 44
                <br />
                states: live / last 6s / sold
              </p>
              <p className="n" style={{ top: 346 }}>
                CTA 48px, min tap 44px
              </p>
            </div>
            <div className="nt g3">
              <p className="n" style={{ top: 110 }}>
                ✓ tested with Jest + SuperTest
              </p>
              <p className="n" style={{ top: 160 }}>
                ✓ CI on GitHub Actions
              </p>
              <p className="n" style={{ top: 210 }}>
                ↑ deployed to production
              </p>
            </div>
          </div>
          <div className="dl">
            {STAGES.map((stage, index) => (
              <button className={`ds${index === 0 ? " on" : ""}`} data-n={index + 1} type="button" key={stage.title}>
                <h3>{stage.title}</h3>
                <p>{stage.copy}</p>
                <div className="tg2">
                  {stage.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <i />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
