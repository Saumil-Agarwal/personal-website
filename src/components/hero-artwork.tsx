export function HeroArtwork() {
  return (
    <div
      className="hero-artwork"
      data-testid="hero-artwork"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 480 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="hero-artwork-svg"
        focusable="false"
      >
        {/* Technical grid */}
        <g className="artwork-grid" opacity="0.08">
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`h${i}`}
              x1="40"
              y1={40 + i * 33.3}
              x2="440"
              y2={40 + i * 33.3}
              stroke="var(--accent)"
              strokeWidth="0.5"
            />
          ))}
          {Array.from({ length: 13 }, (_, i) => (
            <line
              key={`v${i}`}
              x1={40 + i * 33.3}
              y1="40"
              x2={40 + i * 33.3}
              y2="440"
              stroke="var(--accent)"
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* Radial glow */}
        <defs>
          <radialGradient id="hero-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.18" />
            <stop offset="70%" stopColor="var(--accent)" stopOpacity="0.04" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="core-fill" cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor="#00e5a0" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#00a070" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#004d36" stopOpacity="0.08" />
          </radialGradient>
        </defs>
        <circle cx="240" cy="240" r="200" fill="url(#hero-glow)" />

        {/* Orbit rings */}
        <ellipse
          className="orbit-1"
          cx="240"
          cy="240"
          rx="150"
          ry="150"
          stroke="var(--accent)"
          strokeWidth="0.7"
          strokeDasharray="6 8"
          opacity="0.25"
        />
        <g className="orbit-tilt-2" transform="rotate(30 240 240)">
          <ellipse
            className="orbit-2"
            cx="240"
            cy="240"
            rx="110"
            ry="110"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeDasharray="4 12"
            opacity="0.18"
          />
        </g>
        <g className="orbit-tilt-3" transform="rotate(-15 240 240)">
          <ellipse
            className="orbit-3"
            cx="240"
            cy="240"
            rx="185"
            ry="185"
            stroke="var(--accent)"
            strokeWidth="0.5"
            strokeDasharray="2 16"
            opacity="0.12"
          />
        </g>

        {/* Organic emerald core */}
        <g className="artwork-core">
          <path
            d="M240 140 C280 155, 320 190, 325 240 C330 290, 295 330, 240 340 C185 350, 150 310, 155 240 C158 185, 200 145, 240 140Z"
            fill="url(#core-fill)"
            stroke="var(--accent)"
            strokeWidth="1"
            opacity="0.7"
          />
          <path
            d="M240 160 C270 170, 300 200, 305 240 C310 275, 280 310, 240 318 C200 325, 175 295, 178 240 C180 200, 210 165, 240 160Z"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>

        {/* Connecting paths */}
        <g className="artwork-paths" opacity="0.2">
          <path
            d="M240 90 L240 155"
            stroke="var(--accent)"
            strokeWidth="0.7"
          />
          <path
            d="M370 170 L310 210"
            stroke="var(--accent)"
            strokeWidth="0.7"
          />
          <path
            d="M370 330 L305 285"
            stroke="var(--accent)"
            strokeWidth="0.7"
          />
          <path
            d="M110 330 L175 280"
            stroke="var(--accent)"
            strokeWidth="0.7"
          />
          <path
            d="M110 170 L170 210"
            stroke="var(--accent)"
            strokeWidth="0.7"
          />
        </g>

        {/* Network nodes */}
        <g className="artwork-nodes">
          <circle className="node node-1" cx="240" cy="90" r="5" fill="var(--accent)" opacity="0.7" />
          <circle className="node node-2" cx="370" cy="170" r="4" fill="var(--accent)" opacity="0.55" />
          <circle className="node node-3" cx="370" cy="330" r="4.5" fill="var(--accent)" opacity="0.6" />
          <circle className="node node-4" cx="110" cy="330" r="3.5" fill="var(--accent)" opacity="0.5" />
          <circle className="node node-5" cx="110" cy="170" r="4" fill="var(--accent)" opacity="0.55" />
        </g>

        {/* Scan sweep line */}
        <line
          className="scan-sweep"
          x1="80"
          y1="240"
          x2="400"
          y2="240"
          stroke="var(--accent)"
          strokeWidth="0.5"
          opacity="0.1"
        />
      </svg>

      <span className="artwork-caption">GENERATIVE SYSTEM / 01</span>
    </div>
  );
}
