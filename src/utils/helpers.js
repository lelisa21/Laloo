import { useState, useEffect } from "react";

export const EASE = [0.22, 1, 0.36, 1];

export const wrap = (min, max, v) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

export async function copyText(t) {
  try {
    await navigator.clipboard.writeText(t);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = t;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
}

export function useFinePointer() {
  const [v, setV] = useState(false);
  useEffect(() => {
    try {
      setV(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
    } catch {}
  }, []);
  return v;
}

