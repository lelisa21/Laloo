const SITE_NAME = "Lelisa Hailu";

const DESCRIPTIONS = {
  home: "I am Lelisa Hailu a Full Stack Engineer | Senior Software Engineering Student @AASTU | ML Ethusiast,  building real-time products with MERN, Next.js and Go.",
  about:
    "About Lelisa Hailu — full stack engineer in Addis Ababa working across MERN, Next.js and Go while moving into applied AI and ML.",
  projects:
    "Selected work by Lelisa Hailu — real-time auction, social-impact, AI CV and learning products built end to end with React, Next.js, Node.js and Go.",
  experience:
    "Experience of Lelisa Hailu — technical lead at GDG AASTU, Go backend intern at Gebeta Maps, and full-stack internships shipping production systems.",
  certBlogs:
    "Certifications and writing by Lelisa Hailu — ALX, Coursera, GDG AASTU and FreeCodeCamp credentials, plus planned engineering notes.",
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

  if (route.name === "about") {
    return {
      title: `About — ${SITE_NAME}`,
      description: DESCRIPTIONS.about,
      url,
      robots: "index, follow",
    };
  }

  if (route.name === "project" && project) {
    return {
      title: `${project.name} — ${project.kind} | ${SITE_NAME}`,
      description: project.summary,
      url,
      robots: "index, follow",
    };
  }

  if (route.name === "projects") {
    return {
      title: `Projects — ${SITE_NAME}`,
      description: DESCRIPTIONS.projects,
      url,
      robots: "index, follow",
    };
  }

  if (route.name === "experience") {
    return {
      title: `Experience — ${SITE_NAME}`,
      description: DESCRIPTIONS.experience,
      url,
      robots: "index, follow",
    };
  }

  if (route.name === "certBlogs") {
    return {
      title: `Blogs & Certifications — ${SITE_NAME}`,
      description: DESCRIPTIONS.certBlogs,
      url,
      robots: "index, follow",
    };
  }

  if (route.name === "notfound") {
    return {
      title: `Page not found — ${SITE_NAME}`,
      description: DESCRIPTIONS.notfound,
      url,
      robots: "noindex, nofollow",
    };
  }

  return {
    title: `${SITE_NAME} — Full Stack Engineer`,
    description: DESCRIPTIONS.home,
    url,
    robots: "index, follow",
  };
}

export function applyPageMeta(meta) {
  document.title = meta.title;

  upsertMeta("description", meta.description);
  upsertMeta("robots", meta.robots);
  upsertLink("canonical", meta.robots.startsWith("noindex") ? undefined : meta.url);

  // Keep SEO to title + description only: drop any leftover social-preview tags.
  document.head
    .querySelectorAll('meta[property^="og:"], meta[name^="twitter:"]')
    .forEach((element) => element.remove());
}
