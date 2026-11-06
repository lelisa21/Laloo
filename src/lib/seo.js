const SITE_NAME = "Lelisa Hailu";
const DEFAULT_IMAGE = "/og.png";
const DEFAULT_IMAGE_ALT = "Lelisa Hailu — full stack engineer in Addis Ababa";

const DESCRIPTIONS = {
  home: "Lelisa Hailu is a full stack engineer in Addis Ababa building real-time products with MERN, Next.js and Go.",
  projects:
    "Selected work by Lelisa Hailu — real-time auction, social-impact and learning products built end to end with React, Node.js and Go.",
  notfound: "The requested page or project could not be found.",
};

function absoluteUrl(path) {
  try {
    return new URL(path, window.location.origin).href;
  } catch {
    return path;
  }
}

function upsertMeta(key, value, attribute = "name") {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (value === undefined || value === null || value === "") {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", String(value));
}

function upsertLink(rel, href) {
  let element = document.head.querySelector(`link[rel="${rel}"]`);

  if (!href) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function getPageMeta(route, project) {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
  const url = absoluteUrl(pathname);

  if (route.name === "project" && project) {
    const image = project.images?.find((image) => image?.src)?.src || DEFAULT_IMAGE;
    const usesDefaultImage = image === DEFAULT_IMAGE;

    return {
      title: `${project.name} — ${project.kind} | ${SITE_NAME}`,
      description: project.summary,
      url,
      type: "article",
      robots: "index, follow",
      image: absoluteUrl(image),
      imageAlt: `${project.name} — ${project.kind} by Lelisa Hailu`,
      imageType: usesDefaultImage ? "image/png" : undefined,
      imageWidth: usesDefaultImage ? 1200 : undefined,
      imageHeight: usesDefaultImage ? 630 : undefined,
    };
  }

  if (route.name === "projects") {
    return {
      title: `Projects — ${SITE_NAME}`,
      description: DESCRIPTIONS.projects,
      url,
      type: "website",
      robots: "index, follow",
      image: absoluteUrl(DEFAULT_IMAGE),
      imageAlt: DEFAULT_IMAGE_ALT,
      imageType: "image/png",
      imageWidth: 1200,
      imageHeight: 630,
    };
  }

  if (route.name === "notfound") {
    return {
      title: `Page not found — ${SITE_NAME}`,
      description: DESCRIPTIONS.notfound,
      url,
      type: "website",
      robots: "noindex, nofollow",
      image: absoluteUrl(DEFAULT_IMAGE),
      imageAlt: DEFAULT_IMAGE_ALT,
      imageType: "image/png",
      imageWidth: 1200,
      imageHeight: 630,
    };
  }

  return {
    title: `${SITE_NAME} — Full Stack Engineer`,
    description: DESCRIPTIONS.home,
    url,
    type: "website",
    robots: "index, follow",
    image: absoluteUrl(DEFAULT_IMAGE),
    imageAlt: DEFAULT_IMAGE_ALT,
    imageType: "image/png",
    imageWidth: 1200,
    imageHeight: 630,
  };
}

export function applyPageMeta(meta) {
  document.title = meta.title;

  upsertMeta("description", meta.description);
  upsertMeta("robots", meta.robots);
  upsertMeta("og:type", meta.type, "property");
  upsertMeta("og:site_name", SITE_NAME, "property");
  upsertMeta("og:locale", "en_US", "property");
  upsertMeta("og:title", meta.title, "property");
  upsertMeta("og:description", meta.description, "property");
  upsertMeta("og:url", meta.url, "property");
  upsertMeta("og:image", meta.image, "property");
  upsertMeta("og:image:alt", meta.imageAlt, "property");
  upsertMeta("og:image:type", meta.imageType, "property");
  upsertMeta("og:image:width", meta.imageWidth, "property");
  upsertMeta("og:image:height", meta.imageHeight, "property");

  upsertMeta("twitter:card", "summary_large_image");
  upsertMeta("twitter:title", meta.title);
  upsertMeta("twitter:description", meta.description);
  upsertMeta("twitter:image", meta.image);
  upsertMeta("twitter:image:alt", meta.imageAlt);

  upsertLink("canonical", meta.robots.startsWith("noindex") ? undefined : meta.url);
}
