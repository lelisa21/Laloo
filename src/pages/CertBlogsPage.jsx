import { BLOG_POSTS, CERTIFICATIONS } from "../data/content";

export default function CertBlogsPage({ navigate }) {
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
          <span className="pg-count">
            {CERTIFICATIONS.length} certifications · {BLOG_POSTS.length} planned posts
          </span>
        </div>

        <p className="pd-kicker">Blogs & certifications</p>
        <h1>Proof, plus notes.</h1>
        <p className="lead">
          The courses and community programs behind the work, and a small writing shelf for the
          things worth explaining. Posts are placeholders for now — add a link when one is ready.
        </p>

        <div className="pd-body">
          <section aria-labelledby="cert-list-title">
            <h2 id="cert-list-title">Certifications</h2>
            <div className="pd-features">
              {CERTIFICATIONS.map((cert) => (
                <div className="pd-feature" key={`${cert.issuer}-${cert.title}`}>
                  <span className="pd-kicker">{cert.issuer}</span>
                  <b>{cert.title}</b>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="blog-list-title">
            <h2 id="blog-list-title">Writing</h2>
            <p>
              Engineering notes planned from the projects on this site. Nothing is published yet,
              so these cards show the intended topic instead of a dead link.
            </p>
            <div className="pd-features" style={{ marginTop: 18 }}>
              {BLOG_POSTS.map((post) => (
                <article className="pd-feature" key={post.title}>
                  <span className="pd-kicker">
                    {post.topic} · {post.status}
                  </span>
                  <b>{post.title}</b>
                  <p>{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>

          <section aria-label="Next steps">
            <div className="cta">
              <a
                className="btn p"
                href="/projects/bikattech"
                onClick={follow("/projects/bikattech")}
              >
                See CV Studio <span className="ar" aria-hidden="true">→</span>
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
