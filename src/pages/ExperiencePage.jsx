export default function ExperiencePage({ navigate }) {
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
          <span className="pg-count">Experience · 04 roles</span>
        </div>

        <p className="pd-kicker">Experience</p>
        <h1>Shipping while leading.</h1>
        <p className="lead">
          Production work across navigation, retail and HR products — plus a developer community I
          help run. Every role added something different to how I build.
        </p>

        <div className="two" style={{ marginTop: 38 }}>
          <div className="tl">
            <div className="job">
              <h3>Technical Lead, GDG AASTU</h3>
              <div className="m">Oct 2026 – present</div>
              <p>
                Leading technical initiatives, mentoring members and running developer events and
                workshops for the Google Developer Group chapter at AASTU.
              </p>
            </div>
            <div className="job">
              <h3>Back End Developer Intern, Gebeta Maps</h3>
              <div className="m">Jun 2026 – present · Remote · Addis Ababa</div>
              <p>
                Writing and maintaining Go backend services for an Ethiopia-focused navigation app.
                Handling real-time traffic data, routing and location features that users rely on
                daily, and keeping APIs stable under production mapping traffic.
              </p>
            </div>
            <div className="job">
              <h3>Full Stack Engineer Intern, SWENETIX Tech</h3>
              <div className="m">Aug 2026 – Oct 2026 · On-site · Addis Ababa</div>
              <p>
                Designed and built a complete Restaurant Management System for in-house café orders.
                Started from UI/UX sketches and took it to a working product the team could use,
                owning features across the MERN stack in production.
              </p>
            </div>
            <div className="job">
              <h3>Full Stack Developer Intern, Prodigy InfoTech</h3>
              <div className="m">Earlier</div>
              <p>
                Built GreatTeam EMS, an employee management dashboard with role-based access,
                attendance tracking and solid CRUD flows. Wrote the backend APIs and structured the
                UI so the system could grow. Stack: React, Node.js, Express, MongoDB, Socket.io.
              </p>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 24, marginBottom: 16 }}>Recognition</h3>
            <ul className="ach">
              <li>
                <b>1st place</b>GDG AASTU Tech Fest 2026, 97.5% score
              </li>
              <li>
                <b>4th of 79</b>STARK Official Hackathon, top 5 finalist
              </li>
              <li>
                <b>ALX Certificate</b>Appreciation for peer mentoring and helping create a welcoming
                learning space
              </li>
            </ul>
            <h3 style={{ fontSize: 24, margin: "36px 0 16px" }}>What this adds up to</h3>
            <ul className="pd-list">
              <li>Production habits: tests, review and deploys that people can depend on.</li>
              <li>Comfort owning a product from sketch through architecture to release.</li>
              <li>Community leadership — mentoring and making technical events useful.</li>
            </ul>
            <div className="cta" style={{ marginTop: 28 }}>
              <a className="btn" href="/projects" onClick={follow("/projects")}>
                See the work
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
