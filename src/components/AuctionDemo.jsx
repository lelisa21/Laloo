import { useEffect, useRef } from "react";

const LOTS = [
  "Hand-carved jebena",
  "Silver Lalibela cross",
  "Handwoven gabi",
  "Mesob serving basket",
];
const NAMES = ["Hana", "Dawit", "Selam", "Abel", "Mekdes", "Yonas"];
const LEN = 20;

function money(value) {
  return `ETB ${Math.round(value).toLocaleString("en-US")}`;
}

export default function AuctionDemo() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const find = (selector) => root.querySelector(selector);
    const auction = find(".al");
    const priceEl = find(".price");
    const bidsEl = find(".bids");
    const lotEl = find(".lot");
    const nameEl = find(".nm");
    const wsEl = find(".ws");
    const timeEl = find(".tm");
    const ringEl = find(".ring-fill");
    const soldEl = find(".sold");
    const hintEl = find(".hint");
    const stageEl = find(".st3");
    const bidButton = find(".bid-btn");
    const sparkLine = find(".spark-line");
    const sparkArea = find(".spark-area");

    if (!auction || !priceEl || !bidsEl || !lotEl || !nameEl) return undefined;

    let alive = true;
    let shown = 12400;
    let raf = 0;
    let tickTimer = 0;
    let botTimer = 0;
    let lotTimer = 0;
    const chipTimers = new Set();
    const state = {
      price: 12400,
      history: [],
      last: "-",
      sold: false,
      lot: 4,
      end: Date.now() + LEN * 1000,
    };

    function tween(target) {
      const from = shown;
      const started = performance.now();
      window.cancelAnimationFrame(raf);
      const step = (now) => {
        if (!alive) return;
        const progress = Math.min(1, (now - started) / 450);
        shown = from + (target - from) * (1 - Math.pow(1 - progress, 3));
        priceEl.textContent = money(shown);
        if (progress < 1) raf = window.requestAnimationFrame(step);
      };
      raf = window.requestAnimationFrame(step);
    }

    function drawSpark() {
      const history = state.history.slice(-24);
      if (!history.length) return;
      const min = Math.min(...history);
      const max = Math.max(...history);
      const denominator = Math.max(history.length - 1, 1);
      const points = history
        .map((value, index) => {
          const x = (index / denominator) * 240;
          const y = 36 - ((value - min) / (max - min || 1)) * 30;
          return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");
      if (sparkLine) sparkLine.setAttribute("points", points);
      if (sparkArea) sparkArea.setAttribute("points", `0,40 ${points} 240,40`);
    }

    function ping() {
      if (wsEl) wsEl.textContent = `ws ${16 + Math.floor(Math.random() * 24)} ms`;
    }

    function addBidRow(who, amount) {
      const row = document.createElement("li");
      row.innerHTML = `<span>${who}</span><span>${money(amount)}</span>`;
      bidsEl.insertBefore(row, bidsEl.firstChild);
      while (bidsEl.children.length > 3) bidsEl.removeChild(bidsEl.lastChild);
    }

    function addChip(who, amount) {
      const chip = document.createElement("span");
      chip.className = "chip";
      chip.textContent = `+${amount} ${who}`;
      chip.style.setProperty("--cx", `${Math.random() * 110 - 55}px`);
      stageEl?.appendChild(chip);
      const timer = window.setTimeout(() => {
        chip.remove();
        chipTimers.delete(timer);
      }, 1700);
      chipTimers.add(timer);
    }

    function flashPrice() {
      priceEl.classList.remove("flash");
      void priceEl.offsetWidth;
      priceEl.classList.add("flash");
    }

    function bid(who, amount) {
      if (!alive || state.sold) return;
      const previous = state.last;
      state.price += amount;
      state.last = who;
      state.history.push(state.price);
      tween(state.price);
      drawSpark();
      addBidRow(who, state.price);
      ping();
      addChip(who, amount);
      flashPrice();

      if ((state.end - Date.now()) / 1000 < 6) {
        state.end += 6000;
        if (hintEl) hintEl.textContent = "Late bid! The clock adds 6 s (anti-sniping).";
      } else if (previous === "You" && who !== "You") {
        if (hintEl) hintEl.textContent = `${who} outbid you. Bid again?`;
      }

      if (previous === "You" && who !== "You") {
        auction.classList.remove("shake");
        void auction.offsetWidth;
        auction.classList.add("shake");
      }
    }

    function newLot() {
      if (!alive) return;
      state.sold = false;
      state.price = 12000 + Math.floor(Math.random() * 8) * 100;
      shown = state.price;
      state.history = [state.price - 300, state.price - 200, state.price - 100, state.price];
      state.last = "-";
      state.end = Date.now() + LEN * 1000;
      lotEl.textContent = String(state.lot).padStart(2, "0");
      nameEl.textContent = LOTS[state.lot % LOTS.length];
      priceEl.textContent = money(state.price);
      bidsEl.innerHTML = "";
      drawSpark();
      soldEl?.classList.remove("on");
      if (hintEl) {
        hintEl.textContent =
          "Bid in the last 6 seconds and the clock adds 6 more. Real auctions call it anti-sniping.";
      }
    }

    function tick() {
      if (!alive) return;
      const left = Math.max(0, (state.end - Date.now()) / 1000);
      if (ringEl) ringEl.style.strokeDashoffset = String(327 * (1 - Math.min(1, left / LEN)));
      if (timeEl) timeEl.textContent = `${left.toFixed(0)}s left`;

      if (left <= 0 && !state.sold) {
        state.sold = true;
        if (soldEl) {
          const winner = state.last === "-" ? "nobody" : state.last;
          soldEl.innerHTML = `<div><b>SOLD</b><br>to ${winner} for ${money(state.price)}</div>`;
          soldEl.classList.add("on");
        }
        lotTimer = window.setTimeout(() => {
          if (!alive) return;
          state.lot += 1;
          newLot();
        }, 3200);
      }
    }

    function runBot() {
      if (!alive) return;
      if (!state.sold && Math.random() < 0.9) {
        const next = NAMES[Math.floor(Math.random() * NAMES.length)];
        if (next !== state.last) bid(next, Math.random() < 0.2 ? 200 : 100);
      }
      botTimer = window.setTimeout(runBot, 1300 + Math.random() * 1900);
    }

    const onPointerMove = (event) => {
      const rect = root.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      auction.style.setProperty("--ty", `${x * 16}deg`);
      auction.style.setProperty("--tx", `${-y * 14}deg`);
    };
    const onPointerLeave = () => {
      auction.style.removeProperty("--ty");
      auction.style.removeProperty("--tx");
    };

    const onBid = () => bid("You", 100);
    bidButton?.addEventListener("click", onBid);
    root.addEventListener("pointermove", onPointerMove);
    root.addEventListener("pointerleave", onPointerLeave);

    tickTimer = window.setInterval(tick, 200);
    newLot();
    tick();
    runBot();

    return () => {
      alive = false;
      window.clearInterval(tickTimer);
      window.clearTimeout(botTimer);
      window.clearTimeout(lotTimer);
      window.cancelAnimationFrame(raf);
      chipTimers.forEach((timer) => window.clearTimeout(timer));
      chipTimers.clear();
      bidButton?.removeEventListener("click", onBid);
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="auc" ref={rootRef} aria-label="Live auction demo">
      <div className="al">
        <div className="top">
          <span className="live">
            Live · Lot <span className="lot">04</span>
          </span>
          <span className="ws">ws 24 ms</span>
        </div>
        <div className="st3">
          <svg className="ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" fill="none" stroke="#262626" strokeWidth="3" />
            <circle
              className="ring-fill"
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="#FFD60A"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="327"
              strokeDashoffset="0"
            />
          </svg>
          <div className="cube">
            <i />
            <i />
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="tm">20s left</div>
        </div>
        <div className="nm">Hand-carved jebena</div>
        <div className="price">ETB 12,400</div>
        <svg className="spark" viewBox="0 0 240 40" preserveAspectRatio="none" aria-hidden="true">
          <polygon className="spark-area" fill="rgba(255,214,10,.1)" />
          <polyline
            className="spark-line"
            fill="none"
            stroke="#FFD60A"
            strokeWidth="1.6"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <ul className="bids" />
        <button className="bid-btn" type="button">
          Bid +ETB 100
        </button>
        <div className="hint">
          Bid in the last 6 seconds and the clock adds 6 more. Real auctions call it anti-sniping.
        </div>
        <div className="sold" />
      </div>
    </div>
  );
}
