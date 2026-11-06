import { useCallback, useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetail from "./pages/ProjectDetail";
import NotFound from "./pages/NotFound";
import { getProject } from "./data/projects";
import { applyPageMeta, getPageMeta } from "./lib/seo";

function normalizePath(pathname) {
  const path = pathname.replace(/\/+$/, "");
  return path || "/";
}

function parseRoute() {
  const path = normalizePath(window.location.pathname);
  if (path === "/" || path === "/index.html") return { name: "home" };
  if (path === "/projects") return { name: "projects" };

  const match = path.match(/^\/projects\/([^/]+)$/);
  if (match) {
    return { name: "project", id: decodeURIComponent(match[1]) };
  }
  return { name: "notfound" };
}

export default function App() {
  const [route, setRoute] = useState(parseRoute);
  const pendingScrollRef = useRef("");
  const [theme, setTheme] = useState(() => {
    const initial = document.documentElement.dataset.theme;
    if (initial) return initial;
    try {
      return window.localStorage.getItem("lh-theme") || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    const onPopState = () => {
      setRoute(parseRoute());
      if (window.location.hash) {
        pendingScrollRef.current = window.location.hash.slice(1);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage.setItem("lh-theme", theme);
    } catch {
      // Storage can be unavailable in private mode. The theme still works for this visit.
    }
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "light" ? "#F4F4F2" : "#050505");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === "light" ? "dark" : "light"));
  }, []);

  const scrollToHash = useCallback((hash) => {
    const id = hash.replace(/^#/, "");
    const target = id === "top" ? document.getElementById("top") : document.getElementById(id);
    if (!target) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  const navigate = useCallback(
    (to) => {
      const url = new URL(to, window.location.origin);
      const path = normalizePath(url.pathname);
      const hash = url.hash;
      const next = `${path}${hash}`;
      const current = `${normalizePath(window.location.pathname)}${window.location.hash}`;

      if (next === current) {
        if (hash) scrollToHash(hash);
        else window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      window.history.pushState({}, "", next);
      setRoute(parseRoute());

      if (hash) {
        pendingScrollRef.current = hash.slice(1);
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }
    },
    [scrollToHash]
  );

  useEffect(() => {
    const hash = pendingScrollRef.current;
    if (!hash) return undefined;
    pendingScrollRef.current = "";
    const frame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => scrollToHash(hash));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route, scrollToHash]);

  useEffect(() => {
    const project = route.name === "project" ? getProject(route.id) : null;
    applyPageMeta(getPageMeta(route, project));
  }, [route]);

  useEffect(() => {
    if (!window.location.hash) return undefined;
    const frame = window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => scrollToHash(window.location.hash))
    );
    return () => window.cancelAnimationFrame(frame);
  }, [scrollToHash]);

  return (
    <>
      <Background />
      <SiteHeader navigate={navigate} theme={theme} onToggleTheme={toggleTheme} />
      {route.name === "home" && <Home navigate={navigate} />}
      {route.name === "projects" && <ProjectsPage navigate={navigate} />}
      {route.name === "project" && (
        <ProjectDetail projectId={route.id} navigate={navigate} />
      )}
      {route.name === "notfound" && <NotFound navigate={navigate} />}
      <SiteFooter />
    </>
  );
}
