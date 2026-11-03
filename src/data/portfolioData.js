export const personalInfo = {
  name: "Lelisa Hailu",
  title: "Creative Technologist // Full-Stack Systems Architect",
  roles: [
    "Full-Stack Systems Engineer",
    "UI/UX Designer",
    "Motion Graphics Designer",
    "Technical Lead @ GDG AASTU"
  ],
  status: "ONLINE // AVAILABLE FOR HIGH-IMPACT ROLES",
  location: "Addis Ababa, Ethiopia",
  timezone: "EAT (UTC+3)",
  email: "lelisahailu22@gmail.com",
  phone: "+251 22 993 418",
  github: "https://github.com/lelisa21",
  linkedin: "https://linkedin.com/in/lelisa21",
  leetcode: "https://leetcode.com/lelisa21",
  education: {
    degree: "BSc in Software Engineering",
    institution: "Addis Ababa Science and Technology University (AASTU)",
    expectedYear: "Expected May 2028",
    certifications: [
      "ALX Africa | Professional Front-End Development",
      "GDG on Campus AASTU | Backend Engineering (Node.js, Express, MongoDB)",
      "FreeCodeCamp | Responsive Web Design & DSA",
      "GDG AASTU | Lead Training Program"
    ]
  },
  metrics: [
    { label: "GDG Tech Fest 2026", value: "97.5%", desc: "1st Place Winner Score" },
    { label: "STARK Hackathon", value: "Top 5", desc: "4th Place out of 79 Teams" },
    { label: "Real-Time Latency", value: "< 45ms", desc: "WebSocket & Go Stream Optimization" },
    { label: "Production Shipped", value: "6+", desc: "Live Platforms in Public Use" }
  ]
};

export const flagshipProjects = [
  {
    id: "cheretanet",
    title: "Cheretanet",
    tagline: "High-Concurrency Real-Time Auction & Bidding Platform",
    category: "Full-Stack • Real-Time Engine",
    year: "2026",
    liveUrl: "https://cheretanet.ethiodeploy.com",
    metrics: {
      concurrency: "1,000+ Concurrent Bidders",
      latency: "38ms State Sync",
      reliability: "Zero Race Condition Locking"
    },
    accentColor: "#00F5D4",
    summary: "A production-grade online auction engine featuring instant WebSocket bid synchronization, optimistic locking against split-second conflicts, multi-tenancy architecture, and comprehensive financial audit ledgers.",
    designPhilosophy: "High-pressure auction interfaces demand instantaneous visual comprehension. We designed a hyper-legible bidding cockpit where price updates pulse with micro-chromatic shifts, countdown timers accelerate visually in the final 60 seconds, and transactional states give visceral haptic feedback.",
    techStack: ["React 19", "Node.js", "Express", "Socket.io", "Redis Pub/Sub", "MongoDB", "Tailwind CSS", "EthioDeploy"],
    xrayData: {
      architecture: "Distributed WebSocket Gateway + In-Memory State Cache",
      pipelineSteps: [
        { step: "01. Client Ingress", detail: "Sub-millisecond bid dispatch with cryptographic nonce" },
        { step: "02. Atomic Mutex", detail: "Redis distributed lock resolves simultaneous microsecond bids" },
        { step: "03. Ledger Commit", detail: "MongoDB 2-phase transaction registers financial state" },
        { step: "04. Fan-Out Broadcast", detail: "Socket.io room broadcast transmits updated state to all connected clients" }
      ],
      systemSnippet: `// Cheretanet Atomic Bid Ingestion Pipeline
func (engine *AuctionEngine) ProcessBid(ctx context.Context, bid BidRequest) (*BidResult, error) {
    lockKey := fmt.Sprintf("auction:lock:%s", bid.AuctionID)
    if acquired := engine.redis.SetNX(ctx, lockKey, bid.UserID, 150*time.Millisecond); !acquired {
        return nil, ErrContentionRetry
    }
    defer engine.redis.Del(ctx, lockKey)
    
    // Broadcast sub-50ms delta to WebSocket clusters
    go engine.broadcastCluster(bid)
    return &BidResult{Status: "ACCEPTED", Timestamp: time.Now().UnixNano()}, nil
}`
    }
  },
  {
    id: "gebeta-maps",
    title: "Gebeta Maps Backend",
    tagline: "High-Throughput Routing & Real-Time Traffic Engine in Go",
    category: "Systems Architecture • Go Microservices",
    year: "2026",
    liveUrl: "https://gebeta.app",
    metrics: {
      throughput: "High-QPS Concurrent Requests",
      execution: "Go Routines & Memory Pools",
      caching: "Redis Spatial Geohashes"
    },
    accentColor: "#3B82F6",
    summary: "High-performance backend services powering an Ethiopia-focused spatial navigation platform. Engineered to ingest live traffic telemetry, compute dynamic multi-point routing, and maintain high API availability under heavy network volatility.",
    designPhilosophy: "Cartographic systems represent the bridge between raw mathematical algorithms and human spatial intuition. Optimized API payloads ensure navigation remains instantaneous even under 3G edge mobile constraints.",
    techStack: ["Go (Golang)", "Goroutines", "Redis Geohashes", "REST APIs", "Microservices", "Docker", "Postman"],
    xrayData: {
      architecture: "Concurrent Go Workers + Spatial Graph Partitioning",
      pipelineSteps: [
        { step: "01. Telemetry Ingestion", detail: "Real-time vehicle GPS ping streams batch-processed via Go worker pools" },
        { step: "02. Graph Weighting", detail: "Dynamic edge re-weighting based on live traffic congestion indices" },
        { step: "03. Path Optimization", detail: "A* heuristic pathfinder computing optimal transit vectors" },
        { step: "04. Compressed Response", detail: "Protobuf/JSON polyline payload dispatched with sub-15ms overhead" }
      ],
      systemSnippet: `// Gebeta Maps Concurrent Route Dispatcher
func (s *RoutingService) CalculateOptimalRoute(origin, dest Coordinates) RouteVector {
    ch := make(chan RouteCandidate, 4)
    for _, algo := range []Algorithm{AStar, DijkstraBidirectional, ContractionHierarchies} {
        go func(a Algorithm) {
            ch <- a.Compute(origin, dest, s.liveTrafficMatrix)
        }(algo)
    }
    return selectFastestPruned(ch, 20*time.Millisecond)
}`
    }
  },
  {
    id: "reunite",
    title: "Reunite",
    tagline: "Social-Impact Missing Persons Intelligence Platform",
    category: "Full-Stack • Social Impact",
    year: "2026",
    liveUrl: "https://reunite-together.vercel.app",
    metrics: {
      impact: "Humanitarian Reconnection",
      search: "Multi-Parametric Verification",
      uptime: "99.9% on Vercel"
    },
    accentColor: "#A855F7",
    summary: "A human-centered digital platform developed to accelerate reporting and tracing of missing persons across Ethiopia and beyond. Designed with compassionate UI flows, biometric/photo comparison queues, and real-time community alert channels.",
    designPhilosophy: "Users interacting with this platform are often under extreme emotional stress. The UI rejects cognitive clutter, utilizing calm neutral tones, reassuring typographic hierarchy, and one-tap emergency case escalation.",
    techStack: ["Next.js", "React 19", "Node.js", "Express", "MongoDB", "Vercel", "Tailwind CSS"],
    xrayData: {
      architecture: "Relational Intelligence Graph + Case Management Queue",
      pipelineSteps: [
        { step: "01. Case Submission", detail: "Optimized intake form with geolocation tagging and photo compression" },
        { step: "02. Verification Audit", detail: "Moderation triage workflow before public broadcast" },
        { step: "03. Spatial Alert Hook", detail: "Webhook triggers local community notifications based on last-seen radius" },
        { step: "04. Reunion Triage", detail: "Encrypted direct communication channel connecting searchers and responders" }
      ],
      systemSnippet: `// Reunite Automated Proximity Matcher
async function evaluateSpatialSightings(newReport) {
  const radiusKm = 25;
  const potentialMatches = await CaseModel.find({
    status: 'ACTIVE',
    lastSeenLocation: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: newReport.coordinates },
        $maxDistance: radiusKm * 1000
      }
    }
  }).select('caseId identity facialEmbeddings contactHash');
  return queueAlertNotifications(potentialMatches);
}`
    }
  },
  {
    id: "bikat-tech",
    title: "bikatTech",
    tagline: "AI-Augmented Open Technology Learning Platform",
    category: "EdTech • Full-Stack Platform",
    year: "2025 - 2026",
    liveUrl: "https://bikattech.org",
    metrics: {
      tracks: "Full-Stack, AI & Cybersecurity",
      pedagogy: "Interactive Guided Pathways",
      accessibility: "Zero-Cost Knowledge Base"
    },
    accentColor: "#F59E0B",
    summary: "An accessible educational ecosystem built to eliminate barriers in tech education for African developers. Features modular roadmaps, coding exercises, and integrated AI mentors that provide instant code feedback when learners hit roadblocks.",
    designPhilosophy: "Learning complex computing concepts requires spatial visual reinforcement. We engineered progressive interactive node graphs where learners see their conceptual progress branch out like a growing neural tree.",
    techStack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "AI Embeddings", "Socket.io"],
    xrayData: {
      architecture: "Micro-Lesson State Machine + AI Mentorship Pipeline",
      pipelineSteps: [
        { step: "01. Knowledge Graph", detail: "Curriculum organized as directed acyclic graph of mastery nodes" },
        { step: "02. Context Caching", detail: "Learner's active code sandbox state injected into AI prompt context" },
        { step: "03. Real-Time Hints", detail: "Adaptive hints that guide without spoiling the solution" },
        { step: "04. Peer Sync", detail: "Live discussion threads connected via Socket.io for collaborative study" }
      ],
      systemSnippet: `// bikatTech Adaptive Node Progress Engine
export function calculateCurriculumMastery(userProgressTree, trackId) {
  const targetNodes = KnowledgeGraph[trackId].nodes;
  const completed = targetNodes.filter(n => userProgressTree[n.id]?.score >= 0.85);
  return {
    percentage: Math.round((completed.length / targetNodes.length) * 100),
    unlockedNext: computeNextRecommendedNodes(userProgressTree, targetNodes)
  };
}`
    }
  }
];

export const experienceTimeline = [
  {
    role: "Technical Lead",
    organization: "Google Developer Groups (GDG) on Campus AASTU",
    period: "Oct 2026 — Present",
    location: "Addis Ababa, Ethiopia",
    type: "Leadership & Architecture",
    badge: "ACTIVE LEADERSHIP",
    highlights: [
      "Leading technical direction, curriculum design, and hands-on workshops for hundreds of student engineers at AASTU.",
      "Mentoring developers in Go backend development, modern React architecture, and distributed systems best practices.",
      "Spearheading open-source hackathons and engineering sprints that produced award-winning student projects."
    ]
  },
  {
    role: "Back End Developer Intern",
    organization: "Gebeta Maps",
    period: "Jun 2026 — Present",
    location: "Addis Ababa (Hybrid / Remote)",
    type: "Systems & Cloud",
    badge: "PRODUCTION GO",
    highlights: [
      "Architecting and optimizing Go microservices for real-time traffic data processing, routing engines, and geosearch.",
      "Collaborating on high-availability REST APIs handling mission-critical navigation traffic across Ethiopia.",
      "Reduced spatial query latencies through in-memory Redis geohashing and goroutine-based concurrency pipelines."
    ]
  },
  {
    role: "Full Stack Engineer Intern",
    organization: "SWENETIX Tech",
    period: "Aug 2026 — Oct 2026",
    location: "Addis Ababa (On-site)",
    type: "Product & UI/UX",
    badge: "ENTERPRISE POS",
    highlights: [
      "Took an in-house café & restaurant management system all the way from initial UI/UX sketches to working production code.",
      "Built real-time order dispatch pipelines using the MERN stack and Socket.io with zero order dropouts.",
      "Owned end-to-end features, database schema design, and responsive touch-first POS interfaces."
    ]
  },
  {
    role: "Full Stack Developer Intern",
    organization: "Prodigy InfoTech",
    period: "2026",
    location: "Remote",
    type: "SaaS Development",
    badge: "WORKFORCE SAAS",
    highlights: [
      "Engineered 'GreatTeam EMS', a comprehensive employee management dashboard with role-based access control and live attendance tracking.",
      "Developed secure RESTful backend APIs in Node.js/Express with MongoDB indexing for high-volume employee query operations.",
      "Implemented live organizational activity streams with Socket.io."
    ]
  }
];

export const awardsAndAccolades = [
  {
    title: "1st Place Winner — GDG AASTU Tech Fest 2026",
    score: "97.5% Score",
    issuer: "Google Developer Groups AASTU",
    desc: "Achieved the highest cumulative evaluation score for engineering rigor, live real-time execution, and UX excellence."
  },
  {
    title: "Top 5 Finalist — STARK Official Hackathon",
    score: "Placed 4th of 79 Projects",
    issuer: "STARK Hackathon Committee",
    desc: "Competed against 79 international and regional engineering teams, advancing to the final showcase stage."
  },
  {
    title: "ALX Certificate of Appreciation",
    score: "Honored Peer Mentor",
    issuer: "ALX Africa",
    desc: "Recognized for exemplary peer mentoring, technical leadership, and cultivating a collaborative software learning space."
  }
];

export const skillsMatrix = {
  backend: [
    { name: "Go (Golang)", level: 90, note: "Concurrency, Goroutines, Channels, Microservices" },
    { name: "Node.js & Express", level: 95, note: "REST APIs, Middleware, Async Pipelines" },
    { name: "Socket.io", level: 92, note: "Real-time Bi-directional Event Streams" },
    { name: "Redis", level: 85, note: "In-memory Caching, Pub/Sub, Geohashing" },
    { name: "MongoDB & PostgreSQL", level: 90, note: "Complex Aggregations, Transactions, Schema Design" },
    { name: "C++", level: 80, note: "Algorithms, Data Structures, Memory Concepts" }
  ],
  frontend: [
    { name: "React 19 & Next.js", level: 95, note: "Server/Client Components, Suspense, Hooks" },
    { name: "TypeScript & JavaScript", level: 92, note: "Strict Typing, ESNext, Event Loop Mastery" },
    { name: "Tailwind CSS & shadcn/ui", level: 95, note: "Design Tokens, Fluid Typography, Micro-Layouts" },
    { name: "Redux & State Architecture", level: 88, note: "Predictable Global State, Middleware" },
    { name: "React Native", level: 82, note: "Cross-Platform Mobile Interfaces" }
  ],
  motionAndDesign: [
    { name: "UI/UX & Design Systems", level: 94, note: "Figma, Wireframing, User Research, Token Systems" },
    { name: "Kinetic Motion & Micro-Interactions", level: 92, note: "Spring Physics, Fluid Transitions, Pacing" },
    { name: "WebGL & Canvas 2D/GLSL", level: 85, note: "Particle Systems, Math-Driven Procedural Visuals" },
    { name: "Spatial & Sound UI", level: 88, note: "Web Audio API Synthesis, Spatial Audio, Feedback" }
  ],
  devopsAndTools: [
    { name: "Docker & Containerization", level: 85, note: "Multi-stage Builds, Container Orchestration" },
    { name: "Git & GitHub Actions", level: 92, note: "CI/CD Workflows, Automation, Branching Models" },
    { name: "Testing (Jest & SuperTest)", level: 88, note: "Unit, Integration & API Endpoint Testing" },
    { name: "Deployment (Vercel, Render, EthioDeploy)", level: 90, note: "Edge Functions, DNS, Production Deploy" }
  ]
};

