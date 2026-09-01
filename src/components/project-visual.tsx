import type { Project } from "@/content/types";

export const visualKinds = {
  "jira-github-autopilot": "workflow",
  "rdma-qos": "network",
  "go-security-microservice": "services",
  "tenant-isolation": "layers",
  "nats-jetstream-telemetry": "stream",
  "twofold-editions": "object",
} as const;

type VisualKind = (typeof visualKinds)[keyof typeof visualKinds] | "neutral";

function WorkflowVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <rect x="8" y="38" width="28" height="24" rx="4" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5" />
      <text x="22" y="53" textAnchor="middle" fill="var(--accent)" fontSize="7" fontFamily="var(--font-geist-mono)" opacity="0.6">ISSUE</text>
      <line x1="36" y1="50" x2="56" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" strokeDasharray="3 2" />
      <circle cx="66" cy="50" r="10" stroke="var(--accent)" strokeWidth="0.8" opacity="0.45" />
      <circle cx="66" cy="50" r="3" fill="var(--accent)" opacity="0.35" />
      <line x1="76" y1="50" x2="88" y2="35" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="76" y1="50" x2="88" y2="65" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <circle cx="96" cy="35" r="7" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <text x="96" y="37" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.5">AG</text>
      <circle cx="96" cy="65" r="7" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <text x="96" y="67" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.5">AG</text>
      <line x1="103" y1="35" x2="120" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="103" y1="65" x2="120" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <rect x="120" y="40" width="20" height="20" rx="3" stroke="var(--accent)" strokeWidth="0.8" opacity="0.45" />
      <text x="130" y="53" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.5">TEST</text>
      <line x1="140" y1="50" x2="158" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" strokeDasharray="3 2" />
      <rect x="158" y="38" width="34" height="24" rx="4" stroke="var(--accent)" strokeWidth="0.8" opacity="0.5" />
      <text x="175" y="53" textAnchor="middle" fill="var(--accent)" fontSize="6" fontFamily="var(--font-geist-mono)" opacity="0.6">PR</text>
    </svg>
  );
}

function NetworkVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <line x1="20" y1="30" x2="180" y2="30" stroke="var(--accent)" strokeWidth="0.6" opacity="0.15" />
      <line x1="20" y1="50" x2="180" y2="50" stroke="var(--accent)" strokeWidth="0.6" opacity="0.15" />
      <line x1="20" y1="70" x2="180" y2="70" stroke="var(--accent)" strokeWidth="0.6" opacity="0.15" />
      <rect x="15" y="22" width="30" height="16" rx="3" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <rect x="15" y="42" width="30" height="16" rx="3" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <rect x="15" y="62" width="30" height="16" rx="3" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <rect x="155" y="22" width="30" height="16" rx="3" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <rect x="155" y="42" width="30" height="16" rx="3" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      <rect x="155" y="62" width="30" height="16" rx="3" stroke="var(--accent)" strokeWidth="0.7" opacity="0.4" />
      {/* Priority traffic lanes */}
      <rect x="55" y="26" width="90" height="8" rx="2" fill="var(--accent)" opacity="0.12" />
      <rect x="55" y="46" width="90" height="8" rx="2" fill="var(--accent)" opacity="0.07" />
      <rect x="55" y="66" width="90" height="8" rx="2" fill="var(--accent)" opacity="0.05" />
      <circle cx="75" cy="30" r="2.5" fill="var(--accent)" opacity="0.5" className="node node-1" />
      <circle cx="100" cy="30" r="2" fill="var(--accent)" opacity="0.4" className="node node-2" />
      <circle cx="130" cy="30" r="2.5" fill="var(--accent)" opacity="0.45" className="node node-3" />
      <circle cx="85" cy="50" r="2" fill="var(--accent)" opacity="0.3" />
      <circle cx="120" cy="50" r="2" fill="var(--accent)" opacity="0.3" />
      <text x="100" y="95" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.3">PFC / ECN</text>
    </svg>
  );
}

function ServicesVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <rect x="75" y="28" width="50" height="44" rx="6" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
      <text x="100" y="48" textAnchor="middle" fill="var(--accent)" fontSize="6" fontFamily="var(--font-geist-mono)" opacity="0.5">SVC</text>
      <text x="100" y="58" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.3">GO</text>
      <line x1="20" y1="30" x2="75" y2="40" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" strokeDasharray="3 3" />
      <line x1="20" y1="50" x2="75" y2="50" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" strokeDasharray="3 3" />
      <line x1="20" y1="70" x2="75" y2="60" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" strokeDasharray="3 3" />
      <circle cx="15" cy="30" r="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.35" />
      <circle cx="15" cy="50" r="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.35" />
      <circle cx="15" cy="70" r="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.35" />
      <line x1="125" y1="40" x2="165" y2="35" stroke="var(--accent)" strokeWidth="0.6" opacity="0.2" />
      <line x1="125" y1="60" x2="165" y2="65" stroke="var(--accent)" strokeWidth="0.6" opacity="0.2" />
      <rect x="165" y="25" width="22" height="20" rx="3" stroke="var(--accent)" strokeWidth="0.6" opacity="0.3" />
      <rect x="165" y="55" width="22" height="20" rx="3" stroke="var(--accent)" strokeWidth="0.6" opacity="0.3" />
    </svg>
  );
}

function LayersVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <rect x="30" y="12" width="140" height="20" rx="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.2" fill="var(--accent)" fillOpacity="0.03" />
      <text x="100" y="25" textAnchor="middle" fill="var(--accent)" fontSize="6" fontFamily="var(--font-geist-mono)" opacity="0.35">TENANT A</text>
      <rect x="30" y="40" width="140" height="20" rx="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" fill="var(--accent)" fillOpacity="0.05" />
      <text x="100" y="53" textAnchor="middle" fill="var(--accent)" fontSize="6" fontFamily="var(--font-geist-mono)" opacity="0.4">ISOLATION</text>
      <rect x="30" y="68" width="140" height="20" rx="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.2" fill="var(--accent)" fillOpacity="0.03" />
      <text x="100" y="81" textAnchor="middle" fill="var(--accent)" fontSize="6" fontFamily="var(--font-geist-mono)" opacity="0.35">TENANT B</text>
      <line x1="30" y1="32" x2="170" y2="32" stroke="var(--accent)" strokeWidth="1" opacity="0.15" strokeDasharray="4 3" />
      <line x1="30" y1="60" x2="170" y2="60" stroke="var(--accent)" strokeWidth="1" opacity="0.15" strokeDasharray="4 3" />
      <circle cx="55" cy="22" r="2.5" fill="var(--accent)" opacity="0.3" />
      <circle cx="145" cy="22" r="2.5" fill="var(--accent)" opacity="0.3" />
      <circle cx="55" cy="78" r="2.5" fill="var(--accent)" opacity="0.3" />
      <circle cx="145" cy="78" r="2.5" fill="var(--accent)" opacity="0.3" />
    </svg>
  );
}

function StreamVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <rect x="10" y="35" width="30" height="30" rx="5" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
      <text x="25" y="53" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.5">SRC</text>
      <line x1="40" y1="50" x2="70" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="60" y1="46" x2="70" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="60" y1="54" x2="70" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      {/* Stream */}
      <rect x="70" y="30" width="60" height="40" rx="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" fill="var(--accent)" fillOpacity="0.03" />
      <circle cx="82" cy="45" r="2" fill="var(--accent)" opacity="0.4" className="node node-1" />
      <circle cx="92" cy="50" r="2" fill="var(--accent)" opacity="0.35" className="node node-2" />
      <circle cx="102" cy="45" r="2" fill="var(--accent)" opacity="0.4" className="node node-3" />
      <circle cx="112" cy="55" r="2" fill="var(--accent)" opacity="0.35" />
      <circle cx="118" cy="45" r="2" fill="var(--accent)" opacity="0.3" />
      <text x="100" y="64" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.3">JETSTREAM</text>
      <line x1="130" y1="42" x2="155" y2="30" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
      <line x1="130" y1="50" x2="155" y2="50" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
      <line x1="130" y1="58" x2="155" y2="70" stroke="var(--accent)" strokeWidth="0.6" opacity="0.25" />
      <rect x="155" y="20" width="32" height="18" rx="3" stroke="var(--accent)" strokeWidth="0.6" opacity="0.3" />
      <text x="171" y="32" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.4">C1</text>
      <rect x="155" y="42" width="32" height="18" rx="3" stroke="var(--accent)" strokeWidth="0.6" opacity="0.3" />
      <text x="171" y="54" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.4">C2</text>
      <rect x="155" y="62" width="32" height="18" rx="3" stroke="var(--accent)" strokeWidth="0.6" opacity="0.3" />
      <text x="171" y="74" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.4">C3</text>
    </svg>
  );
}

function ObjectVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      {/* Layered collectible silhouette */}
      <rect x="65" y="15" width="70" height="70" rx="8" stroke="var(--accent)" strokeWidth="0.6" opacity="0.15" transform="rotate(3 100 50)" />
      <rect x="60" y="18" width="70" height="70" rx="8" stroke="var(--accent)" strokeWidth="0.7" opacity="0.25" transform="rotate(-2 95 53)" />
      <rect x="55" y="20" width="70" height="60" rx="8" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" fill="var(--accent)" fillOpacity="0.04" />
      <path
        d="M75 55 C80 40, 95 32, 105 38 C115 44, 112 58, 100 62 C88 66, 72 63, 75 55Z"
        stroke="var(--accent)"
        strokeWidth="0.7"
        opacity="0.3"
        fill="var(--accent)"
        fillOpacity="0.06"
      />
      <circle cx="90" cy="48" r="3" fill="var(--accent)" opacity="0.25" />
      <text x="90" y="75" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.3">EDITION</text>
    </svg>
  );
}

function NeutralVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <circle cx="100" cy="50" r="30" stroke="var(--accent)" strokeWidth="0.7" opacity="0.2" />
      <circle cx="100" cy="50" r="15" stroke="var(--accent)" strokeWidth="0.5" opacity="0.15" strokeDasharray="3 4" />
      <circle cx="100" cy="50" r="3" fill="var(--accent)" opacity="0.3" />
    </svg>
  );
}

const visuals: Record<VisualKind, () => React.JSX.Element> = {
  workflow: WorkflowVisual,
  network: NetworkVisual,
  services: ServicesVisual,
  layers: LayersVisual,
  stream: StreamVisual,
  object: ObjectVisual,
  neutral: NeutralVisual,
};

export function ProjectVisual({ slug }: { slug: Project["slug"] }) {
  const kind: VisualKind =
    (visualKinds as Record<string, VisualKind>)[slug] ?? "neutral";
  const Visual = visuals[kind];

  return (
    <div
      className={`project-visual project-visual--${kind}`}
      data-project-visual={slug}
      aria-hidden="true"
    >
      <Visual />
    </div>
  );
}
