import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { EASE } from "../utils/helpers";
import { NAV } from "../data/portfolioData";

export default function Nav({ dark, onTheme, active, go }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const f = () => {
      try {
        setTime(
          new Intl.DateTimeFormat("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            timeZone: "Africa/Addis_Ababa",
            hour12: false,
          }).format(new Date())
        );
      } catch {}
    };
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className="nav" aria-label="Primary">
      <div className="nav-in">
        <button className="brand" onClick={() => go("top")} aria-label="Back to top">
          <span className="mark">LH</span>
          <span className="brand-name">Lelisa Hailu</span>
        </button>

        <div className="nav-links">
          {NAV.map(([id, label]) => (
            <button
              key={id}
              className={"nl" + (active === id ? " on" : "")}
              onClick={() => go(id)}
            >
              {label}
              {active === id && (
                <motion.span
                  layoutId="nav-ind"
                  className="nl-ind"
                  transition={{ duration: 0.4, ease: EASE }}
                />
              )}
            </button>
          ))}
        </div>

        <span className="clock" aria-label="Local time in Addis Ababa">
          Addis Ababa <b>{time}</b> EAT
        </span>

        <button className="tog" onClick={onTheme} aria-pressed={dark}>
          <i></i>
          {dark ? "Dark" : "Light"}
        </button>
      </div>
    </nav>
  );
}
