export default function AboutPage({ navigate }) {
  const follow = (to) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <main className="projects-page">
      <div className="wrap">
        <div className="pg-top">
          <a className="back" href="/" onClick={follow("/")}>
            ← Back home
          </a>
          <span className="pg-count">Profile · 01</span>
        </div>

        <p className="pd-kicker">About</p>
        <h1>Built end to end, still learning.</h1>
        <p className="lead">
          I’m a Full Stack Engineer building production systems and actively moving into AI/ML. I
          work with the MERN stack, Next.js and Go, and I’ve shipped real-time platforms people use
          daily. I care about clean systems, problem-solving and growing into applied AI work.
        </p>

        <div className="pd-body">
          <section aria-labelledby="about-focus">
            <h2 id="about-focus">What I bring</h2>
            <div className="pd-features">
              <div className="pd-feature">
                <b>Full-stack delivery</b>
                From the first interface sketch to the API and the production deploy — I own the
                whole path, not just one layer.
              </div>
              <div className="pd-feature">
                <b>Real-time systems</b>
                Live bidding, traffic data and location features with Socket.io and Go services that
                stay stable under load.
              </div>
              <div className="pd-feature">
                <b>AI foundations</b>
                ALX data literacy and the Coursera ML track, applied in live products like CV
                Studio’s job-match and ATS analysis.
              </div>
            </div>
          </section>

          <section aria-labelledby="about-background">
            <h2 id="about-background">Background</h2>
            <div className="pd-two">
              <div>
                <h3 style={{ fontSize: 24, marginBottom: 16 }}>Education</h3>
                <ul className="pd-list">
                  <li>
                    <b>BSc Software Engineering</b> — Addis Ababa Science and Technology University
                    (AASTU), expected May 2028
                  </li>
                  <li>
                    <b>ALX Africa</b> — Professional Frontend Development &amp; Training
                  </li>
                  <li>
                    <b>ALX</b> — Introduction to AI and Data Literacy
                  </li>
                  <li>
                    <b>Coursera</b> — Machine Learning
                  </li>
                </ul>
                <h3 style={{ fontSize: 24, margin: "36px 0 16px" }}>Languages</h3>
                <div className="sk2">
                  <div>
                    <span>English</span>Fluent
                  </div>
                  <div>
                    <span>Amharic</span>Native
                  </div>
                  <div>
                    <span>Afan Oromo</span>Native
                  </div>
                </div>
              </div>
              <div>
                <h3 style={{ fontSize: 24, marginBottom: 16 }}>Toolbox</h3>
                <div className="sk2">
                  <div>
                    <span>Languages</span>JavaScript, TypeScript, Go, C++, Python
                  </div>
                  <div>
                    <span>Frontend</span>React, Next.js, Redux, Tailwind, shadcn/ui
                  </div>
                  <div>
                    <span>Backend</span>Node.js, Express, Go, Socket.io, REST
                  </div>
                  <div>
                    <span>Data</span>MongoDB, PostgreSQL, MySQL, Redis
                  </div>
                  <div>
                    <span>Tools</span>Git, Postman, Figma
                  </div>
                  <div>
                    <span>Deploy</span>Vercel, Render, EthioDeploy
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section aria-label="Next steps">
            <div className="cta">
              <a className="btn p" href="/projects" onClick={follow("/projects")}>
                See the work <span className="ar" aria-hidden="true">→</span>
              </a>
              <a className="btn" href="/#contact" onClick={follow("/#contact")}>
                Get in touch
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
