import { useEffect, useRef } from "react";
import portrait from "../assets/portrait.jpg";

export default function AboutSection() {
  const orbRef = useRef(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return undefined;

    const onMove = (event) => {
      const rect = orb.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      orb.style.setProperty("--py", `${x * 18}deg`);
      orb.style.setProperty("--px", `${-y * 18}deg`);
    };
    const onLeave = () => {
      orb.style.removeProperty("--py");
      orb.style.removeProperty("--px");
    };

    orb.addEventListener("pointermove", onMove);
    orb.addEventListener("pointerleave", onLeave);
    return () => {
      orb.removeEventListener("pointermove", onMove);
      orb.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section id="about">
      <div className="wrap ab">
        <div className="orb" ref={orbRef}>
          <div className="rg2" />
          <div className="pho">
            <img
              src={portrait}
              alt="Portrait of Lelisa Hailu"
              width="560"
              height="560"
            />
          </div>
          <div className="od" style={{ "--t": "22s", "--d": "0s" }}>
          
          </div>
          <div className="od" style={{ "--t": "22s", "--d": "-7.3s", "--i": "-6%" }}>
           
          </div>
          <div className="od" style={{ "--t": "22s", "--d": "-14.6s" }}>
           
          </div>
        </div>
        <div className="abt">
          <h2>Hi, I’m Lelisa.</h2>
          <p>
            I’m a full stack engineer who enjoys building real products end to end. I work mainly
            with the MERN stack, Next.js and Go on the backend, and I care about clean system
            design, good collaboration and code that lasts.
          </p>
          <div className="fx">
            <span>
              <b>Addis Ababa</b>, Ethiopia
            </span>
            <span>
              <b>Go</b> at Gebeta Maps
            </span>
            <span>
              <b>Tech Lead</b> at GDG AASTU
            </span>
            <span>English · Amharic · Afan Oromo</span>
          </div>
        </div>
      </div>
    </section>
  );
}
