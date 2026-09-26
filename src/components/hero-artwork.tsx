import { useId } from "react";

/** Deterministic geometry: identical server/client markup, no canvas or asset fetch. */
export function HeroArtwork() {
  const id = useId().replaceAll(":", "");
  return (
    <div className="hero-artwork" data-testid="hero-artwork" aria-hidden="true">
      <div className="core-coordinate">THE INTELLIGENCE CORE</div>
      <div className="neural-orbit">
        <svg className="hero-artwork-svg" viewBox="0 0 600 520" fill="none">
          <defs>
            <radialGradient id={`${id}-glow`}><stop stopColor="#b9ffe1" stopOpacity=".3" /><stop offset="1" stopColor="#69edbb" stopOpacity="0" /></radialGradient>
            <linearGradient id={`${id}-wire`} x1="100" y1="60" x2="470" y2="460" gradientUnits="userSpaceOnUse"><stop stopColor="#e5fff4" /><stop offset=".45" stopColor="#78f6bc" /><stop offset="1" stopColor="#194839" /></linearGradient>
          </defs>
          <circle cx="300" cy="260" r="235" fill={`url(#${id}-glow)`} />
          <g stroke="currentColor" opacity=".18"><path d="M0 260H600M300 0V520" /><circle cx="300" cy="260" r="239" strokeDasharray="2 9" data-security-boundary /><path d="M45 55h20m-10-10v20M535 465h20m-10-10v20M535 55h20m-10-10v20M45 465h20m-10-10v20" /></g>
          <g stroke={`url(#${id}-wire)`} strokeWidth=".8" transform="rotate(-28 300 260)">
            {Array.from({ length: 19 }, (_, i) => <ellipse key={`long-${i}`} cx="300" cy="260" rx={12 + i * 10.3} ry="196" opacity={.28 + i / 38} />)}
            {Array.from({ length: 15 }, (_, i) => {
              const y = (i - 7) * 24;
              const radius = Math.sqrt(196 ** 2 - y ** 2);
              return <ellipse key={`lat-${i}`} cx="300" cy={260 + y} rx={radius} ry={radius * .24} opacity=".65" />;
            })}
          </g>
          <g stroke="currentColor" strokeWidth="1"><ellipse cx="300" cy="260" rx="273" ry="78" transform="rotate(-28 300 260)" opacity=".5" /><ellipse cx="300" cy="260" rx="238" ry="93" transform="rotate(48 300 260)" opacity=".22" /></g>
          <g fill="currentColor">{[[73,365],[480,123],[364,429],[194,92]].map(([x,y],i) => <g key={i} data-system-node><circle cx={x} cy={y} r="4" data-data-packet /><circle cx={x} cy={y} r="10" fill="none" stroke="currentColor" opacity=".3" /></g>)}</g>
          <circle cx="300" cy="260" r="7" fill="#d4ffe7" /><circle cx="300" cy="260" r="17" stroke="currentColor" opacity=".3" />
        </svg>
      </div>
      <div className="core-caption"><span><i className="status-light" /> CONNECTED BY DESIGN</span><span>∞ POSSIBILITIES</span></div>
    </div>
  );
}
