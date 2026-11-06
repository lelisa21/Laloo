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
    name: "bikatTech",
    kind: "Free learning platform",
    role: "Full-stack engineer",
    timeline: "2025 — building",
    status: "In progress",
    live: false,
    url: null,
    urlText: null,
    summary:
      "A free learning platform for Full Stack, AI, Cybersecurity and Software, with AI-supported guides and mentors so learners never feel stuck alone.",
    cardSummary:
      "A free learning platform for Full Stack, AI, Cybersecurity and Software, with AI-supported guides and mentors so learners never feel stuck alone.",
    tags: ["Full stack", "Learning paths", "AI guides"],
    cardTags: ["Full stack", "Learning paths", "AI guides"],
    // Add up to 5 images: { src, alt, caption }. Files live in public/projects/bikattech/.
    images: [],
    overview:
      "bikatTech is a learning platform built around a simple observation: access to material is not the same as access to help. The product combines structured learning paths across four tracks with AI-supported guides and a path to real mentors when a learner gets stuck.",
    problem:
      "Free technical education is everywhere, but learners still drop off. The hard part is usually the moment something breaks and there is no one to ask. Courses explain the topic; they do not always explain the error on the learner's screen.",
    solution:
      "I designed the platform around tracks, checkpoints and help. Each learning path is broken into clear steps, an AI guide can answer questions in context, and mentor access gives learners a human route when they need one. The goal is momentum, not content volume.",
    highlights: [
      "Four learning paths: Full Stack, AI, Cybersecurity and Software",
      "AI-supported guides that respond inside the learning flow",
      "Mentor access so learners have a human next step",
      "Structured checkpoints that make progress visible",
      "Free access as a core product constraint",
    ],
    features: [
      {
        title: "Learning paths",
        text: "Four tracks broken into practical steps instead of an endless content library.",
      },
      {
        title: "AI guides",
        text: "Context-aware support for the questions that appear while someone is building.",
      },
      {
        title: "Mentor access",
        text: "A human escalation path for the moments when an AI answer is not enough.",
      },
      {
        title: "Visible progress",
        text: "Checkpoints and completion states help learners see how far they have come.",
      },
    ],
    stack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "AI integration"],
    architecture: [
      { label: "Client", value: "React / Next.js" },
      { label: "Content", value: "Learning paths" },
      { label: "Guide", value: "AI-assisted help" },
      { label: "API", value: "Node.js + Express" },
      { label: "Data", value: "MongoDB" },
    ],
    metrics: [
      { value: "4", label: "learning tracks" },
      { value: "AI", label: "in-flow guidance" },
      { value: "Free", label: "by design" },
    ],
    outcome:
      "bikatTech is being built as a free route into practical tech education. The focus is on completion and confidence rather than adding more courses to a catalogue.",
    lessons: [
      "A learning product is a support product: the help layer matters as much as the curriculum.",
      "Free does not mean low quality; it means the product has to be clear enough to stand on its own.",
    ],
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
