import { useEffect, useRef } from "react";

const HEIGHTS = [52, 64, 44, 90];

export default function StackJourney() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const find = (selector) => root.querySelector(selector);
    const findMany = (selector) => Array.from(root.querySelectorAll(selector));

    const rig = find(".rig");
    const world = find(".wd");
    const packet = find(".pk");
    const nodes = findMany(".nd");
    const connectors = findMany(".cb");
    const rows = findMany(".rw");
    const consoleEl = find(".ins");
    const speechEl = find(".say");
    const totalEl = find(".meter b");
    const codeEl = find(".code");
    const sendButton = find(".send-btn");
    const cacheButton = find(".cache-btn");
    const indexButton = find(".index-btn");
    const breakButton = find(".break-btn");

    if (
      !rig ||
      !world ||
      !packet ||
      !nodes.length ||
      !consoleEl ||
      !speechEl ||
      !totalEl ||
      !codeEl ||
      !sendButton
    ) {
      return undefined;
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { cache: false, warm: false, idx: false, bad: false, busy: false };
    let scale = 130;
    let alive = true;
    const timeouts = new Map();
    const animations = new Set();

    const position = (index) => `${index * 170 + 7}px 40px ${HEIGHTS[index] + 48}px`;
    let current = position(0);
    packet.style.translate = current;
    nodes[2]?.classList.add("dim");

    function sleep(duration) {
      return new Promise((resolve) => {
        const timer = window.setTimeout(() => {
          timeouts.delete(timer);
          resolve();
        }, reduced ? duration / 4 : duration);
        timeouts.set(timer, resolve);
      });
    }

    async function hop(index, label, bad) {
      if (!alive) return;
      packet.textContent = label;
      packet.classList.toggle("bad", Boolean(bad));
      nodes.forEach((node, nodeIndex) => node.classList.toggle("on", nodeIndex === index));
      connectors.forEach((connector, connectorIndex) =>
        connector.classList.toggle("on", connectorIndex === index || connectorIndex === index - 1)
      );

      const next = position(index);
      if (current === next) return;

      const from = current.split(" ").map(parseFloat);
      const to = next.split(" ").map(parseFloat);
      const middle = [
        (from[0] + to[0]) / 2,
        40,
        Math.max(from[2], to[2]) + 60,
      ];
      const keyframe = (values) => ({ translate: `${values.join("px ")}px` });

      const animation = packet.animate([keyframe(from), keyframe(middle), keyframe(to)], {
        duration: reduced ? 10 : 720,
        easing: "cubic-bezier(.45,0,.2,1)",
        fill: "forwards",
      });
      animations.add(animation);

      try {
        await animation.finished;
      } catch {
        return;
      } finally {
        animations.delete(animation);
      }

      if (!alive) return;
      current = next;
      packet.style.translate = next;
      animation.cancel();
    }

    function bar(index, start, duration, className, text) {
      if (!alive) return;
      const row = rows[index];
      if (!row) return;
      const fill = row.querySelector("i");
      const label = row.querySelector("b");
      if (!fill || !label) return;
      fill.className = className || "";
      fill.style.left = `${(start / scale) * 100}%`;
      fill.style.width = `${Math.max((duration / scale) * 100, 1.5)}%`;
      label.textContent = text || `${duration} ms`;
    }

    function clearBars() {
      rows.forEach((row) => {
        const fill = row.querySelector("i");
        const label = row.querySelector("b");
        if (fill) {
          fill.style.width = "0";
          fill.className = "";
        }
        if (label) label.textContent = "–";
      });
    }

    function show(html) {
      if (!alive) return;
      consoleEl.innerHTML = html;
      consoleEl.classList.remove("f");
      void consoleEl.offsetWidth;
      consoleEl.classList.add("f");
    }

    function speak(html) {
      if (alive) speechEl.innerHTML = html;
    }

    function finish(code, className, message) {
      if (!alive) return;
      codeEl.textContent = code;
      codeEl.className = `code ${className}`;
      speak(message);
      nodes.forEach((node) => node.classList.remove("on"));
      connectors.forEach((connector) => connector.classList.remove("on"));
      state.busy = false;
      sendButton.disabled = false;
    }

    async function send() {
      if (state.busy) return;
      state.busy = true;
      sendButton.disabled = true;
      clearBars();
      codeEl.className = "code";
      codeEl.textContent = "in flight";
      totalEl.textContent = "0 ms";
      nodes[3]?.classList.remove("bad");

      scale = state.bad && !(state.cache && state.warm) ? 5200 : state.cache && state.warm ? 40 : state.idx ? 50 : 130;
      let total = 0;

      function add(index, duration, className, text) {
        bar(index, total, duration, className, text);
        total += duration;
        totalEl.textContent = `${Math.round(total).toLocaleString("en-US")} ms`;
      }

      show(
        "<em>GET</em> /api/users?active=true HTTP/2\nAuthorization: Bearer eyJhbGciOi…\nAccept: application/json"
      );
      speak(
        '<b>Browser:</b> “Hey API, got any users?” <i>(DNS, TLS and queueing already cost me 14 ms.)</i>'
      );
      await hop(0, "GET /users");
      if (!alive) return;
      add(0, 14);

      show(
        "<em>middleware</em> verifyJWT ✓  rateLimit 98/100 ✓\n<em>route</em> GET /api/users → controller.list()"
      );
      speak("<b>API:</b> checks the JWT and the rate limit. Looks legit. Let me ask around.");
      await hop(1, "auth ✓");
      if (!alive) return;
      add(1, 8);

      if (state.cache) {
        await hop(2, "GET key");
        if (!alive) return;

        if (state.warm) {
          add(2, 2, "ok", "2 ms · HIT");
          show("<em>GET</em> users:active:p1\n→ <em>HIT</em> · TTL 54s · 14 kB");
          speak(
            state.bad
              ? '<b>Redis:</b> “Database is down? Not my problem, I have it right here.”'
              : '<b>Redis:</b> “Oh, I remember this one!”'
          );
          await sleep(500);
          if (!alive) return;
          await hop(1, "200 OK");
          if (!alive) return;
          await hop(0, "200 OK");
          if (!alive) return;
          add(4, 4);
          finish(
            "200 OK",
            "ok",
            `<b>Cache hit.</b> Served from memory in about ${Math.round(
              total
            )} ms. Cache what rarely changes and it feels instant, even when the database is struggling.`
          );
          return;
        }

        add(2, 2, "bad", "2 ms · MISS");
        show("<em>GET</em> users:active:p1\n→ <em>MISS</em>");
        speak('<b>Redis:</b> “Never seen this before.” <i>(Cold cache. Everyone starts somewhere.)</i>');
        await sleep(450);
        if (!alive) return;
      }

      await hop(3, "find()");
      if (!alive) return;

      if (state.bad) {
        show(
          "<em>db.users.find</em>({ active: true })\n→ <em>ETIMEDOUT</em> after 5000 ms"
        );
        speak("<b>MongoDB:</b> has gone to lunch.");
        nodes[3]?.classList.add("bad");
        add(3, 5000, "bad", "5000 ms · timeout");
        await hop(3, "timeout", true);
        if (!alive) return;
        await hop(1, "500", true);
        if (!alive) return;
        speak("<b>API:</b> returns a calm 500 and pages the on-call engineer (me).");
        await hop(0, "500", true);
        if (!alive) return;
        add(4, 6, "bad");
        show('HTTP/2 <em>500</em>\n{"error":"upstream_timeout","retry":true}');
        finish(
          "500 Error",
          "err",
          "<b>Fail loud, fail kindly.</b> The UI shows a Retry button instead of a blank screen. Design for failure in the API and in the UI."
        );
        return;
      }

      const duration = state.idx ? 6 : 80;
      show(
        `<em>db.users.find</em>({ active: true })\nplan: <em>${
          state.idx ? "IXSCAN { active: 1 }" : "COLLSCAN (reads every document)"
        }</em>\nexecution: ${duration} ms`
      );
      speak(
        state.idx
          ? '<b>MongoDB:</b> “An index? Beautiful. Straight to the page I need.”'
          : '<b>MongoDB:</b> “No index, so I’m reading every single document. Hold on.”'
      );
      add(3, duration, state.idx ? "ok" : "");
      await sleep(450);
      if (!alive) return;

      if (state.cache) {
        state.warm = true;
        speak("<b>API:</b> stashing a copy in Redis for next time.");
        await hop(2, "SET");
        if (!alive) return;
        await sleep(300);
        if (!alive) return;
      }

      await hop(1, "200 OK");
      if (!alive) return;
      await hop(0, "200 OK");
      if (!alive) return;
      add(4, 6);
      show(
        `HTTP/2 <em>200</em>\ncontent-type: application/json\n{"users":[ …20 ],"took":"${Math.round(
          total
        )}ms"}`
      );
      finish(
        "200 OK",
        "ok",
        state.idx
          ? `<b>Index added: ${Math.round(total)} ms.</b> Most slow endpoints are one missing index.`
          : `<b>${Math.round(
              total
            )} ms, and 80 of it is the scan.</b> Add an index, or cache it, then send again.`
      );
    }

    const onSend = () => {
      void send();
    };

    const onCache = () => {
      state.cache = !state.cache;
      state.warm = false;
      cacheButton.textContent = `Redis cache: ${state.cache ? "on" : "off"}`;
      cacheButton.classList.toggle("on", state.cache);
      nodes[2]?.classList.toggle("dim", !state.cache);
    };

    const onIndex = () => {
      state.idx = !state.idx;
      indexButton.textContent = `DB index: ${state.idx ? "on" : "off"}`;
      indexButton.classList.toggle("on", state.idx);
    };

    const onBreak = () => {
      state.bad = !state.bad;
      breakButton.textContent = state.bad ? "Fix the database" : "Break the database";
      breakButton.classList.toggle("on", state.bad);
    };

    const onPointerMove = (event) => {
      const rect = rig.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      world.style.setProperty("--rz", `${45 + x * 40}deg`);
      world.style.setProperty("--rx", `${58 - y * 20}deg`);
    };

    const onPointerLeave = () => {
      world.style.removeProperty("--rz");
      world.style.removeProperty("--rx");
    };

    sendButton.addEventListener("click", onSend);
    cacheButton?.addEventListener("click", onCache);
    indexButton?.addEventListener("click", onIndex);
    breakButton?.addEventListener("click", onBreak);
    rig.addEventListener("pointermove", onPointerMove);
    rig.addEventListener("pointerleave", onPointerLeave);

    return () => {
      alive = false;
      timeouts.forEach((resolve, timer) => {
        window.clearTimeout(timer);
        resolve();
      });
      timeouts.clear();
      animations.forEach((animation) => animation.cancel());
      animations.clear();
      sendButton.removeEventListener("click", onSend);
      cacheButton?.removeEventListener("click", onCache);
      indexButton?.removeEventListener("click", onIndex);
      breakButton?.removeEventListener("click", onBreak);
      rig.removeEventListener("pointermove", onPointerMove);
      rig.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section id="stack">
      <div className="wrap" ref={rootRef}>
        <h2>Follow one request through the stack</h2>
        <p className="lead">
          Four services as 3D blocks, one packet, and a live network waterfall. Tilt the scene, flip
          the switches, then send it.
        </p>
        <div className="rq">
          <div className="rig">
            <div className="wd">
              <div className="cb" style={{ left: "110px" }} />
              <div className="cb" style={{ left: "280px" }} />
              <div className="cb" style={{ left: "450px" }} />
              <div className="nd" style={{ left: "0", "--h": "52px" }}>
                <u />
                <s />
                <em>
                  Browser<small>React · Redux</small>
                </em>
              </div>
              <div className="nd" style={{ left: "170px", "--h": "64px" }}>
                <u />
                <s />
                <em>
                  API<small>Go · Express</small>
                </em>
              </div>
              <div className="nd" style={{ left: "340px", "--h": "44px" }}>
                <u />
                <s />
                <em>
                  Cache<small>Redis</small>
                </em>
              </div>
              <div className="nd" style={{ left: "510px", "--h": "90px" }}>
                <u />
                <s />
                <em>
                  Database<small>MongoDB</small>
                </em>
              </div>
              <div className="pk">GET /users</div>
            </div>
          </div>
          <div className="dev">
            <div className="ctrl2">
              <button className="btn p send-btn" type="button">
                Send request
              </button>
              <button className="btn cache-btn" type="button">
                Redis cache: off
              </button>
              <button className="btn index-btn" type="button">
                DB index: off
              </button>
              <button className="btn break-btn" type="button">
                Break the database
              </button>
            </div>
            <div className="wf">
              <div className="rw">
                <span>Browser</span>
                <div className="tk">
                  <i />
                </div>
                <b>–</b>
              </div>
              <div className="rw">
                <span>API</span>
                <div className="tk">
                  <i />
                </div>
                <b>–</b>
              </div>
              <div className="rw">
                <span>Redis</span>
                <div className="tk">
                  <i />
                </div>
                <b>–</b>
              </div>
              <div className="rw">
                <span>MongoDB</span>
                <div className="tk">
                  <i />
                </div>
                <b>–</b>
              </div>
              <div className="rw">
                <span>Render</span>
                <div className="tk">
                  <i />
                </div>
                <b>–</b>
              </div>
            </div>
            <pre className="ins">
              $ ready. Press Send request and watch the packet, the waterfall and the wire.
            </pre>
            <p className="say">Tip: send once, switch on Redis, send twice, then add the index.</p>
            <div className="meter">
              <span>
                Total time <b>0 ms</b>
              </span>
              <span className="code">idle</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
