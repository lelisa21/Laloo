import { useRef, useState } from "react";

const MAX_IMAGES = 5;

export default function ProjectImages({ project }) {
  const images = (project.images || []).filter((image) => image?.src).slice(0, MAX_IMAGES);
  const dialogRef = useRef(null);
  const [active, setActive] = useState(0);
  const current = images[active];

  const open = (index) => {
    setActive(index);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  return (
    <section className="pd-media" aria-labelledby={`media-title-${project.id}`}>
      <div className="pd-media-head">
        <div>
          <p className="pd-kicker">Visuals</p>
          <h2 id={`media-title-${project.id}`}>Project images</h2>
        </div>
        <span className="pd-media-count">
          {images.length} / {MAX_IMAGES}
        </span>
      </div>

      {images.length > 0 ? (
        <>
          <div className="pd-media-grid" data-count={images.length}>
            {images.map((image, index) => (
              <figure className="pd-shot" key={`${image.src}-${index}`}>
                <button
                  type="button"
                  onClick={() => open(index)}
                  aria-label={`View ${image.alt || `${project.name} image ${index + 1}`} larger`}
                >
                  <img
                    src={image.src}
                    alt={image.alt || `${project.name} project image ${index + 1}`}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
                {image.caption && (
                  <figcaption>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>

          <dialog
            ref={dialogRef}
            className="pd-lightbox"
            aria-label={`${project.name} image viewer`}
            onClick={(event) => {
              if (event.target === dialogRef.current) close();
            }}
          >
            <button className="pd-lightbox-close" type="button" onClick={close} aria-label="Close image viewer">
              ×
            </button>
            {current && (
              <img
                src={current.src}
                alt={current.alt || `${project.name} project image ${active + 1}`}
              />
            )}
            {current?.caption && <p>{current.caption}</p>}
          </dialog>
        </>
      ) : (
        <div className="pd-media-empty">
          <div className="pd-media-empty-art" aria-hidden="true">
            <span>01</span>
            <span>02</span>
            <span>03</span>
          </div>
          <div className="pd-media-empty-copy">
            <b>Images coming soon</b>
            <p>
              This page has room for up to five screenshots and the gallery adapts to however many
              are added.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
