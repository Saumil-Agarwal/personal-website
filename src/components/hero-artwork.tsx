const SystemNode = ({ x, y, label, wide = false }: { x: number; y: number; label: string; wide?: boolean }) => (
  <g data-system-node transform={`translate(${x} ${y})`}>
    <rect width={wide ? 126 : 92} height="56" rx="9" className="hero-node-surface" />
    <circle cx="16" cy="16" r="3" className="hero-status-dot" />
    <text x="14" y="36" className="hero-node-label">{label}</text>
    <path d={`M14 44 H${wide ? 110 : 76}`} className="hero-node-line" />
  </g>
);

export function HeroArtwork() {
  return (
    <div className="hero-artwork" data-testid="hero-artwork" aria-hidden="true">
      <svg viewBox="0 0 520 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-artwork-svg" focusable="false">
        <defs>
          <linearGradient id="route-glow" x1="0" x2="1">
            <stop stopColor="var(--accent)" stopOpacity="0.08" />
            <stop offset=".5" stopColor="var(--accent)" stopOpacity="0.75" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0.08" />
          </linearGradient>
          <radialGradient id="system-glow">
            <stop stopColor="var(--accent)" stopOpacity="0.16" />
            <stop offset="1" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="270" cy="205" r="185" fill="url(#system-glow)" />
        <rect x="22" y="22" width="476" height="356" rx="18" data-security-boundary className="hero-security-boundary" />
        <text x="42" y="50" className="hero-boundary-label">SECURE DISTRIBUTED PLANE</text>
        <path d="M134 126 C188 126 183 194 228 194" className="hero-route" />
        <path d="M134 274 C190 274 184 214 228 214" className="hero-route" />
        <path d="M354 204 C398 204 398 115 430 115" className="hero-route" />
        <path d="M354 204 C398 204 398 285 430 285" className="hero-route" />
        <SystemNode x={42} y={98} label="TELEMETRY" />
        <SystemNode x={42} y={246} label="POLICY" />
        <SystemNode x={228} y={176} label="AGENT CORE" wide />
        <SystemNode x={386} y={87} label="SYSTEMS" />
        <SystemNode x={386} y={257} label="SECURITY" />
        <g className="hero-packet hero-packet-1" data-data-packet><circle r="5" /></g>
        <g className="hero-packet hero-packet-2" data-data-packet><circle r="4" /></g>
        <g className="hero-packet hero-packet-3" data-data-packet><circle r="5" /></g>
        <g className="hero-packet hero-packet-4" data-data-packet><circle r="4" /></g>
        <g transform="translate(42 338)" className="hero-status-panel">
          <circle cx="4" cy="0" r="4" />
          <text x="16" y="4">05 NODES ONLINE</text>
          <text x="180" y="4">LATENCY 08MS</text>
          <text x="335" y="4">STATE HEALTHY</text>
        </g>
      </svg>
    </div>
  );
}
