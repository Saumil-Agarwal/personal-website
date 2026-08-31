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
  currently: "Member of Technical Staff at Nutanix and founder of Twofold Editions.",
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
      "Automated bug reproduction, log analysis, fix generation, testing, and code review.",
      "Enabled parallel issue processing and reduced repetitive engineering work by 2–3 hours per issue.",
    ],
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
