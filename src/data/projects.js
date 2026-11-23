import { CERTIFICATIONS } from "./content";

export const PROJECTS = [
  {
    id: "cheretanet",
    code: "PRJ-01",
    name: "Cheretanet",
    kind: "Online auction platform",
    role: "Designer & full-stack engineer",
    timeline: "2025 — present",
    status: "Live",
    live: true,
    url: "https://cheretanet.ethiodeploy.com",
    urlText: "cheretanet.ethiodeploy.com",
    summary:
      "A real-time auction platform where local sellers run timed lots, bidders compete live, and every bid leaves a clean transaction trail.",
    cardSummary:
      "An online auction platform with real-time bidding, search, transaction history, multi-tenancy and payments. I designed the interface, planned the architecture and shipped it to production.",
    tags: ["React", "Node.js", "Socket.io", "MongoDB", "EthioDeploy"],
    cardTags: ["React", "Node.js", "Socket.io", "MongoDB", "EthioDeploy"],
    cardArchitecture: [
      ["Client", "React + Redux"],
      ["Real-time", "Socket.io rooms"],
      ["API", "Express REST"],
      ["Data", "MongoDB, per-tenant"],
    ],
    // Add up to 5 images: { src, alt, caption }. Files live in public/projects/cheretanet/.
    images: [],
    overview:
      "Cheretanet is a multi-tenant auction product built for the local market. Sellers create a lot, set a window and let the room compete. Bidders get live price updates, a visible clock and a complete history, while the platform handles tenancy, search, payments and the transaction record behind each sale.",
    problem:
      "Auctions were being run inside social feeds and group chats. Bidders lost track of time, sellers tracked bids by hand, and there was no reliable record of who won or what was paid. The product needed to make the auction feel live and trustworthy without making the interface feel complicated.",
    solution:
      "I mapped the auction flow first, designed the interface around a single lot view, and built the real-time layer around Socket.io rooms. Anti-sniping extends the clock when a bid lands in the final seconds. Each tenant gets isolated data, and every completed auction produces a transaction history entry instead of disappearing into a chat thread.",
    highlights: [
      "Real-time bidding with live price, bidder list and countdown updates",
      "Anti-sniping logic that adds six seconds to the clock after a late bid",
      "Multi-tenant data model so separate auction houses can run on one platform",
      "Search and filtering across lots, categories and completed transactions",
      "Payment support and a permanent transaction history for every sale",
      "Responsive interface designed from the first sketch through production",
    ],
    features: [
      {
        title: "Live rooms",
        text: "Every lot runs in its own Socket.io room so only the relevant clients receive bid events.",
      },
      {
        title: "Anti-sniping clock",
        text: "A bid in the final six seconds extends the auction, keeping the competition fair.",
      },
      {
        title: "Multi-tenancy",
        text: "Tenants share the application while their users, lots and transactions stay isolated.",
      },
      {
        title: "Transaction trail",
        text: "Winning bids become durable transaction records instead of disappearing into messages.",
      },
    ],
    stack: ["React", "Redux", "Node.js", "Express", "Socket.io", "MongoDB", "Tailwind", "EthioDeploy"],
    architecture: [
      { label: "Client", value: "React + Redux" },
      { label: "Realtime", value: "Socket.io rooms" },
      { label: "API", value: "Express REST" },
      { label: "Data", value: "MongoDB per tenant" },
      { label: "Deploy", value: "EthioDeploy" },
    ],
    metrics: [
      { value: "Real-time", label: "bid sync" },
      { value: "6 s", label: "anti-snipe extension" },
      { value: "Live", label: "in production" },
    ],
    outcome:
      "Cheretanet is live and used as a working auction product, not a prototype. The build covers the full flow: onboarding, listing, live bidding, winning, payment and the history that follows a sale.",
    lessons: [
      "Real-time UI is mostly about trust: the price, clock and bid list have to agree at all times.",
      "Designing the data model around tenancy early avoided painful rewrites later.",
    ],
  },
  {
    id: "reunite",
    code: "PRJ-02",
    name: "Reunite",
    kind: "Missing-person platform",
    role: "Project lead & full-stack developer",
    timeline: "2025",
    status: "Live",
    live: true,
    url: "https://reunite-together.vercel.app",
    urlText: "reunite-together.vercel.app",
    summary:
      "A social-impact platform that helps families report missing people, share information and reconnect.",
    cardSummary:
      "A social-impact platform that helps families report missing people and reconnect. I led the project and designed the workflows.",
    tags: ["Project lead", "Full stack", "Vercel"],
    cardTags: ["Project lead", "Full stack", "Vercel"],
    // Add up to 5 images: { src, alt, caption }. Files live in public/projects/reunite/.
    images: [],
    overview:
      "Reunite gives families and communities one place to report a missing person, share the details that matter and follow updates. I led the project, shaped the reporting and discovery workflows, and worked across the stack to get it live.",
    problem:
      "When someone goes missing, information gets scattered across social posts, phone calls and informal networks. Families repeat the same details to every new person, and the people who could help often never see the report.",
    solution:
      "We designed a structured report that captures the useful facts without feeling like a form, then made those reports easy to browse and share. The workflow focuses on the family first: clear status, a simple update path and no unnecessary friction.",
    highlights: [
      "Guided missing-person report flow with the right details in one place",
      "Public discovery so reports can reach people outside the family network",
      "Status updates that keep the story current",
      "Project leadership from concept and workflow design through delivery",
    ],
    features: [
      {
        title: "Report a person",
        text: "A clear, structured way to capture the details that help people identify and respond.",
      },
      {
        title: "Browse reports",
        text: "Reports are discoverable so the community can help instead of relying on one feed.",
      },
      {
        title: "Follow updates",
        text: "Families can keep a report current as new information appears.",
      },
      {
        title: "Share safely",
        text: "The experience is designed around dignity and useful information, not spectacle.",
      },
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Vercel"],
    architecture: [
      { label: "Client", value: "React" },
      { label: "API", value: "Express REST" },
      { label: "Data", value: "MongoDB" },
      { label: "Deploy", value: "Vercel" },
    ],
    metrics: [
      { value: "Lead", label: "project & workflow" },
      { value: "Live", label: "public product" },
      { value: "Full stack", label: "design to delivery" },
    ],
    outcome:
      "Reunite shipped as a live social-impact product. The value of the project was not only the build, but making a difficult moment simpler for the people using it.",
    lessons: [
      "In sensitive products, the smallest copy decision can change whether someone feels helped or exposed.",
      "Leading a project means protecting the clarity of the problem while the implementation moves quickly.",
    ],
  },
  {
    id: "bikattech",
    code: "PRJ-03",
    name: "bikatTech · CV Studio",
    kind: "AI CV & learning platform",
    role: "Full-stack engineer · AI features",
    timeline: "2025 — present",
    status: "Live",
    live: true,
    url: "https://bikatech-cv-studio.vercel.app/",
    urlText: "bikatech-cv-studio.vercel.app",
    summary:
      "BikatTech's AI-powered CV and career platform: a live editor, local-first drafts, job-match and ATS-gap analysis, and print-ready export in English, Amharic and Afaan Oromo — alongside free learning paths with AI guides.",
    cardSummary:
      "An AI-powered CV studio with a live editor, local-first drafts, job-match / ATS analysis and PDF, Word & PNG export in three languages. Part of BikatTech's free learning platform.",
    tags: ["Next.js", "AI / ML", "3 languages", "Local-first"],
    cardTags: ["Next.js", "AI / ML", "3 languages", "Local-first"],
    cardArchitecture: [
      ["Client", "Next.js + shadcn/ui"],
      ["Drafts", "IndexedDB, local-first"],
      ["AI", "Job-match & ATS analysis"],
      ["Export", "PDF · Word · PNG"],
    ],
    // Add up to 5 images: { src, alt, caption }. Files live in public/projects/bikattech/.
    images: [
      {
        src: "/projects/bikattech/cv-studio.png",
        alt: "CV Studio by BikatTech — AI-powered CV and career platform",
        caption: "CV Studio — write, match and export",
        fit: "contain",
      },
    ],
    overview:
      "CV Studio is the career workspace in the BikatTech ecosystem. It pairs an AI-powered CV builder with free learning paths: write in a live editor, keep drafts on the device, match the CV to a vacancy before applying, and export a print-ready document. The product and the documents both ship in English, Amharic and Afaan Oromo.",
    problem:
      "Most CV tools are forms that dump text onto a template, and most free learning material leaves people stuck the moment something breaks. Job seekers here also lack tools that work in their own languages, save work offline, and show how a CV will read to an applicant-tracking system before it is sent.",
    solution:
      "I built CV Studio as a studio, not a form: layout, language and export are first-class. IndexedDB keeps drafts local so work survives a refresh or a dropped connection, cloud sync stays optional, and a job analyzer surfaces keyword overlap, gaps and ATS risk. The same AI foundations power in-flow guides across BikatTech's free learning tracks.",
    highlights: [
      "Live A4 editor with real-time preview — what you style is what you print",
      "Local-first drafts in IndexedDB that work offline, with optional account sync",
      "Job-match and ATS-gap analysis before you apply",
      "Print-ready export to PDF, Word and PNG",
      "Full English, Amharic and Afaan Oromo support for the product and the documents",
      "Template system for academic, corporate and technical roles, plus cover letters",
      "Free learning paths with AI-supported guides alongside the studio",
    ],
    features: [
      {
        title: "Live editor & preview",
        text: "Compose sections, typography and spacing beside an A4 page that updates as you type.",
      },
      {
        title: "Local-first drafts",
        text: "IndexedDB autosaves on the device, so a refresh, closed tab or lost connection never costs work.",
      },
      {
        title: "Job match & ATS check",
        text: "Paste a vacancy to see keyword overlap, gaps and ATS risk before sending the file.",
      },
      {
        title: "Three languages",
        text: "English, Amharic and Afaan Oromo across the interface, the CV and the cover letters.",
      },
      {
        title: "Print-ready export",
        text: "Clean, selectable-text A4 output to PDF, Word or PNG that tracking systems can parse.",
      },
      {
        title: "AI learning guides",
        text: "Context-aware help across BikatTech's free tracks, with a path to real mentors.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind",
      "shadcn/ui",
      "Node.js",
      "Express",
      "MongoDB",
      "IndexedDB",
      "AI / ML",
      "Vercel",
    ],
    architecture: [
      { label: "Client", value: "Next.js + shadcn/ui" },
      { label: "Drafts", value: "IndexedDB, local-first" },
      { label: "AI", value: "Job-match & ATS analysis" },
      { label: "API", value: "Node.js + Express" },
      { label: "Data", value: "MongoDB" },
      { label: "Export", value: "PDF · Word · PNG" },
      { label: "Deploy", value: "Vercel" },
    ],
    metrics: [
      { value: "3", label: "languages" },
      { value: "3", label: "export formats" },
      { value: "ATS", label: "gap analysis" },
      { value: "Live", label: "on Vercel" },
    ],
    outcome:
      "CV Studio is live as BikatTech's flagship product: a working career workspace, not a mockup. It ships the full flow — pick a template, write with a live page, match it to a job, and leave with a document you can send — while the learning platform keeps free, AI-supported paths open to everyone.",
    lessons: [
      "Local-first is a trust feature: people write better when they know a dropped connection cannot erase their work.",
      "Language is product surface, not a translation afterthought — the editor, the export and the help all have to speak it.",
      "AI adds the most value at the moment of doubt: the error on screen, the gap before applying.",
    ],
    certifications: CERTIFICATIONS,
  },
  {
    id: "greateam-ems",
    code: "PRJ-04",
    name: "GreatTeam EMS",
    kind: "Employee management system",
    role: "Full-stack developer intern",
    timeline: "2025",
    status: "Live",
    live: true,
    url: "https://greateam-ems-one.vercel.app/",
    urlText: "greateam-ems-one.vercel.app",
    summary:
      "An employee dashboard with role-based access, attendance tracking and clean CRUD flows, built during my internship at Prodigy InfoTech.",
    cardSummary:
      "An employee dashboard with role-based access, attendance tracking and clean CRUD flows, built at Prodigy InfoTech.",
    tags: ["React", "Express", "Socket.io"],
    cardTags: ["React", "Express", "Socket.io"],
    // Add up to 5 images: { src, alt, caption }. Files live in public/projects/greateam-ems/.
    images: [],
    overview:
      "GreatTeam EMS is an employee management dashboard built to make everyday HR work visible and repeatable. It combines role-based access, attendance tracking and standard CRUD flows in one interface, with a structure that can keep growing.",
    problem:
      "Small teams often manage people data across spreadsheets, chats and memory. Access is unclear, attendance is easy to lose, and every new HR need becomes another manual process.",
    solution:
      "I built the dashboard around roles and permissions first, then layered on attendance and CRUD flows for the records the team actually uses. Socket.io keeps relevant views fresh, and the API is organised so new capabilities can be added without reshaping the whole app.",
    highlights: [
      "Role-based access so each person sees the right view",
      "Attendance tracking in a clear daily interface",
      "Reusable CRUD patterns for employee records",
      "Real-time updates with Socket.io",
      "Extensible API structure built for future modules",
    ],
    features: [
      {
        title: "Roles & access",
        text: "Permissions decide what a user can view and change, rather than hiding everything in one admin view.",
      },
      {
        title: "Attendance",
        text: "A simple daily record that makes tracking visible without adding busywork.",
      },
      {
        title: "CRUD flows",
        text: "Consistent create, read, update and delete patterns across the employee data.",
      },
      {
        title: "Live updates",
        text: "Socket.io keeps connected dashboards in sync as records change.",
      },
    ],
    stack: ["React", "Node.js", "Express", "Socket.io", "MongoDB", "Vercel"],
    architecture: [
      { label: "Client", value: "React" },
      { label: "API", value: "Express REST" },
      { label: "Realtime", value: "Socket.io" },
      { label: "Data", value: "MongoDB" },
      { label: "Deploy", value: "Vercel" },
    ],
    metrics: [
      { value: "Role-based", label: "access control" },
      { value: "Real-time", label: "dashboard sync" },
      { value: "Live", label: "on Vercel" },
    ],
    outcome:
      "GreatTeam EMS gave the team a single place to manage employee data and attendance. It was also where I tightened my approach to permissions, API structure and reusable UI patterns.",
    lessons: [
      "Permissions are a product decision, not a middleware detail.",
      "A consistent CRUD pattern saves far more time than a clever one-off screen.",
    ],
  },
];

export function getProject(id) {
  const needle = String(id || "").toLowerCase();
  return (
    PROJECTS.find((project) => project.id === needle) ||
    PROJECTS.find((project) => project.code.toLowerCase() === needle) ||
    PROJECTS.find((project, index) => String(index + 1) === needle)
  );
}
