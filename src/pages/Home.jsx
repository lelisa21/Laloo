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

      <section id="more">
        <div className="wrap">
          <h2>Explore more</h2>
          <p className="lead">
            The full background, the roles behind the work, and the certifications are one click
            away.
          </p>
          <div className="cta">
            <a className="btn p" href="/about" onClick={follow("/about")}>
              About me <span className="ar" aria-hidden="true">→</span>
            </a>
            <a className="btn" href="/experience" onClick={follow("/experience")}>
              Experience
            </a>
            <a className="btn" href="/cert-blogs" onClick={follow("/cert-blogs")}>
              Blogs &amp; certifications
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
