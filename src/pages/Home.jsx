import DesignProcess from "../components/DesignProcess";
import { PROJECTS } from "../data/projects";

function ProjectCard({ project, big, navigate }) {
  const follow = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(`/projects/${project.id}`);
  };

  const body = (
    <>
      <h3>{project.name}</h3>
      <p>{project.cardSummary}</p>
      <div className="tags">
        {project.cardTags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
      {project.url && (
        <a
          className="l"
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          Visit {project.urlText}
        </a>
      )}
    </>
  );

  return (
    <article className={`card${big ? " big" : ""} clickable`}>
      <a
        className="card-link"
        href={`/projects/${project.id}`}
        onClick={follow}
        aria-label={`Open the ${project.name} project page`}
      >
        <span className="sr-only">Open the {project.name} project page</span>
      </a>
      {big ? (
        <>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>{body}</div>
          <div className="arch" aria-label="Architecture">
            {project.cardArchitecture.map(([label, value]) => (
              <div key={label}>
                {label} <b>{value}</b>
              </div>
            ))}
          </div>
        </>
      ) : (
        body
      )}
    </article>
  );
}

export default function Home({ navigate }) {
  const follow = (to) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <main id="top">
      <section className="hero">
        <div className="wrap">
          <div className="hero-copy">
            <p className="hero-lede">
              I’m Lelisa Hailu, a full stack engineer who takes products from the first sketch
              to the production server — real-time interfaces, solid APIs and systems built to
              last, with React, Next.js, Node.js and Go.
            </p>

            <div className="cta">
              <a className="btn p" href="/#work" onClick={follow("/#work")}>
                View selected work <span className="ar" aria-hidden="true">→</span>
              </a>
              <a className="btn" href="/#contact" onClick={follow("/#contact")}>
                Get in touch
              </a>
            </div>

            <div className="hero-socials">
              <span className="sep" aria-hidden="true" />
              <a href="mailto:lelisahailu22@gmail.com">
                Email <span aria-hidden="true text-b">↗</span>
              </a>
            </div>
          </div>

          <ul className="hero-stats" aria-label="Track record">
            <li>
              <b>4</b>
              <span>Live products</span>
            </li>
            <li>
              <b>97.5%</b>
              <span>Tech Fest score</span>
            </li>
            <li>
              <b>4th / 79</b>
              <span>STARK Hackathon</span>
            </li>
          </ul>
        </div>
      </section>

      <section id="work">
        <div className="wrap">
          <h2>Selected work</h2>
          <p className="lead">Products that are live, used by real people, and built end to end.</p>
          <div className="proj">
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                big={index === 0}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      <DesignProcess />

      <section id="path">
        <div className="wrap">
          <h2>Experience</h2>
          <p className="lead">Shipping in production while leading a community of builders.</p>
          <div className="two">
            <div className="tl">
              <div className="job">
                <h3>Technical Lead, GDG AASTU</h3>
                <div className="m">Oct 2026 to now</div>
                <p>
                  Leading technical initiatives, mentoring members and running workshops for the
                  Google Developer Group chapter.
                </p>
              </div>
              <div className="job">
                <h3>Back End Developer Intern, Gebeta Maps</h3>
                <div className="m">Jun 2026 to now · Remote</div>
                <p>
                  Writing Go services for an Ethiopia-focused navigation app: real-time traffic,
                  routing and location features, with stable APIs under production load.
                </p>
              </div>
              <div className="job">
                <h3>Full Stack Engineer Intern, SWENETIX Tech</h3>
                <div className="m">Aug to Oct 2026 · On-site</div>
                <p>
                  Designed and built a complete Restaurant Management System, owning features across
                  the MERN stack.
                </p>
              </div>
              <div className="job">
                <h3>Full Stack Developer Intern, Prodigy InfoTech</h3>
                <div className="m">Earlier</div>
                <p>
                  Built GreatTeam EMS with role-based access, attendance tracking and extensible
                  APIs.
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
                  <b>ALX Certificate</b>Appreciation for peer mentoring
                </li>
              </ul>
              <h3 style={{ fontSize: 24, margin: "36px 0 16px" }}>Toolbox</h3>
              <div className="sk2">
                <div>
                  <span>Languages</span>JavaScript, TypeScript, Go, C++
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
                  <span>Ship</span>Git, Jest, GitHub Actions, Vercel, Render
                </div>
                <div>
                  <span>Design</span>Figma, prototyping, design systems
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
