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
  const stages = [
    { id: "issue", label: "ISSUE", x: 7, y: 18, width: 34 },
    { id: "reproduce", label: "REPRO", x: 55, y: 18, width: 38 },
    { id: "generate", label: "CODE", x: 107, y: 18, width: 36 },
    { id: "test", label: "TEST", x: 157, y: 18, width: 36 },
    { id: "review", label: "REVIEW", x: 150, y: 64, width: 43 },
    { id: "fix", label: "FIX", x: 91, y: 64, width: 35 },
    { id: "pull-request", label: "PULL REQUEST", x: 7, y: 64, width: 60 },
  ] as const;

  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <path d="M41 30 H55 M93 30 H107 M143 30 H157 M175 42 V64 M150 76 H126 M91 76 H67" className="workflow-route" />
      <path d="M46 27 L51 30 L46 33 M98 27 L103 30 L98 33 M148 27 L153 30 L148 33 M172 51 L175 56 L178 51 M136 73 L131 76 L136 79 M77 73 L72 76 L77 79" className="workflow-arrows" />
      {stages.map((stage, index) => (
        <g key={stage.id} data-workflow-stage={stage.id}>
          <rect x={stage.x} y={stage.y} width={stage.width} height="24" rx="5" className={`workflow-stage${index === stages.length - 1 ? " workflow-stage--final" : ""}`} />
          <circle cx={stage.x + 7} cy={stage.y + 7} r="2" className="workflow-stage-dot" />
          <text x={stage.x + stage.width / 2} y={stage.y + 15} className="workflow-label">{stage.label}</text>
        </g>
      ))}
      <circle r="2.8" data-workflow-progress className="workflow-progress" />
    </svg>
  );
}

function NetworkVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <rect x="7" y="22" width="38" height="56" rx="5" className="diagram-box" />
      <text x="26" y="43" className="diagram-label">GPU A</text><text x="26" y="56" className="diagram-small">MELLANOX</text>
      <rect x="155" y="22" width="38" height="56" rx="5" className="diagram-box" />
      <text x="174" y="43" className="diagram-label">GPU B</text><text x="174" y="56" className="diagram-small">MELLANOX</text>
      <rect x="52" y="23" width="96" height="16" rx="3" className="qos-lane qos-lane-high" />
      <rect x="52" y="44" width="96" height="13" rx="3" className="qos-lane" />
      <rect x="52" y="62" width="96" height="13" rx="3" className="qos-lane" />
      <text x="100" y="34" className="diagram-small">PRIORITY 3 · LOSSLESS</text>
      <text x="100" y="54" className="diagram-small">PRIORITY 1</text>
      <circle cx="82" cy="30" r="3" data-rdma-bit className="rdma-bit rdma-bit-1" />
      <circle cx="102" cy="30" r="2.4" data-rdma-bit className="rdma-bit rdma-bit-2" />
      <circle cx="126" cy="30" r="2.6" data-rdma-bit className="rdma-bit rdma-bit-3" />
      <circle cx="129" cy="50" r="3" data-ecn-mark className="ecn-mark" />
      <text x="129" y="87" className="diagram-small">ECN MARK</text>
      <path d="M146 68 H58 M64 64 L58 68 L64 72" data-pfc-signal className="pfc-signal" />
      <text x="100" y="96" className="diagram-small">PFC PAUSE ←</text>
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
      {[20, 78, 136].map((x, index) => <g key={x} data-tenant><rect x={x} y="10" width="44" height="22" rx="4" className="diagram-box" /><text x={x + 22} y="24" className="diagram-label">TENANT {String.fromCharCode(65 + index)}</text><path d={`M${x + 22} 32 V48`} className="tenant-path" /><rect x={x + 5} y="48" width="34" height="15" rx="3" className="isolation-gate" /><text x={x + 22} y="58" className="diagram-small">ISOLATE</text><path d={`M${x + 22} 63 V75`} className="tenant-path" /></g>)}
      <g data-shared-database><ellipse cx="100" cy="78" rx="82" ry="8" className="database-shape" /><path d="M18 78 V89 C18 94 55 98 100 98 C145 98 182 94 182 89 V78" className="database-shape" /><text x="100" y="90" className="diagram-small">SHARED DB · SCOPED ROWS</text></g>
    </svg>
  );
}

function StreamVisual() {
  return (
    <svg viewBox="0 0 200 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="project-visual-svg" focusable="false">
      <rect x="10" y="35" width="30" height="30" rx="5" stroke="var(--accent)" strokeWidth="0.8" opacity="0.4" />
      <text x="25" y="53" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.5">SRC</text>
      <line x1="40" y1="50" x2="70" y2="50" data-stream-leg="source" className="stream-path" />
      <line x1="60" y1="46" x2="70" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      <line x1="60" y1="54" x2="70" y2="50" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" />
      {/* Stream */}
      <rect x="70" y="30" width="60" height="40" rx="4" stroke="var(--accent)" strokeWidth="0.7" opacity="0.3" fill="var(--accent)" fillOpacity="0.03" />
      <circle r="2.7" className="stream-packet stream-packet-source" />
      <circle r="2.7" className="stream-packet stream-packet-c1" />
      <circle r="2.7" className="stream-packet stream-packet-c2" />
      <text x="100" y="64" textAnchor="middle" fill="var(--accent)" fontSize="5" fontFamily="var(--font-geist-mono)" opacity="0.3">JETSTREAM</text>
      <line x1="130" y1="42" x2="155" y2="30" data-stream-leg="consumer-1" className="stream-path" />
      <line x1="130" y1="50" x2="155" y2="50" data-stream-leg="consumer-2" className="stream-path" />
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
      <g data-product="running-map"><rect x="10" y="17" width="52" height="64" rx="4" className="product-frame" /><path d="M18 59 C27 29 32 72 43 39 C49 22 55 46 55 46" className="product-detail" /><circle cx="43" cy="39" r="2" className="product-dot" /><text x="36" y="91" className="diagram-small">RUN MAP</text></g>
      <g data-product="tyre-holder"><ellipse cx="101" cy="68" rx="25" ry="8" className="product-frame" /><ellipse cx="101" cy="58" rx="25" ry="8" className="product-frame" /><ellipse cx="101" cy="48" rx="25" ry="8" className="product-frame" /><path d="M90 45 L96 14 H106 L112 45" className="product-detail" /><text x="101" y="91" className="diagram-small">TYRE HOLDER</text></g>
      <g data-product="book-nook"><path d="M143 18 H190 V81 H143 Z M150 74 V26 H182 V74 Z" className="product-frame" /><path d="M160 74 V45 H173 V74 M166 45 V32" className="product-detail" /><circle cx="166" cy="38" r="3" className="product-dot" /><text x="166" y="91" className="diagram-small">BOOK NOOK</text></g>
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
