import { useId, useState } from "react";

export default function Certifications({ items }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  if (!items?.length) return null;

  return (
    <section className="pd-certs" aria-labelledby="certs-title">
      <div className="pd-certs-head">
        <div>
          <p className="pd-kicker">Credentials</p>
          <h2 id="certs-title">Certifications</h2>
        </div>
        <span className="pd-certs-count">{items.length} earned</span>
      </div>

      <button
        type="button"
        className="pd-certs-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{open ? "Hide certifications" : `Show all ${items.length} certifications`}</span>
        <span className="pd-certs-chev" aria-hidden="true">
          {open ? "−" : "+"}
        </span>
      </button>

      <div id={panelId} className="pd-certs-panel" hidden={!open}>
        <ul className="pd-certs-grid">
          {items.map((cert) => (
            <li className="pd-cert" key={`${cert.issuer}-${cert.title}`}>
              <span className="pd-cert-issuer">{cert.issuer}</span>
              <b>{cert.title}</b>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
