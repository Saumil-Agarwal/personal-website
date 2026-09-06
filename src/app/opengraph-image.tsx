import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Saumil Agarwal — Distributed Systems, Network Security, and Agentic AI";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ background: "#0a0a0a", color: "#ecefeb", width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80 }}>
      <div style={{ color: "#00e5a0", fontSize: 28 }}>saumil@agarwal:~$ whoami</div>
      <div style={{ fontSize: 86, fontWeight: 700, marginTop: 24 }}>Saumil Agarwal</div>
      <div style={{ color: "#a3aaa6", fontSize: 32, marginTop: 24 }}>Distributed Systems · Network Security · Agentic AI</div>
    </div>,
    size,
  );
}
