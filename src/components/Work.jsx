import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "../utils/helpers";
import { Arrow, SectionHead } from "./Common";
import { PROJECTS_DATA } from "../data/portfolioData";

const BIDDER_NAMES = ["A41", "K07", "M92", "T18", "R55"];

function BidTicker() {
  const reduce = useReducedMotion();
  const [bids, setBids] = useState([
    { id: 3, who: "M92", amt: 48500 },
    { id: 2, who: "K07", amt: 47000 },
    { id: 1, who: "A41", amt: 45500 },
  ]);
  const [left, setLeft] = useState(252);
  const amt = useMotionValue(48500);
  const shown = useTransform(amt, (v) => "ETB " + Math.round(v).toLocaleString("en-US"));

  useEffect(() => {
    if (reduce) return;
    let n = 4,
      last = 48500;
    const id = setInterval(() => {
      last += n % 2 ? 1000 : 500;
      const who = BIDDER_NAMES[n % BIDDER_NAMES.length],
        cur = n;
      setBids((b) => [{ id: cur, who, amt: last }, ...b].slice(0, 4));
      animate(amt, last, { duration: 0.7, ease: EASE });
      n++;
    }, 1900);

    const t = setInterval(() => setLeft((s) => (s > 15 ? s - 1 : 252)), 1000);
    return () => {
      clearInterval(id);
      clearInterval(t);
    };
  }, [reduce, amt]);

  const mm = String(Math.floor(left / 60)).padStart(2, "0"),
    ss = String(left % 60).padStart(2, "0");

  return (
    <div className="viz">
      <div className="viz-cap">
        <span>Live bid · simulated</span>
        <span>
          {mm}:{ss} left
        </span>
      </div>
      <motion.div className="bid-now">{shown}</motion.div>
      <div className="timer">
        <i style={{ width: (left / 252) * 100 + "%" }}></i>
      </div>
      <ul className="bids">
        <AnimatePresence initial={false}>
          {bids.map((b) => (
            <motion.li
              key={b.id}
              layout
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <span>Bidder {b.who}</span>
              <span>ETB {b.amt.toLocaleString("en-US")}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

function LinkNodes() {
  const pts = [
    [40, 50],
    [110, 30],
    [190, 70],
    [260, 35],
    [320, 80],
    [70, 120],
    [150, 140],
    [230, 120],
    [300, 160],
    [50, 195],
    [130, 205],
    [210, 190],
    [290, 215],
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [2, 6],
    [4, 8],
    [5, 9],
    [6, 10],
    [7, 11],
    [8, 12],
    [9, 10],
    [10, 11],
    [11, 12],
    [1, 5],
    [3, 7],
  ];
  const ring = { transformBox: "fill-box", transformOrigin: "center" };

  return (
    <div className="viz">
      <div className="viz-cap">
        <span>Report · Reconnect</span>
        <span>Families</span>
      </div>
      <svg
        className="net"
        viewBox="0 0 360 240"
        role="img"
        aria-label="Network of people with one connection being drawn between two points"
      >
        {edges.map(([a, b], k) => (
          <line
            key={k}
            className="e"
            x1={pts[a][0]}
            y1={pts[a][1]}
            x2={pts[b][0]}
            y2={pts[b][1]}
          />
        ))}
        {pts.map(([x, y], k) => (
          <rect
            key={k}
            className={k === 9 || k === 3 ? "hot" : "n"}
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
          />
        ))}
        <motion.path
          className="link"
          d="M50 195 C 120 120, 200 170, 260 35"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0], opacity: [1, 1, 1, 0] }}
          transition={{ duration: 4.5, times: [0, 0.5, 0.85, 1], repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          className="ring"
          cx="50"
          cy="195"
          r="8"
          style={ring}
          animate={{ scale: [1, 3], opacity: [0.9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
        />
        <motion.circle
          className="ring"
          cx="260"
          cy="35"
          r="8"
          style={ring}
          animate={{ scale: [1, 3], opacity: [0.9, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
        />
        <text x="50" y="228" textAnchor="middle">
          Report
        </text>
        <text x="260" y="20" textAnchor="middle">
          Family
        </text>
      </svg>
    </div>
  );
}

function Stairs() {
  const reduce = useReducedMotion();
  const steps = [
    ["Full Stack", 38],
    ["AI", 58],
    ["Cybersecurity", 78],
    ["Software", 100],
  ];
  const [on, setOn] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setOn((o) => (o + 1) % 4), 1500);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div className="viz">
      <div className="viz-cap">
        <span>Free courses</span>
        <span>Mentorship access</span>
      </div>
      <div className="stairs">
        {steps.map(([n, h], i) => (
          <div className="stair" key={n}>
            <div className="stair-area">
              <motion.div
                className={"bar" + (on === i ? " on" : "")}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
                style={{ height: h + "%", transformOrigin: "bottom" }}
              />
            </div>
            <span className="stair-l">{n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const VIZ_COMPONENTS = {
  bidTicker: BidTicker,
  linkNodes: LinkNodes,
  stairs: Stairs,
};

function ProjectRow({ p, open, onToggle }) {
  const VizComponent = VIZ_COMPONENTS[p.vizType];

  return (
    <article className="proj">
      <button
        className="proj-head"
        aria-expanded={open}
        onClick={onToggle}
        data-cursor={open ? "Close" : "Open"}
      >
        <span className="proj-role">{p.role}</span>
        <span className="proj-name">{p.name}</span>
        <span className="proj-kind">{p.kind}</span>
        <motion.span
          className="proj-plus"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            className="proj-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <div className="proj-inner">
              <div>
                <ul className="pts">
                  {p.pts.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li className="chip" key={t}>
                      {t}
                    </li>
                  ))}
                </ul>
                {p.url && (
                  <a className="btn" href={p.url} target="_blank" rel="noopener noreferrer">
                    {p.urlText} <Arrow />
                  </a>
                )}
              </div>
              {VizComponent && <VizComponent />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function Work() {
  const [open, setOpen] = useState("cheretanet");

  return (
    <section id="work" className="sec">
      <SectionHead
        kicker="Work"
        title="Selected builds"
        note="Three products I designed, led or built. Open a row for the details."
      />
      <div className="projs">
        {PROJECTS_DATA.map((p) => (
          <ProjectRow
            key={p.id}
            p={p}
            open={open === p.id}
            onToggle={() => setOpen((o) => (o === p.id ? null : p.id))}
          />
        ))}
      </div>
    </section>
  );
}
