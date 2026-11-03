import React, { useState, useEffect, useRef, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { ToastCtx } from "./context/ToastContext";
import { ScrollBar } from "./components/Common";
import Cursor from "./components/Cursor";
import Toast from "./components/Toast";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Work from "./components/Work";
import Experience from "./components/Experience";
import Stack from "./components/Stack";
import Awards from "./components/Awards";
import Contact from "./components/Contact";
import { NAV, MQ1, MQ2 } from "./data/portfolioData";

export default function App() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState("");
  const [msg, setMsg] = useState(null);
  const timer = useRef(null);

  const [dark, setDark] = useState(() => {
    try {
      const t = document.documentElement.getAttribute("data-theme");
      if (t) return t === "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch {
      return false;
    }
  });

  const toast = useCallback((m) => {
    setMsg(m);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMsg(null), 1800);
  }, []);

  const go = useCallback(
    (id) => {
      const el = document.getElementById(id);
      if (!el) return;
      if (id === "top") window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
      else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    },
    [reduce]
  );

  const onTheme = () => {
    const n = !dark;
    setDark(n);
    document.documentElement.setAttribute("data-theme", n ? "dark" : "light");
  };

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <ToastCtx.Provider value={toast}>
      <ScrollBar />
      <Cursor />
      <div className="wrap">
        <Nav dark={dark} onTheme={onTheme} active={active} go={go} />
        <main>
          <Hero go={go} />
          <Marquee items={MQ1} outline={true} />
          <Marquee items={MQ2} reverse={true} speed={60} />
          <About />
          <Work />
          <Experience />
          <Stack />
          <Awards />
          <Contact go={go} />
        </main>
      </div>
      <Toast msg={msg} />
    </ToastCtx.Provider>
  );
}
