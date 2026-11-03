import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useMotionTemplate,
  animate,
  useReducedMotion,
} from "framer-motion";
import { EASE } from "../utils/helpers";
import { Arrow, Reveal, Magnetic } from "./Common";

function Letter({ ch, i, mx, my, reduce }) {
  const ref = useRef(null);
  const c = useRef({ x: -9999, y: -9999, r: 300 });

  useEffect(() => {
    const m = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      c.current = {
        x: r.left + r.width / 2 + window.scrollX,
        y: r.top + r.height / 2 + window.scrollY,
        r: Math.max(r.height * 1.5, 220),
      };
    };
    m();
    window.addEventListener("resize", m);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(m);
    const t = setTimeout(m, 1600);
    return () => {
      window.removeEventListener("resize", m);
      clearTimeout(t);
    };
  }, []);

  const raw = useTransform([mx, my], ([x, y]) => {
    const dx = x - c.current.x,
      dy = (y - c.current.y) * 1.15;
    const t = Math.max(0, 1 - Math.hypot(dx, dy) / c.current.r);
    return 78 + 47 * t * t;
  });

  const w = useSpring(raw, { stiffness: 220, damping: 24, mass: 0.6 });
  const wg = useTransform(w, [78, 125], [700, 900]);
  const fvs = useMotionTemplate`"wdth" ${w}, "wght" ${wg}`;

  return (
    <span ref={ref} className="mask">
      <motion.span
        className="glyph"
        aria-hidden="true"
        initial={reduce ? false : { y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.15 + i * 0.055 }}
        style={{ fontVariationSettings: fvs }}
      >
        {ch}
      </motion.span>
    </span>
  );
}

function Name() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const box = useRef(null);

  useEffect(() => {
    if (reduce || !box.current) return;
    const r = box.current.getBoundingClientRect();
    const x0 = r.left + window.scrollX,
      x1 = x0 + r.width * 0.78;
    my.set(r.top + window.scrollY + r.height * 0.5);
    let ctl = animate(mx, [x0, x1, x0], { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1.4 });

    const onMove = (e) => {
      if (e.pointerType === "touch") return;
      if (ctl) {
        ctl.stop();
        ctl = null;
      }
      mx.set(e.pageX);
      my.set(e.pageY);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (ctl) ctl.stop();
    };
  }, [reduce, mx, my]);

  const lines = ["LELISA", "HAILU"];

  return (
    <h1 className="name" ref={box} aria-label="Lelisa Hailu">
      {lines.map((ln, li) => (
        <span className="name-line" key={ln}>
          {[...ln].map((ch, i) => (
            <Letter key={i} ch={ch} i={i + li * 6} mx={mx} my={my} reduce={reduce} />
          ))}
        </span>
      ))}
    </h1>
  );
}

function Portrait() {
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 18 });
  const sry = useSpring(ry, { stiffness: 150, damping: 18 });
  const [hov, setHov] = useState(false);

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14);
  };

  const reset = () => {
    rx.set(0);
    ry.set(0);
    setHov(false);
  };

  return (
    <motion.figure
      className={"portrait" + (hov ? " hov" : "")}
      onPointerMove={onMove}
      onPointerEnter={() => setHov(true)}
      onPointerLeave={reset}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
      animate={{ clipPath: "inset(0 0 0% 0)" }}
      transition={{ duration: 1.1, ease: EASE, delay: 0.5 }}
    >
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBAUEBAYFBQUGBgYHCQ4JCQgICRINDQoOFRIWFhUSFBQXGiEcFxgfGRQUHScdHyIjJSUlFhwpLCgkKyEkJST/2wBDAQYGBgkICREJCREkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCT/wAARCAIIAcEDASIAAhEBAxEB/8QAHQAAAgIDAQEBAAAAAAAAAAAAAAECBAMFBgcICf/EAEIQAAEEAQMCBQIEBAUCBQMFAQEAAgMRBBIhMQVBBhMiUWEHcRQygZEIQqGxFSNSwdEk8BYzYnLhNEPxJVNjgpKi/8QAGwEAAgMBAQEAAAAAAAAAAAAAAAECAwQFBgf/xAAtEQACAgICAQIFAwUBAQAAAAAAAQIRAyEEMRIFQQYTIjJRQmFxFCMzobGB4f/aAAwDAQACEQMRAD8A+kOfdMgpEoP3XNNIwb9tkJdvlMhIBnZHCX60jnYJgMeyCK7IbwnXygAACYG26COUAXwmAULRWyOOeUd9zSAGKO1JEUKUqFI9iUARFVdKXHCf2RSAAC00JjjdADBrZB4QOEIAVpoI3THKBALTq0VSACgBUji91KkV9kCIqKnSVKDEJJOkFMYqSTSQAkJpVupAJJSSQFCRVplJAgISKaSAAIQkUDHaSE0AJCEIAErQnSYCKRUiEqSEANhStQbsFK1JDHdhCXZOt0yKBPskgHZIkFITQgDFf2QaJQdxXZOtlWSD5TSHOydpoBEbI5o0nSX70mAKQ4Ue3CkBQ9kgGd0IQBRTAaYH6peyYGyAEeUwbT7cIDUAA2BCK9wjZMcoABsmKGyEwNkAPhKuykAEV8IAAPhSDd7UHObGNTjQVXM6z0/p7NWTmQQirt8gb/dAi7SKXn3Xfrd4P6NqjPVYZZWkhzYzqqvsuD65/FN0+G29H6a+d9Ded2gf05Vkccn0Qc0j30kDc0i9l8mdW/ia8VZUjvwzcLFaR6Q1pcR+6y4X8R3iYYLvxBx3v/L5gBa4bdgrFgmR+aj6tJHuhfM+H/EdnRkNy8PSbBOlxcGt/wByV3fhz+IboXVsyLGkxcjGD6aZJDsCTXChLDJewlli+j1whIhVYes4E8LZWZUOl3/rCtRubIwPbweFU0ywiUbKZCiWpDI8JFSpJMBIQhACKRKZSQIKQmooAOEk0IGLhFpoQAkFFIJTEmHCLQhAWCSfZJFCCk0UnwmOxJ2klYSsCXKOEgpFMYWhL9EIAxi0DlP7/e0A/AVaJDoXaLpAHakjSkAXq44TQ4CqRXz+yAHtsmBXCiP6KQ2PCAH+qK3TDdrKL+UAKq/RMfKO+yBugB0gD34Sr3T7d0AS7cIAHKOEboAfPZMD/v2TAT43JR/AAAtH4t8Z9I8GdNfn9Wy44I2g00n1PPsB7rWfUf6j9M+n3QpM7Lkb+JfbMeD+aR1bbey+N/Fni3qHjHq+R1bqmQ+V8z7ZHrOhjezWjtStx43LsrnKkeseO/4lcjqbZcPoeGcdgsMyDKTqsc0AKpeLZ/XM3qOQ6fN6jPmSybuklcX378rTSZMT3ODHEHsCNwoOil0uEbqPc9lsx4oxM7k2W5J2awS66B3HJPyoNkErSNQ2u9q27LDTw0tlaCO7g3hWWSwGIhsd0RuRsQrlRWRkfHKDUh1geyxwyua1znCRg2o7mysrX44d5h0DUKqvyq02OF8D36mFjPUbTDsy4sksmI8Thrgfy0N/3UnzZkLSccatAAa4Ag/crVynILCMctEbHcgmnK/g+YQ7SS57uWh35gmFG36b1PqkEYmkyMtxZyxspIv7XwF6J4L+ufVPDWXEMrJmzOnuFOjnlJLP/bZNBeXMkkxnl0kbo2mwRfYo9Mm1OLr1Xppun/dVyxxlphbXR9r+C/qT0bxmz/o5Q14aDpcaJP6rrDR3C+D8HrGT0fLbkYeVNG9hD2kuIaf2X0N9JfrY3rMh6V158cEjRUUl/m+/ssmbjOG4luPNeme0kdlA7KbXNkaHNIIO9hBCymhOzGUII3QgYkVYTQgBKJTQQhAJJNCABBRwjlAhXskmnaYqEn2StF2nQAhHZIjZACvdNKlIcIAKsJAUnSaVEgCaiDupJpCFRQnaEUBiB2UgNu6O6LrZVkwRX6osA+6O+6YASAQP7o355QN+yaYg53Tqj90vlS4FoGH7p2ErNo5NoAZ3QLr/AIQNk+UAMVSD97SCYvc+6AH+qkAohZBwhAGw3JC8o+tX1jw/A3Tn4HTsmF/WZACxunX5Q/1EcfYFbD6z/UvD8CeH5WR5kcfVJonPxoq1E1/bfa18S9a69mdZzcjLy5XT5Mry6SRxvWb/ALeythC9iLviHxZ1XxJ1B+f1TOkzMhwrXIeBfYDj7LRS5sjX+kmlPG6dm5oDocd7+2w2V3F8I9Ty5Qx2M9tkAE9rVzlGOxRxSl0jVOyNUusCnEKxi5clCNzyASbrk2u36b9LZC8HJn9FbgcrdQ/SrCMrCQaJuy/t7bKP9VFbLlwcj9jztzJAASXOieLFn8qz43Tpp/M8gOLNuCvf+heEel42E2B+DGWNFBrwHD+q3uN4a6VjHXF0/Gb6SRUY/RRfN/YsXpnu2fN8PhTLyXUxrpNItxA3H6K9H0WeF3ksZIwltGQj8o/svolvQ8SVwDYWDuTwSVcZ0LCcwf8ATw12aW2HfdTXLsH6el7nzQ/oOZACx0Mrw/dknlmq7rDBgdT6e9s34c6APQXN2C+psfoGLHE0Nga8No05vzwFc/wDByQ4HGiIrhzR/wAKUeQ32UPg/ufKmQz8Y15eCHubtoFAH/dU8ZzmFjS8vfHuTdg12+F9J9a+kHROqSunjjfBLd+g02/svO/qB9Gc/Ajj6n0lhnERPmwt5cOzh/wr45V7lEuLJdHnGWCRQLrdvTSa+yyY/U5sXJiE0j9zw2x/VVurYsmLO5kjCZGEFuxBP6KfSp4OoY8mPmPLZhw5ove+FcpKRilFrs+h/pZ9XMrHlxsDq8zJMRwLWvcfW3237r3uHIiyY2yRPDmuFghfBeBmT4bBFC/U9riWjinDhfQP0T+ouRM2PpHUHySSSSVGR6v0KxcjBX1I0Y8v6T3QhRUzwokLGaCKaEIGImlFSIUaQAFCaSYgIQEIQKgSTSpAAhCFMQIpCEqGFbphCL3RQAhLlNIBfomNkFK00DJX8IUbQmIjweyaXbgp7KotACu1pAUUzf2tA+1oAYCEJj7JgFXsmgbhOt0CFx7oG57opNp23QMYHwi96QOwTCACkwN+UrPspAVugCX6Lhfqx9T8H6bdCdlSN87LlDhjwgganDuT7Ltsh3lQueTQaLJXwz9d/HUni7xM8Nc5sGOTGyMmwCCRfzYU8cbkJujj/E/jDrXjvrr+o9SyH5OVOQ1vswdmt9gF1/hr6eRwRDL6k23HfQ66aO90qf068NN0O6rlREO/+1Yvb3pehmQSO0xk6K0EE0o5cu/GJr4+GlbKeP0bDaGNijDWMPoGnYfK2WNixR1bbqgAD7LCMlzXABwLaqgVfwXaKAG1+oBY5Ns6cIJGaOEMaS1rW33u1axYy2S6rbcex+FlgazUQ8UK4V7FhZGC1kYDe1FVov8AGtlnGk0jkH49lZi1PBGs1v8A/hKCBjxZYdPzzaswRNj35APCsTI0TgjLAAW0TwfdbWGMOAaWgn4VWNnmC6oH8tLZYtNIBCviU5NGSODgEEkrOxhDeDqPKzBjAA4WCh2zaBBK0RMkmQY++QVKdjZoiwgO+/CxvtpsnY7KTL/KVJMg2eS/VrwRjvwX50MWia9RDG7OP3914nm9Ey8KOPLhhBhLiHOadwV9deIMCLJ6VKXtJDGl1L5z6y+Fma6F5eMd5Ohjthd7rThk7OdyMXucoJDE6F/nNY8A+p54K7H6W9exui+MMDImcHNDvU9pN77BcrP02DLcSyVrS0kEN7ha05DundQglh9Y43G92tUqao58k47Z+gWJkx5mOyWNwc1zQ5ZCOy89+ivX8jxF4YjyMl7TIxrWFoO7QPcL0M8rkSjTN8XaIJUpEJVaEiQkjynSRCiAjsUk+eEkxAikJoFYjsi06SIUkINqST42QAmADhAQhADtLYoq0VSAFwmUISaGIoTISTQg2QhCAI373umUUR8p2qy0Qs7oJKP3TB3SAKHCY3q9kiNtkwmIbaukyki9/lABtyndJFO7QABS+N0hwmDRpADr4Ux7dlDlTQM5/wAe9SZ0nwj1bNke5jYcZ7rHbZfnwYndT6i2Nll0r6Ju735JX3p9ZMhmL9NuvSTAmE4rmvogGjtyfkhfD3hDHDur6x/9phI+6nF+KbJY4eUj03AiZi4kcEWwawNFfASnnLO4Breiqv4otYC19GqpopYiXucWt1uG4v3pYtu2dqEFSNljSse4eo+k3twVvsU6I2kXz3XL4TJI37j/AP6tbrDc8EWTp91VI1Rro6XHLnV6fz2N+y2OLjgEayeBstLilzt7u6+wW8xnFwaXWaH6BEWDNvFF5bLFbjhZGgMeQ0KqyRoYLsrNjyGaQUCQO3sFJPZBm1xIzpG2479lsImaSNgVrsTUdg8geytN9D/zWT89lqgZpl7zhpABr4Q4g73Q/qqrSAbNrIPWO5r35WhGZok8j70ssThzRCxAAOOsbjgLK0ULH2UkRaHkDzYHAgltHb3XjvXOjQyzZglxGPiDnFrnVbPtfC9mI1Mr7rgeuYTWyZj9DKkfpNtugpw+komrPEet9GxcAtfjwvY8EO1B50j9/darqOnUx72gu1agK5XpvjLpOPIMeLH8u3Mo7AmwfcfdcN1TpBhje+UDSHVbhpIv47rRGV6Odmg7PXv4X+uySP6l0+am2A9nHY8L6CcF8ufQXLGH42gw2BjxKx+p7a7UvqU9lkzKmGHoh3SKZG6FXReRpJSUVEBJEUpKJQIVJoQgQIQhSQgpCEkwGkmkQgAtOkggoAdJXSN0wgBWmgJXSAGhLV8IQAudkvsgbjff5TGyrLBDZF1yi9vuiqSAkPukNqRZB2Ur2tMQ+UD3R8lH2QMP+EwP1S57hMbfdAANuFIIb8o7IAfPdSCX2CY4QBxn1kxsvL+m3X4cSETvdiPuP3A3J/Sr/RfFXhGLy5ZXC9xer7L9Bp4GZMEkMjQ5kjSxzTwQRRC+F4+lDpOV1CEmnQ5csQ7aQ1xb/soTlSNXFVyLJzdJAc6ydgVcgmJdqaNQN/2Wke4vfQ/KDsVtcBpbpYLIJ5PIWbyo68Vo3uNjulpw06SB8FbLGxnUBp2B99lDp2G/QHBpLeNit/h4Rj4H7cqDdlsTHhxvO1CvlbnFOmMAEE9/hRxsVpAANureuxV5mLobpduSdtlEs0Y2zEOqlsMWRkbq7nclUjDUljkbq7iY7nVZ3Si3ZCSSL7pAKe2gfg8hZ4i54LqFex5WKKDVWqiCFcZ5UEZdRDW81utkWZshOKNxAJ4+yseU4AX2VzGiY+EPA2IvdZNLOAWglaE/cytoqeWCATQ91JrPSK7rP5TCDRv7KJbR4/dSTZAUenTR54Wn6j0qDI1GUFzbvT7lbl4Gn01+ipyEB9uujtRKlZBo4zqvRIsOTzYY7OwaTfpF7n7rz/xP0ssIkif5rnSanCvndezdQgMsD222zxe/9Fw3WumtJMT2BxAq2irNqUJOzHlhZg+gHR2SeMcjKdACYcd1OoDSSQvokil5X9EemNwsnrMhNudoAGmtI3XqpUMjtlEI0QPKSkQonhQsmIpEJlIoGJJOkcIoVkUJpISIghCFIAQi0IAEjwmonlNIBgIHKO6O6KAdoQhIBJkJcpoAVIT0/ZCAI7fohARyd7VZYFElK6PynZRSACjSkPZA3QCgB/e0coso+UAHdO7S9/dPcIAYoJjvsojsaUwgA+VIGuUud07+ECJL5Q+r/R4+k+MurQRRBrJJTkta3f8AP6if3JK+rxwvnD+IOAR+LXy7evHi5/UKM1aNPElUzyjGw9W477m10XTcePRcgFAVt7rhsvxK3Fe5kQ9Q2oqg7xbmEUJpGDn0lU/JvR0Xno9pw54cWAPsAHv7/otxj50RZpb6gDdDgfNr59f4u6lLTWzSb/zE91nwOudSMg8zKmJDuzyApLjNdsh/W10j6LxZQ+XYbHYUeVtceNkhu63peIdG8YZWPM1sk5LXbguNH916X0DxNBPHRlbrrjk2q5Y/E1wzKZ0jmf5tkDTxsszMiPHpznBrRytYOotyfUKPawNx91rep5uT6hFjvkHCiooc5HSTdfx4YnSNIOn+UmiVpJfqjg4Tj5mLI1rTTnbf9laRj3u9UjJxY9TXG/29lXyOgQ5epkp9Lxe3daIIy5HJ6R0zfrH0d8JDcwN2oANIcP35/RUWfVQB4c1xdG7jUQCR8e65UfTnAmczS+RvubXQdH8A9HxtLJGyZBG7SXV/Za4+NGVqRvsT6kNnkuFnpA31OrZdVgeKYcuMOIa5rm2HA7j9Fz8Hh7pcYGnDjjbxTRV/r3V7H6H02OTzI4GNcR/IdIAUXXsNJ+51cE0GS0hrg0+x5VXKg0m+aVSDAY0+ZAfLcODd0rhkug+jXJG1qNg1RXnGqEgA3Wy53qMLtfr3cTQ24XTTtGkuAsc8rnuovLC4gOseq/f3U49meZ1P0wxmxxdRl21OewH9AV2zl5R0bxzieDPCvnvidlZudlPjxcZpovLQAS49mg3urnT/AKpZEGbjw9bm6fDJkjUzHZbXAfqd1CT2Qjgm9pHpLgolEUrJ4mSxu1MeAQfcIdskypuhJFCEJEbElymRulwpCBRUkkAK0FFIpMQk0UhAAo72pIQMLSKOEICxoS7ppCsAi0UhAWG6EIRQWQo/opWogH/s8Jk0K4VZaL+ykKq1Hk0m3b2QA+fhG9jZB+d0wgBixyEboCLHzugTAJ9q7pWAjY90AMKagObUkASTA3+UuRSkECGF8q/xS9VdJ4vi6fB/JjRlxB7kk/2X1UOF8c/X/Pbn/UnqbmtNQ6Yhf/paAf6hJmnjL6rPJh02SbI0ymg7ly6HpfhbDndUjyB7N/5WkmzDjEkEF13Xus2B1DPyX1iskyHXuGcD7qyCZcztMbwX0tgLiTs3hzrJpVcroODEXeS1u1EUd1oIPGXWumz+XFHih8RLQJIg7e+98rqst3U87pGBmdQ8PdMyP8VimnxpMGURylsbtLyWA+/A5KvcbMrmkznpg3FLhq1ewPbdb3w11qfU3SQ3erN8fC4h07jK5jddA0GuP5fhdD4UbJNO2SnBtjvx9wsuZJHS431M968IvblMic5riHj1ahyfldw7ouNkwgOG3+kbBcP4NilZjR6GtLmtsCvzL0TGDpMdrwC3aiD2Kpxq0asumcn1rpMOJE50UYtq4frfU3dNjJeWkjcajRXqOa5hfpkHfuvPvE/hSLrHVHOGfjwirLJH0QB7e6tRVGvc4jI8Z5gaPLyRGwGwGtDnH7BV8T6r42JK78U3qeQBXDw0Ad+69I8I4XhfoWRkRF+Ecotr8RI9pddcAnj9F4Z4g6LldJ6/lQRjzdE5dHNE3U1w1W1zTweyvwpXsxclyV+J7P0f6jeDOo6IJ8vrXRsugNGUPTuAQbHbfvS6dmZPAbhkh6lhnds2O+i37tuj+hXN+D8rJ6/ms8ReLuhQ5+S7D8imQN15NbM1N4bQHK2uF4Y6d0x8mVgwz9LdO8u/CQyao23234+ysyxV0iHHcmvqOs6f1Brqo7FX3OaRd7rn4XkN/KRXcjlX8aRzhuSqEXyRsvzQv9wFz88TsnUAHirBve10MI11e4Oy1rItPUZWnVs26/VSuinxtnF9K8GuHXXZc7zPK52mNjiSGD49guW+tfT3YOXhZjfRkRyX5rTR/RewxyY4nMnmxAxmiS8ej+q5L6w+H4/FPhGafzg/Lwx540/zAcj9r/ZUSOlxlUlZ6Z9NOrf4t4RwpSbcxgb+i6k7rzb6AmV/gSB8ocDsBqFL0kqyJxeSqySoiUIQQpFAio/Kkkd0ARKE6S7JgJCAmUBQkIQgQItBSQA6RSEIAEIKSQDQi0JiYIQhFBRjaduSpgBR5F/upWqi4VDsjbk8cJj9vhMBAC3/ZOvuhFV3QADlGlFfCfFoAiBubUuCi9k+6BBdJ2jdMIAkDspNChXtspttAgLdVbkL4u+sM7c3x/157G6R+Lc3nf07H9LC+0idl8SeNic/wAR9UyNO8mVK8V7F5Nf1UZuqNnDjbZwsmCyUNu3WPbhdD4XyndFlL/JD2PHqDdiRvwsvTuhSZJBbpbe1HlbqLw3JCdQeQyt/TaFlro2vDZwfiDp4m6lNLi02GQl4BNEEnhZegOk6LlnNezVIGkMBcdIJ77GzXsu1y+klrTreCa9lpMjpZL9H5h89lYuQZ5cXZo3RuzJPNc2pC7d12XH3XZeEcFjJ4WkOtxJNLUwdPbE8RhrSCd3ey7Pwjg68yKi3SO5WbLktm/j4qZ7T4GxWsa2UsFuAC6+SBsbHBgoOcTS0/hWBjMVmk7Ab19v6LfuYeR7KeL7SGZ/Uc31LAMtkbEbiuVy3VvDr3NEoYXOo6tXcL0DIaBuVUnY1zC7kAEUVYV+R47n+GDPZadIGx1jko6b4RdG9r3xB7fYP/2IXoOdhQylxAcLN7DYKjHAWOptfBVbk10W+Hkg6biTY0emIGNhPF/0V5+I93s3vXdZMSUtNkAn2W0x3B1W1oPdSjk9ipYkjVR4hBH5v1ViLHdGe+ruts6MVwDaxGK96U0xSiKEllcX8rD1BgZ/nt5rRsrWjTpAG3dU+rzeXgSu1DU1pcLHdSKWq2cJ4m8ITdO6qOosc+WKcBxIPJIUvD/iDzOoswpHW14LHM59Nd13E2Rgf4BLkZU8bWiI0XGhdexXk3gXGys/rGT1jIaY8KEucx7hpBHuqJxflo34ppwdnuP0uxmYnhcRMFBkz2/1XXHhcp9NLd4c8wig+Vzh+q6tyvRwszubIpFNJMpFSSkoqQxe6EISQhEI5TStDASEHlCBAkeVIpVugTBCEUhjQUik0kAFIop9kBMBIUkICzEL/QIBAKd1vsg8WKVJaO+3KAkEwgB90t+EeyYHugAbdb8plCYFhACTQOUuUCJHb5CAUf3QL4QAwe6m0qFUm013QFE335bvsviTrwDuo5O/q81xd8b/ANV9t3YP2XxP4tx5MfrubA7SHMyJGm/hxVOb2Z0fT/uaL3RGtaaI4FElb+JpjbdbELQdHmcIASWitifdb4ZEfk6i4N27LOzrqJrs8NFl5eHXpIO9fK57LkDXaXex3C2PU8puouBFXV38UtC+cySxxMPqcQwfKuj0RlFfgsYYLshzmtNdj7LvfCMDm5ERA1Oc4foPdczBg/h4276nVz2tdr4M0Ol021pFVXO3Kqmtjj70eu+HBpha0EuA3BPdb4OYBZuvlarw9A2THD2uYPY2tpLHrBaDztstOJVExZWvKjX5ORj7gyCu6rFvpOktLaVkdHY+ySN/ndKbCOIzYktqtlYkQ0c5ngEkE03dUQ7YXpNd1c6y4YsvNj5Wkim9qAPb/lUZOzZiejasJuh37lbLCY4tBWvwXNfpsUCF0OJC0NGkd/ZKHZXkdE2DYKTYwebWYxkb1wo6g3sd1pKbK8oNkDau60PifNbi9Mmc8nYAbBbyYjfdebfUzPn04+LjybyytZ3235Uoq2ZpswYGH1HxL1aF0kTv8PgADWuOx+d+623jKOZmVh9EwwIoZGB0pYK9PsrXRcg4WKyKJrnsYNzW/wAraYWE/qfXMWd1ngAH90vcm8lI77wtgjp/QsWACqYD+62hKbWhjQ0bACqUU0cuW22CSaFIiIqKaRTECSaEgElSE0wI2hB2TG6QAhFJJgMIKAjugA4STKAgAQlynwEANCEIAwk0FIC91HSDzaYqwOFSWjv7p8JbBNAB32Tvi7QRt8pWgCVbboBSs7Jj9kCYfoEwN0vsmB/VABdlSrtaXdHHZAD7KFEfIU+Nt0D3QMTTS+Ufrb0V/Q/HXUaZpjzCMqM1y1xFj9HAr6xaN914/wDxEeHH53Q4OrxxapMIljnVxG6v7ED91XljcTXxMnjkR4R0SSmAWbaKo8LcyyVBZoA7bHj5XKYOU6KTSa1E9lvmZXmRAWs8I+Ss7XnRpuqSu8zSdlr4ZXQ5EUh30vBq1t83H8w6655ta84zWtdYr5VtUQlkH1HxHPjECKFsgdyNdUtr4P8AGQ/xBgLpIpdXDz/YrlcrGqfejtdp9Mx3SztAcdPYt2LflTpFMcj8j6x8O9YGVhsMW9VZvhVPFnirxN09jWeHekMzJHg/5s7y1jD243K818Ndb6n0nFYfPD2n0FzxvS7Ho3WsiYh34l76JsD/AIUo60Tkr2anH8VfVr8Q2bqXT+kwYQd62wudrI+LJ+/C9G6d1uXqnT/LkBc81qcO3yq0WcJgNYDmnixsrMEsYGlgDR7AK2vcosq9Xg84FpF0eSuZfDJBORWxHtwuyeGyt4Nj9lpM/DAkIbpJ53VUo2XQlSMPTpSHAE877LqsPIIa0udsuQx26H+gkUa5W6xptG93fI9klGiucrOj1teedysMrw3i7KoxZRcQC7cdlJ05kqzwpFb0RyJxHE+Q1p4K83623/GuvQxvbqiidYAPf/vddr1jNZj40gLhsOL5H2XBYhyn9bx/QZNTtRf2BU46M2Q9M6f9PuowRwzYebBJBK0OeycEOjPwRyF1/RfDkHSR5j3edOf5yNh9gth0wEdOxwefLH9lnOwTZinlk9EHcoCZ3SQisSEUkVIQikmhACKCjshMaFWyEXRRdoEwSQmgKEhCEDQ0k0IASaEIAEdkIQA6QkhAqMV2j7JWn+tKotE63AjdSabCVItICSaiL7lStABsCmok2eU77WgBjhMcpWpAX3QIOyOfdCAgCSZ4SpSamMQWo8X9JZ1roGZgyH0TRkHa/t/Vbhu/CU7Q6NwIG47pNWhp07PhHq2O/p/UZoX210TywtIqqNLNj9QHl71ttwt/9WunNxPF+fpaWh8rntsVzz/VcXFIWscLqzQ2/qqIKnR2Iz8opm2fmtjFPOo+/ZVfxXnhwa3k1sFqc2d4cCLNGrHHCI+rNjhY0U117nuVb4pkZZKNucHzKMj6Hta3/hnAwPxUeuZo32DuFybeoMIaXODvuFsOnZsUZo7c18/Kl4ixvy2epdR6W5+OxuHplLuzTVK94Q6bkdPzLzchsce/pa7krjvDHVAyYB0p0kcbm118OVjsn9RBsWN9ypKCNf6TvsfExpKEUwIHyrUfTn2DG8G+Vx+N1vDjc1hc7Xdc8BbKXqflt8yKciv9Llb4GOS2dG6GWCOzX6FaHqGQ9rtTwQK2IWi6j9V4uiMDeotc5rnaWljb3+610fjWLr7phi+Y3SfU2RlbfCi40NTrR1OHI2dwdVHjfbZXW+l+29+xWp8PxObBqOo2S7c3S2evUXeoiztq2Vchl+N5aKDwR/ZZvN0x6tlUa4AbUR8JyzBsR3b+qgEjU9XiORL5hkLT2bXZaT8VDi9Sx27mR50tC2+XM4249j37rRHHlf1TEedLnSPaNIHFqxGbL0fQnT//AKGD/wBg/sszt1jxGGPGiYeQwD+iyEpM5r7EeErQUuykhAoplFbqQC7IHCaXCABLvaaSY0IpUpJIBkaKaKRSBAgITQNAhHZFIGJNFIQKgQikIsYIQhKwK+olS291C0xuqywl7jlMFGyEAPsN/wBEz9kt7CZFlIQvb7qQQO/KabABafCE6pIQco45R8IpAEr2TBUd1JuyAQ28qRFghRB3UgbTGfO/8SHh3yMvC6rGxwbI3y3OA2Lrvf8AReAD89Ail9k/Wnw+/rvgnMZGzW+Gp2gcgt9l8cSOqbSWhpN0DyPuqZ6Z0+NLyhRimA/I/c3ytZL00yEgamnnlbZzS5o/0j45TfH/AJYeBq37jlTjKic4NvRg6V0eJ+kTukIPG53XpfQfpp0TqWOxzZJYyf5fMNrz8ODaMRa0jexX9l23hfq+RFE3TIS6629vsrE7J4I0jtsX6UYeDjEx5+VHp3HBB+N1ZxfBUAkH/WSzOZt6uyjD4pnGMIANQoA73Su9PyJ30QBR7XurEbLVGyxPp70iV3nZmt7htYeQrcnh/pOHEY4YdqIGp7nH+6Ip8h7aeQB7l25ViPSRb3F4VilRiydnMZvgzA6tliTJgDmM3ay6AP2VtnhrHxT/ANPE1vYgd10kUIfVANarTII/LLqCqm72Vo1OHD+Gi0AUpFzWguP2oq7PGGfrxYWtyowQ1rXC791WyxGaGc2SGg12Rkz+a4tqgqcsphZob/N3WNsxDKujfukhSI5r/IDg0FxO6wdNxjldVxNbiHOnb6QeE5y5/wAWaHup+Bic3xdHWpzI3Wf0U6oyZfc9zA0gAdkFJpsIO6TRgEl2TpLsmgApWhLumJjKSfZBRYhJEFMIRYxJKSXCYCQhCEAIQikxgjhMJFABaCUISSG2FoSTTECEITAqgnhS+yiNypDhUlhI32SB+6bUwN0AMco4O6Lop1ZQIYpNIbBOtkMAvdSCjypAd0gD7ItNCBCTR3TQMkOEwkNwmOUCMeZjsycWSKQAte0ggr4u+rHguTwl4yycdsZ8iUedA6vzNN2B9ivtZw1Cl419ffBb/EHRf8Rjj1ZOAC9pAB1M/mCjNWaOPl8ZHzKQ3yhsBXJtMNEjAQSb9ysMuSxpdHYNE1SljuErRV7KCT7OlHJFugbhG3O4Ndltej4eQCJGuIIPNowwwva00aFgnsuh6Zjte8NaAfehsndE/G+ieLg5GSWlskrS41VnddLg+HuoQsbIzOn2FVa2XRenRHSxoAA3LqGy7LCw4hHpa0AUpxmT2kaLpeFkuIdK/V6vddJi4TIhduJ5FnZWIenCJthpJtWI4fWbaT91YmUvZjAAAAHPdWfK0s991AxgHbau1JeYWiyCdrTZCzFPYB7UtbIDZNb+6vTThxPYgLW5E1b32UaJJlLJcSQ0gm9gFWnLWkaBt370seZkBpLi6h8cqmcpoa5xdd0djSFEjJmWbKa0H1G+L4pdH9KsVo645+7iQ9xdX2XD5NZDraXaburXpf0ogBzZZQ0hoi2v7qbsx53o9OGwUbUiElAw2LgJFNIiipVQWIpJ1uilFkkCEUhCYNCpFppKRESLTSpACQpUl8pgJNCE0MEimUqRYAhFIQAIQEFAAhCEAViN1Ju5URundKosJbWFLsoD7KV8IAl2TURupCq3KBD2/dPv7KPCfHukDJWEfokPZMkjdArH3Scne1o57/ogBCwmNkk+6BkhumEh90wUCJDcbLBmYOPnQmOeJsjTsQ4X/RZgpEpjPh/67eE4fBvi1wxSG42SDI2NuzYyTuAL42v4ulxfS81mgWSfj3X0F/FF4DzOo4w69iMhfHjhzp9T9LmsA5bfPewvmPHyH40ul/8AXZWKNqi6GRppncYUrQ8NJsf7rruiOYZGnURvZXlmP1cOla4cDcEHhdj0PrDfNafMAvbnlZpxrR1ceW0eudIymtoat+4C67pk0YI1mtqq15Vi9WEDWOc8Ad6910vS/EsTxevTVBoPce6SVFj2j1SHy3Cr4GxWOVzWSWG7DkLmen+ILZV3R9+Fb/x6NztnAX8q5Mpo20kwIFBp33IKpZOS2O+1DhavL65HHZc5pABOx/4XJT+LH5TidWlnAFeoG1LsrejrHZGq3A3e93wqGRlAGiQAe652fxXiYkemScanbAXutJkeKxkuIha949x3TjHYJnR5smtxDj6fhamTPia/y2PB977LVg9W6gNLQ6OK9z3Ww6Z0qVkge827kWFbRCbL+Ax8zmEUGDcWF6p9NJo8fqD8cinSxnT81yuAxMVsQHv7roOj556V1DDywTTZQHf+08oaoyZOj2YhKk2ua4AtNgiwUFVe5kojSRUikgBFJNFJNEkJJOkUhAKkqUkt0yIkJ0hACS4UihAEbQmkmAUikcJ8oASOUIpMYk0ISYCpCLQjYioCHff3Uu9dlEDagAEwaKqLSQNmr2UgFEKVboQD47p2flIfKbf3TAYPa1IbfKiEwkJkhsml/si7QIaPm0WjfhAx/Ke6Q3QgBg9lKqUQVJMABsqQKQ2Tv90diZq+v+HsPxJ0+bBzmCSGUFrmOGxsV/ZfNPjz+FSbpsM2V4dzZchgF/h5hbySeGuFDv3X1WbT02Nx+isTa6Efmp13oXUvDHVsnpnUIZIMrHdoexwojax/RZOndZmw32b2or33+Krw9FieMen9Xexjm52LodtyYzW/vs4LwjquFHFIwxNbpcOB2T8vLTRqxpqNpnQReMmzNB1PsCqpbLD8ZRRsLXlwofoFxHT8X8RI1gPddfg9HibG1kjG0OXV2ScEbccnVM2MP1Kla8shDnbcgWVjd49zpLdG97RvVd1b6f0Hpz6DoY3kmrI/qt1hdEwGBunFi2Jo1wknQSi2aBnXOvdWa7TrEIr82xKvQY2YY2sllc2weF07sVvodTC42CQOfZVpowCGgeruD2VjZFQZo4Olt1anO1O7WbW/6f0qhbmcjcqWNjNO9WR78FbfGiqt7PJHwo3ssUXRnxMQMbQHoAtXocVjTtZq9/ilOAB1ChX22IVsMbGObU2yLgPHhHorY8j42U+oNIxm0NtYv+ylE0lgsXe1J9TYRigB3HZQsz5Inqfgjq3+L+HsaRxHmxDynj5H/wALfcryP6Z+IB0/q7sKZ1Q5W1ns/t/uvXSoPsw5FTI90EJkKKVioVJoQiwFSKUq2RSYEaSIU6SpBEjSOFIhKkJgLlIhSpFKXYEaSUqRSKAigJ0kQigBBGyaE7GLhCZ90AIAVITo+6EAUrFboBFqJHazaTbujsPlUlhksElS7qA37WpNIuu6EBPvaYIKjadJgSB+EwBSQaFKrSIsfwiq90qTCBod7IR+qEAF3shHdM8oAdpjdIcpjlAEgmNkhsnSkugGOVJRHKYRYmeE/wAWXTfN8OdG6k1tnHyZIS72D2g/3YvmDMlbk4dbgtN0vtH+IDpbuqfSzq+hhe/F0ZQbV/lcL/oSf0XxLLZLw5vA4PZFtSNeDcCfRJ2tyGh7bAPtuu4xHl7G1s33HYrzbFf5U5/Nv7Lt+hZcohDfLDiNrPt7qxyNMVs6fBIc4uH2Gy3MP+W+iBVLV9Pa3TTtPF7bErZtc1jtVl23dV2bIJGZzzp2fQ9ysQBJ9btVHlV8h5eDRq+yywOZ6nP5dwk5kvFF+LTpAAokrawMDC0uA+61uMQ8WBt7rZYoa9wJsEe/dJSE4m0xGlwJIcKPJCvsi1Dt9yq0A0u+Pk7LYNZqaDsVYmVyQ4mgGvSdvusHUDcLtJAPdW2M2NMGyrdRPlRElu29iv62otmaUbZzLc0YuS935Q0c3vfuvQfC/wBbulS44xeqvkfkNl8pkkMdhzQOXG6v7L5/8cddkkZLDiyvia627bOd9q7LS9Cj6pgwtyWl+j0ucRu4N+PdWQimdfgeix5X+TR90YeXBn47MjGlbLFINTXNNghZSF8+fTj6wYPQmnHy/Mmjnd+VppzXdzR24XufSvEPTOs40E+HlRvEzdTWFwDvsR7oeP8ABx/UvSs3DyNNNx9mXqRSyUkWqLjRy7I0ilKkUihWRQnSEhEaRSklSdARSU6SpNARQikUmAJFBKEBYqTpNCAIoTpHZAMEJUhAFAG+2yde+yiBe1qY2q1nSLQA4U69gog3e9WmAbs8qQEgUzslV99k6KAGFNovcqIUqQJjN8JV90/sjlAIV/dS4RXwmEAHPwghP91GtkxjB3I9lIJAUa5TCBEgNk0D7ppgATHCKR9kCKPXumM6z0TqHTJG6mZeNJAR7hzSP91+e/UsOTCyp8d16opHMP6Ej/Zfouvhz649CHhv6k9bxGRlsU0xyovbTIA6vsC4j9EfuaeM9tHnuMypN2jf37rp+kg0NnNI+eVzTPXK0DY82ur6Q5rGlh3KizdBe6OowCQA5pNkfzLZySNYwEuBcO3wtZgygRji+9q1JOC0gUTXfso+VGqDBzvUD2PZW4yywbB4oDstZqIdpG5V1kgaQ5wtzQodlqNzE8OG11uDYpbPFl2G42Hb3XPwZLiL243WywJA8BxF770U6oJI6PEms8HaiPutvECW0SST2WgxAHHWCBp4IK2DcpzWuDR7WSVJMqlE2TXaGg7gHY2uF8b+KGOE2DivcNBAmeBwa/KCsninxmOmQuxYZQcyT8ukWGD/AFH/AI+VwUGUIJ/PyAJXCyGuN882PdOTNfC4Dm1KSK0OE3Ln/EZL/S02Gg2a7qxndYZBH+GxdIbRA9wCEszq4nlcxuHreT/5hbpr9tlPA6DDlHznTEsvdo2s+ythL8nseLx1jpmuwOnzdRzGCIiEgg+YQfSffZet9LzPwMcYkmlfK0A+bdEnuTXuudbNFi434d0cbAG2GxtpavMzzjRl2l0l877n2Vika8mOOVUz3jwn9SxAHYfVDLKxn5JCLfp+38wXoXT+rYPVY/MwsuKcdw124+45C+PcXr+S3/NnYW6AaJdwPtV/rav431CzI5ycR7nTM3bLGDf22UvFS0eU5/wvjzScsL8X/o+v0Uvn7pint3T"
        alt="Portrait of Lelisa Hailu"
        width="449"
        height="520"
      />
      <div className="tint"></div>
      <figcaption>
        <span>Lelisa Hailu</span>
        <span>Addis Ababa</span>
      </figcaption>
    </motion.figure>
  );
}

function GridBg() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 140]);
  return <motion.div className="gridbg" style={{ y }} aria-hidden="true" />;
}

export default function Hero({ go }) {
  return (
    <section id="top" className="hero">
      <GridBg />
      <div className="eyebrow mono">
        <span>Full Stack Engineer · MERN · Next.js · Go</span>
        <span>Addis Ababa, Ethiopia · 9.03° N 38.74° E</span>
      </div>

      <div className="hero-grid">
        <div className="name-col">
          <Name />
          <Reveal as="p" className="hero-copy" delay={0.9}>
            I build real products end to end: real-time systems, solid REST APIs and platforms people actually use,
            mainly with the MERN stack, Next.js and Go.
          </Reveal>

          <Reveal className="hero-actions" delay={1.05}>
            <Magnetic>
              <button className="btn solid" onClick={() => go("work")} data-cursor="Go">
                See the work <Arrow />
              </button>
            </Magnetic>
            <Magnetic>
              <button className="btn" onClick={() => go("contact")}>
                Get in touch
              </button>
            </Magnetic>
          </Reveal>

          <Reveal as="ul" className="chips" delay={1.2}>
            <li className="chip">
              <b>Technical Lead</b> · GDG AASTU
            </li>
            <li className="chip">
              <b>Back End Intern</b> · Gebeta Maps
            </li>
            <li className="chip">
              <b>BSc Software Eng.</b> · AASTU, May 2028
            </li>
          </Reveal>
        </div>

        <Portrait />
      </div>

      <div className="scrollhint mono">
        <i></i>Scroll
      </div>
    </section>
  );
}
