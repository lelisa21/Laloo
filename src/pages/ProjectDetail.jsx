import { getProject, PROJECTS } from "../data/projects";
import ProjectImages from "../components/ProjectImages";
import NotFound from "./NotFound";

export default function ProjectDetail({ projectId, navigate }) {
  const project = getProject(projectId);
  if (!project) return <NotFound navigate={navigate} />;

  const index = PROJECTS.findIndex((item) => item.id === project.id);
  const previous = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  const follow = (to) => (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };

  return (
    <main className="project-page">
      <div className="wrap">
        <a className="back" href="/projects" onClick={follow("/projects")}>
          ← All projects
        </a>

        <header className="pd-head">
          <div>
            <p className="pd-kicker">
              Project ID · {project.code} · {project.id}
            </p>
            <h1>{project.name}</h1>
            <p className="pd-summary">{project.summary}</p>
            <div className="pd-meta">
              <div>
                Role
                <b>{project.role}</b>
              </div>
              <div>
                Timeline
                <b>{project.timeline}</b>
              </div>
              <div>
                Status
                <b className="status">{project.status}</b>
              </div>
            </div>
            <div className="cta">
              {project.url && (
                <a className="btn p" href={project.url} target="_blank" rel="noopener noreferrer">
                  Visit live site ↗
                </a>
              )}
              <a className="btn" href="/projects" onClick={follow("/projects")}>
                All projects
              </a>
            </div>
          </div>

          <div className="pd-visual" aria-label={`${project.name} project card`}>
            <span className="pd-ring" aria-hidden="true" />
            <div className="pd-visual-top">
              <span className="pd-visual-id">{project.code}</span>
              <span className="pd-visual-status">{project.status}</span>
            </div>
            <p className="pd-big">{project.name}</p>
            <div className="tags">
              {project.cardTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </header>

        <ProjectImages project={project} />

        <div className="pd-body">
          <section>
            <h2>Overview</h2>
            <p className="lead">{project.overview}</p>
          </section>

          <div className="pd-two">
            <section>
              <h2>The problem</h2>
              <p>{project.problem}</p>
            </section>
            <section>
              <h2>The approach</h2>
              <p>{project.solution}</p>
            </section>
          </div>

          <section>
            <h2>What I built</h2>
            <ul className="pd-list">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Key features</h2>
            <div className="pd-features">
              {project.features.map((feature) => (
                <div className="pd-feature" key={feature.title}>
                  <b>{feature.title}</b>
                  {feature.text}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Architecture</h2>
            <div className="pd-arch">
              {project.architecture.map((layer) => (
                <div key={layer.label}>
                  {layer.label}
                  <b>{layer.value}</b>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Stack</h2>
            <div className="tags">
              {project.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </section>

          <div className="pd-two">
            <section>
              <h2>Outcome</h2>
              <p>{project.outcome}</p>
              <div className="pd-metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <b>{metric.value}</b>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </section>
            <section>
              <h2>What I learned</h2>
              <ul className="pd-list">
                {project.lessons.map((lesson) => (
                  <li key={lesson}>{lesson}</li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <nav className="pd-pager" aria-label="Project navigation">
          <a href={`/projects/${previous.id}`} onClick={follow(`/projects/${previous.id}`)}>
            <small>
              ← Previous · {previous.code}
            </small>
            <b>{previous.name}</b>
          </a>
          <a
            className="next"
            href={`/projects/${next.id}`}
            onClick={follow(`/projects/${next.id}`)}
          >
            <small>
              Next · {next.code} →
            </small>
            <b>{next.name}</b>
          </a>
        </nav>
      </div>
    </main>
  );
}
