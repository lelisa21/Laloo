export default function NotFound({ navigate }) {
  const goHome = (event) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <main className="project-page">
      <div className="wrap">
        <div className="pd-empty">
          <p className="pd-kicker">404 · Project not found</p>
          <h1>That page is not in the index.</h1>
          <p>
            The project id you followed does not exist. Head back to the work index and pick one of
            the live case studies.
          </p>
          <div className="cta">
            <a className="btn p" href="/projects" onClick={(event) => {
              event.preventDefault();
              navigate("/projects");
            }}>
              View all projects
            </a>
            <a className="btn" href="/" onClick={goHome}>
              Back home
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
