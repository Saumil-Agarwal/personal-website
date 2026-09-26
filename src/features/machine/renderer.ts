type Vec = [number, number, number];
type Block = { center: Vec; size: Vec; signal: boolean };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (n: number) => Math.max(0, Math.min(1, n));
const smooth = (n: number) => n * n * (3 - 2 * n);
const vectorMix = (a: Vec, b: Vec, t: number): Vec => a.map((n, i) => mix(n, b[i], t)) as Vec;

// The same physical modules are rearranged throughout the story. There is no
// independent animation clock: a scroll position always produces the same frame.
function moduleAt(index: number, scene: number): Block {
  const group = Math.floor(index / 9), column = index % 3, row = Math.floor(index % 9 / 3);
  const x = (column - 1) * 47, z = (row - 1) * 47;
  const signal = index % 7 === 0;
  if (scene === 0) return { center: [x, (group - 2.5) * 13, z], size: [22, 5, 22], signal };
  if (scene === 1) return { center: [x, (group - 2.5) * 55, z], size: [22, 5, 22], signal };
  if (scene === 2 || scene === 3) return { center: [(group % 3 - 1) * 139 + x * .5, (Math.floor(group / 3) - .5) * 148, z * .5], size: [10, 7, 10], signal };
  if (scene === 4) return { center: [(group - 2.5) * 45, (column - 1) * 31, (row - 1) * 105], size: [17, 6, 43], signal };
  if (scene === 5) { const angle = index / 54 * Math.PI * 2; return { center: [Math.cos(angle) * 145, Math.sin(angle) * 145, (index % 3 - 1) * 24], size: [14, 9, 14], signal }; }
  if (scene === 6) return { center: [(group % 3 - 1) * 141 + x * .7, (Math.floor(group / 3) - .5) * 126, z * .7], size: [15, 8, 15], signal };
  if (scene === 7) { const angle = group / 6 * Math.PI * 2; return { center: [Math.cos(angle) * 160 + x * .45, Math.sin(angle) * 150, z * .45], size: [10, 6, 10], signal }; }
  if (scene === 8) { const angle = group / 6 * Math.PI * 2; return { center: [Math.cos(angle) * 67 + x * .7, (group - 2.5) * 27, Math.sin(angle) * 67 + z * .7], size: [16, 9, 16], signal }; }
  const angle = index / 54 * Math.PI * 6;
  return { center: [Math.cos(angle) * 100, (index - 27) * 6, Math.sin(angle) * 100], size: [9, 4, 9], signal };
}

const sceneLabels = ["SA / CORE", "SYSTEM LAYERS", "AGENT ORCHESTRATION", "ISSUE → PULL REQUEST", "LOSSLESS FABRIC", "SECURE BY DESIGN", "TENANT BOUNDARIES", "ONE SIGNAL. MANY CONSUMERS.", "DIGITAL → PHYSICAL", "ALWAYS BUILDING"];

// Labels explain the visual metaphor; they are not claims about deployed services.
const annotations: { module: number; text: string }[][] = [
  [],
  ["APPLIED AI", "SECURITY", "ISOLATION", "SERVICES", "TELEMETRY", "INFRASTRUCTURE"].map((text, i) => ({ module: i * 9 + 4, text })),
  ["REPRODUCE", "BUILD", "TEST", "ISSUE", "REVIEW", "PULL REQUEST"].map((text, i) => ({ module: i * 9 + 4, text })),
  ["REPRODUCE", "BUILD", "TEST", "ISSUE", "REVIEW", "PULL REQUEST"].map((text, i) => ({ module: i * 9 + 4, text })),
  [{ module: 4, text: "AI TRAFFIC" }, { module: 22, text: "PFC / ECN" }, { module: 49, text: "STORAGE" }],
  [{ module: 9, text: "POLICY" }, { module: 27, text: "RULES" }, { module: 45, text: "ENFORCEMENT" }],
  [{ module: 4, text: "TENANT A" }, { module: 22, text: "TENANT B" }, { module: 40, text: "ISOLATION" }],
  [{ module: 4, text: "PUBLISH" }, { module: 13, text: "JETSTREAM" }, { module: 31, text: "CONSUMER A" }, { module: 40, text: "CONSUMER B" }],
  [{ module: 4, text: "DESIGN" }, { module: 22, text: "PRINT" }, { module: 49, text: "COLLECT" }],
  [],
];

export function drawMachine(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number, light: boolean) {
  const mobile = width < 761;
  const scene = Math.min(9, Math.floor(progress));
  const t = smooth(progress - scene);
  const p = Math.min(progress, 9);
  const accent = light ? "#3d6620" : "#c1f788";
  const ink = light ? "#2c3e36" : "#cddacb";
  const trace = light ? "#618073" : "#688074";
  const unit = Math.min(width * (mobile ? .0022 : .00125), height * (mobile ? .00069 : .0019), 1.6);
  const centerX = width * (mobile ? .53 : .739);
  const centerY = height * (mobile ? .72 : .51);
  // Large, reversible camera arcs connect each composition. The opening push
  // starts immediately; later turns expose a new face of each architecture.
  const yaw = -.62 + p * .37 + Math.sin(p * Math.PI) * .22;
  const pitch = .62 - Math.sin(p * .62) * .32;
  const push = 1 + Math.sin((p % 1) * Math.PI) * .28;
  const project = (v: Vec): Vec => {
    const x = v[0] * Math.cos(yaw) - v[2] * Math.sin(yaw);
    const z = v[0] * Math.sin(yaw) + v[2] * Math.cos(yaw);
    const y = v[1] * Math.cos(pitch) - z * Math.sin(pitch);
    const depth = v[1] * Math.sin(pitch) + z * Math.cos(pitch);
    const scale = 760 / (760 + depth) * unit * push;
    return [centerX + x * scale, centerY + y * scale, depth];
  };
  const line = (a: Vec, b: Vec, color: string, alpha = 1, weight = 1) => {
    const start = project(a), end = project(b);
    ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = weight;
    ctx.beginPath(); ctx.moveTo(start[0], start[1]); ctx.lineTo(end[0], end[1]); ctx.stroke(); ctx.globalAlpha = 1;
  };
  ctx.clearRect(0, 0, width, height);
  const glow = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 390 * unit);
  glow.addColorStop(0, light ? "#90b58820" : "#a1de6112"); glow.addColorStop(1, "#00000000");
  ctx.fillStyle = glow; ctx.fillRect(0, 0, width, height);

  // A surveyed ground plane and etched board traces establish scale and depth.
  for (let i = -8; i <= 8; i++) {
    line([i * 44, 205, -352], [i * 44, 205, 352], trace, .14, .6);
    line([-352, 205, i * 44], [352, 205, i * 44], trace, .14, .6);
  }
  const boardOpacity = clamp(1 - p / 1.4);
  if (boardOpacity > 0) {
    for (let i = -6; i <= 6; i++) {
      for (const side of [-1, 1]) {
        const start: Vec = [side * 83, 49, i * 11];
        const middle: Vec = [side * (125 + Math.abs(i) * 5), 49, i * 11];
        const end: Vec = [side * 240, 49, i * 24];
        line(start, middle, accent, boardOpacity * .5);
        line(middle, end, trace, boardOpacity * .5);
        const dot = project(end); ctx.fillStyle = accent; ctx.globalAlpha = boardOpacity * .65;
        ctx.fillRect(dot[0] - 1.5, dot[1] - 1.5, 3, 3); ctx.globalAlpha = 1;
      }
    }
  }
  // Connections reveal the meaning of the form rather than adding a particle cloud.
  if (p > 1.4 && p < 8.8) {
    const opacity = clamp((p - 1.4) * 2) * clamp(8.8 - p);
    const order = Math.round(p) === 2 || Math.round(p) === 3 ? [3, 0, 1, 2, 4, 5] : [0, 1, 2, 3, 4, 5];
    for (let i = 0; i < 5; i++) {
      const from = order[i] * 9 + 4, to = order[i + 1] * 9 + 4;
      const start = vectorMix(moduleAt(from, scene).center, moduleAt(from, Math.min(scene + 1, 9)).center, t);
      const end = vectorMix(moduleAt(to, scene).center, moduleAt(to, Math.min(scene + 1, 9)).center, t);
      const bend: Vec = [end[0], start[1], start[2] + 32];
      line(start, bend, accent, opacity * .5); line(bend, end, accent, opacity * .5);
      const packet = project(vectorMix(start, end, (p * 2 + i * .17) % 1));
      ctx.fillStyle = accent; ctx.globalAlpha = opacity; ctx.beginPath(); ctx.arc(packet[0], packet[1], 2.5, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
    }
  }
  const modules = Array.from({ length: 54 }, (_, i) => {
    const a = moduleAt(i, scene), b = moduleAt(i, Math.min(scene + 1, 9));
    return { center: vectorMix(a.center, b.center, t), size: vectorMix(a.size, b.size, t), signal: a.signal, index: i };
  }).sort((a, b) => project(b.center)[2] - project(a.center)[2]);
  const corners = [[-1,-1,-1],[1,-1,-1],[1,-1,1],[-1,-1,1],[-1,1,-1],[1,1,-1],[1,1,1],[-1,1,1]];
  const faces = [[0,1,2,3],[0,4,5,1],[1,5,6,2],[2,6,7,3],[3,7,4,0]];
  for (const block of modules) {
    const points = corners.map(c => project(c.map((n, i) => block.center[i] + n * block.size[i]) as Vec));
    for (let faceIndex = 0; faceIndex < faces.length; faceIndex++) {
      const face = faces[faceIndex];
      // Backface culling keeps rotating opaque modules from showing through.
      const [a,b,c] = face.map(i => points[i]);
      if ((b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]) > 0) continue;
      ctx.beginPath(); face.forEach((index, i) => i ? ctx.lineTo(points[index][0], points[index][1]) : ctx.moveTo(points[index][0], points[index][1])); ctx.closePath();
      const shades = light ? ["#c1cdc3", "#839d8b", "#a5b8aa", "#b2c1b5", "#8fa898"] : ["#333f3a", "#111b17", "#202e27", "#28372f", "#17261e"];
      const signals = light ? ["#718c48", "#496331", "#5e783c", "#6c8546", "#526a38"] : ["#c1f788", "#415738", "#769e55", "#9bc76c", "#526e40"];
      ctx.fillStyle = (block.signal ? signals : shades)[faceIndex]; ctx.fill();
      ctx.strokeStyle = block.signal ? accent : trace; ctx.lineWidth = .65; ctx.stroke();
      if (faceIndex === 0 && !block.signal) {
        const mid = project([block.center[0], block.center[1] - block.size[1] - .3, block.center[2]]);
        ctx.fillStyle = trace; ctx.globalAlpha = .55; ctx.fillRect(mid[0]-1, mid[1]-1, 2, 2); ctx.globalAlpha = 1;
      }
    }
  }
  // A solid engraved lid lifts away during the first section.
  if (p < 1) {
    ctx.globalAlpha = clamp(1 - p * 1.4);
    const lid = [[-77,-46-p*120,-77],[77,-46-p*120,-77],[77,-46-p*120,77],[-77,-46-p*120,77]] as Vec[];
    ctx.beginPath(); lid.map(project).forEach((v,i)=>i?ctx.lineTo(v[0],v[1]):ctx.moveTo(v[0],v[1]));ctx.closePath();
    const material = ctx.createLinearGradient(centerX-90,centerY-90,centerX+90,centerY+90);
    material.addColorStop(0,light?"#e7ebe0":"#3c4939"); material.addColorStop(1,light?"#b2c0a9":"#111a13");
    ctx.fillStyle=material;ctx.fill();ctx.strokeStyle=accent;ctx.lineWidth=1;ctx.stroke();
    const label=project([0,-48-p*120,0]);ctx.fillStyle=accent;ctx.textAlign="center";ctx.font=`${Math.max(12,19*unit)}px monospace`;ctx.fillText("SA",label[0],label[1]);ctx.globalAlpha=1;
  }
  // Project each annotation from its own moving module, but keep the text flat
  // and readable. Leader lines retain the association when labels need spacing.
  const occupied: { x: number; y: number; width: number }[] = [];
  ctx.font = `${mobile ? 11 : 12}px monospace`;
  ctx.textAlign = "center";
  const activeAnnotations = annotations[Math.min(9, Math.round(p))];
  const projectedLabels = activeAnnotations.map(annotation => {
    const start = moduleAt(annotation.module, scene).center;
    const end = moduleAt(annotation.module, Math.min(scene + 1, 9)).center;
    return { ...annotation, anchor: project(vectorMix(start, end, t)) };
  }).sort((a, b) => a.anchor[1] - b.anchor[1]);
  for (const annotation of projectedLabels) {
    const [ax, ay] = annotation.anchor;
    const labelWidth = ctx.measureText(annotation.text).width + 12;
    const left = mobile ? 12 : width * .52;
    const right = width - (mobile ? 12 : 42);
    const x = Math.max(left + labelWidth / 2, Math.min(right - labelWidth / 2, ax));
    let y = Math.max(mobile ? height * .52 : 110, Math.min(height - 130, ay - (mobile ? 22 : 38)));
    // Resolve collisions deterministically, including narrow phones and turns
    // where two modules project onto almost the same screen position.
    while (occupied.some(box => Math.abs(box.x - x) < (box.width + labelWidth) / 2 + 5 && Math.abs(box.y - y) < 21)) y += 22;
    occupied.push({ x, y, width: labelWidth });
    ctx.strokeStyle = trace; ctx.lineWidth = .8;
    ctx.beginPath(); ctx.moveTo(ax, ay - 6); ctx.lineTo(x, y + 6); ctx.stroke();
    ctx.fillStyle = light ? "#eeeee5" : "#0b100f";
    ctx.fillRect(x - labelWidth / 2, y - 13, labelWidth, 19);
    ctx.fillStyle = ink;
    ctx.fillText(annotation.text, x, y);
    ctx.fillStyle = accent; ctx.fillRect(ax - 1.5, ay - 7.5, 3, 3);
  }
  // Readable annotations stay outside the rotating geometry.
  if (!mobile) {
    const labelY = Math.min(height - 115, centerY + 235 * unit);
    ctx.font = "10px monospace"; ctx.textAlign = "center"; ctx.fillStyle = ink;
    ctx.fillText(sceneLabels[Math.min(9, Math.round(p))], centerX, labelY);
    ctx.fillStyle = trace; ctx.font = "9px monospace";
    ctx.fillText("SCROLL TO TRANSFORM", centerX, labelY + 21);
  }
}
