import type {
  Education,
  Experience,
  Profile,
  Project,
  QuestionAnswer,
  SkillGroup,
} from "./types";

export const profile: Profile = {
  name: "Saumil Agarwal",
  tagline:
    "Member of Technical Staff · Distributed Systems · Network Security · Agentic AI",
  location: "Bengaluru, India",
  email: "saumil.agarwal.28@gmail.com",
  summary:
    "I build and own production systems at the intersection of distributed infrastructure, network security, and applied AI. Over four years, I have led cross-functional work from design through production support. I am interested in teams building useful, production-grade applied AI products.",
  interests:
    "Away from a screen, I am always up for badminton, padel, or squash; cooking new cuisines; walking around lakes; meeting new people; trying new experiences; and making cool things.",
  resumeUrl: "/saumil-agarwal-resume.pdf",
  availability: "Open to conversations about applied AI and systems work.",
  links: {
    github: "https://github.com/Saumil-Agarwal",
    linkedin: "https://linkedin.com/in/saumil-agarwal",
  },
};

export const experience: Experience[] = [
  {
    company: "Nutanix",
    role: "Member of Technical Staff – 2",
    period: "Aug 2024 – Present",
    location: "Bengaluru, India",
    highlights: [
      "Built production-facing systems across network security, distributed telemetry, and developer workflows.",
      "Led cross-functional delivery and production ownership for customer-impacting capabilities.",
    ],
  },
  {
    company: "Nutanix",
    role: "Member of Technical Staff – 1",
    period: "Jul 2022 – Aug 2024",
    location: "Bengaluru, India",
    highlights: [
      "Improved reliability in distributed telemetry systems and resolved release-blocking systems issues.",
      "Won a company-wide hackathon by delivering an end-to-end security workflow prototype.",
    ],
  },
  {
    company: "Nutanix",
    role: "Member of Technical Staff – Intern",
    period: "Jan 2022 – Jun 2022",
    location: "Bengaluru, India",
    highlights: [
      "Automated release and deployment work, reducing shipment time from weeks to days.",
      "Designed a more scalable telemetry export path for large deployments.",
    ],
  },
  {
    company: "Wells Fargo",
    role: "Software Engineer Intern",
    period: "May 2021 – Jul 2021",
    location: "Remote",
    highlights: [
      "Developed an explainable machine-learning workflow for loan default risk assessment.",
    ],
  },
  {
    company: "Dalhousie University",
    role: "Machine Learning Research Assistant",
    period: "Jul 2021 – Oct 2021",
    location: "Remote · MITACS Globalink Scholar",
    highlights: [
      "Applied stochastic processes and machine learning to biological network data.",
    ],
  },
  {
    company: "Twofold Editions",
    role: "Founder",
    period: "Jul 2026 – Present",
    location: "India",
    highlights: [
      "Designing and manufacturing 3D-printed collectibles while owning the customer experience.",
    ],
  },
];

export const education: Education[] = [
  {
    institution: "BITS Pilani",
    qualification:
      "B.E. (Hons.) Computer Science · Minor in Data Science",
    period: "2018 – 2022",
    detail: "9.09 CGPA · Merit Scholarship recipient",
  },
];

export const projects: Project[] = [
  {
    slug: "jira-github-autopilot",
    title: "Jira → GitHub Autopilot",
    blurb:
      "An agentic workflow for turning software issues into production-ready pull requests.",
    tags: ["Agentic AI", "Developer Experience", "Automation"],
    highlights: [
      "Automated the path from Jira issue through reproduction, code generation, testing, review, fix refinement, and pull-request creation.",
      "Enabled parallel issue processing and reduced repetitive engineering work by 2–3 hours per issue.",
    ],
    details: {
      problem: "Issue-to-fix work repeatedly consumed engineering time across reproduction, diagnosis, implementation, validation, and review.",
      approach: "Designed an agentic workflow that carries evidence through a deliberate issue → reproduce → generate → test → review → fix → pull-request loop.",
      architecture: ["Jira issue ingestion and bug reproduction", "Evidence-grounded code generation", "Test execution and automated code review", "Fix refinement and GitHub pull-request creation"],
    },
    featured: true,
  },
  {
    slug: "rdma-qos",
    title: "RDMA QoS",
    blurb:
      "Lossless AI and storage traffic on NVIDIA Mellanox NICs without sacrificing latency-sensitive workloads.",
    tags: ["Networking", "RDMA", "Performance"],
    highlights: [
      "Applied PFC and ECN across SR-IOV network interfaces.",
      "Prioritized latency-sensitive traffic while supporting lossless transfer.",
    ],
    details: {
      problem: "AI and storage traffic needs lossless transfer, while latency-sensitive workloads still need predictable service on the same physical network.",
      approach: "Applied traffic classification and lossless Ethernet controls across NVIDIA Mellanox SR-IOV interfaces, balancing priority treatment with congestion feedback.",
      architecture: ["NVIDIA Mellanox NICs and SR-IOV virtual functions", "Priority Flow Control for lossless traffic classes", "ECN congestion signalling", "QoS policies separating throughput and latency-sensitive flows"],
    },
    featured: true,
  },
  {
    slug: "go-security-microservice",
    title: "Go Security Microservice",
    blurb:
      "A ground-up security policy management service built for efficient parallel execution.",
    tags: ["Go", "Microservices", "Network Security"],
    highlights: [
      "Replaced a Python-based architecture to improve efficiency and concurrency.",
      "Reduced the build pipeline from two hours to 30 minutes.",
    ],
    details: {
      problem: "The existing Python service and build path limited efficient parallel execution and made security-policy delivery slower than it needed to be.",
      approach: "Rebuilt the service around Go concurrency and explicit service boundaries, with production operations and build performance treated as part of the design.",
      architecture: ["Go microservice", "Concurrent policy-processing workers", "Network-security policy APIs", "Optimized build and delivery pipeline"],
    },
    featured: true,
  },
  {
    slug: "tenant-isolation",
    title: "Tenant Isolation",
    blurb:
      "A cross-platform isolation initiative for a network security product.",
    tags: ["Leadership", "Security", "Platform"],
    highlights: [
      "Led a four-person team and coordinated integration with 12 engineering teams.",
      "Delivered platform-wide safeguards against cross-tenant data access.",
    ],
    details: {
      problem: "A shared platform needed consistent safeguards so one tenant could never access another tenant’s data across product boundaries.",
      approach: "Led the platform-wide isolation effort, aligning interfaces and enforcement points across a four-person core team and 12 integrating engineering teams.",
      architecture: ["Tenant-aware request context", "Policy enforcement at service boundaries", "Shared storage with tenant-scoped access", "Cross-platform integration contracts and validation"],
    },
    featured: true,
  },
  {
    slug: "nats-jetstream-telemetry",
    title: "NATS JetStream Telemetry",
    blurb:
      "A reusable telemetry collector for concurrent consumers in distributed systems.",
    tags: ["NATS", "Distributed Systems", "Observability"],
    highlights: [
      "Reworked a distributed pipeline to improve synchronization.",
      "Created a reusable collector that multiple teams could consume concurrently.",
    ],
    details: {
      problem: "Multiple consumers needed reliable access to distributed telemetry without synchronization conflicts or one consumer blocking another.",
      approach: "Reworked the telemetry path around NATS JetStream and a reusable collector so producers could publish once while concurrent consumers processed independently.",
      architecture: ["Telemetry source and publisher", "NATS JetStream persistence", "Reusable collector abstraction", "Independent concurrent consumer paths"],
    },
    featured: true,
  },
  {
    slug: "twofold-editions",
    title: "Twofold Editions",
    blurb:
      "A 3D-printed collectibles studio spanning product design, manufacturing, and e-commerce.",
    tags: ["3D Printing", "Product", "E-commerce"],
    highlights: [
      "Owns the path from collectible design to fulfillment and customer experience.",
    ],
    details: {
      problem: "Meaningful routes, scenes, and fandom objects often remain digital or disposable instead of becoming personal objects people can keep.",
      approach: "Built a small-batch studio spanning product ideation, 3D design, printing, finishing, storefront operations, fulfillment, and customer experience.",
      architecture: ["Parametric and sculptural 3D product design", "Made-to-order additive manufacturing", "Running-map personalization and NFC options", "Direct-to-consumer storefront and fulfillment"],
    },
    featured: true,
    links: { website: "https://www.twofoldeditions.in" },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    name: "Languages & systems",
    skills: [
      "Go",
      "Python",
      "C/C++",
      "Distributed systems",
      "Network security",
      "Microservices",
      "Linux",
    ],
  },
  {
    name: "AI & infrastructure",
    skills: [
      "Agentic AI",
      "Machine learning",
      "API design",
      "Performance optimization",
      "Kubernetes",
      "Monitoring & visualization",
    ],
  },
];

export const qa: QuestionAnswer[] = [
  {
    question: "What does he enjoy outside work?",
    answer:
      "Saumil is always up for badminton, padel, or squash. He also enjoys cooking new cuisines, walking around lakes, meeting new people, trying new experiences, and making cool things.",
    keywords: ["interests", "hobbies", "outside", "badminton", "padel", "squash", "cooking", "people"],
  },
  {
    question: "What did he build at Nutanix?",
    answer:
      "Saumil has worked on production distributed infrastructure and network security, including reliable telemetry systems, traffic quality of service, developer workflows, and cross-platform isolation initiatives.",
    keywords: ["nutanix", "build", "experience", "work"],
  },
  {
    question: "Explain the agentic AI project",
    answer:
      "Jira → GitHub Autopilot is an agentic workflow that moves from an issue through bug reproduction, log analysis, fix generation, tests, and review toward a production-ready pull request.",
    keywords: ["agentic", "ai", "autopilot", "jira", "github", "project"],
  },
  {
    question: "Is he open to opportunities?",
    answer:
      "Yes. Saumil is open to conversations about applied AI and systems work, especially with teams building production-grade products.",
    keywords: ["open", "opportunities", "hiring", "available", "contact"],
  },
  {
    question: "What is his systems background?",
    answer:
      "His background spans Go and Python services, distributed telemetry, network security, Linux, performance optimization, and production ownership.",
    keywords: ["systems", "background", "distributed", "network", "security"],
  },
];

export const suggestedQuestions = qa.map((entry) => entry.question);
