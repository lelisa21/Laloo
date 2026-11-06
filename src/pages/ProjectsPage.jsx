import { PROJECTS } from "../data/projects";

export default function ProjectsPage({ navigate }) {
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
          <span className="pg-count">{PROJECTS.length} projects · 01—0{PROJECTS.length}</span>
        </div>
        <p className="pd-kicker">Selected work</p>
        <h1>Built end to end.</h1>
        <p className="lead">
          Products I designed, led or shipped. Every project has its own page with the problem, the
          build, the architecture and the project id.
        </p>
        <div className="project-index">
          {PROJECTS.map((project) => (
            <a
              className="project-tile"
              key={project.id}
              href={`/projects/${project.id}`}
              onClick={follow(`/projects/${project.id}`)}
            >
              <div className="pt-top">
                <span className="pt-id">
                  {project.code} · {project.id}
                </span>
                <span className="pt-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
              <h2>{project.name}</h2>
              <p>{project.cardSummary}</p>
              <div className="tags">
                {project.cardTags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="pt-foot">
                <span>{project.kind}</span>
                <span>{project.status}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
