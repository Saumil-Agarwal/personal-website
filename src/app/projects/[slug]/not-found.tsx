import Link from "next/link";

export default function ProjectNotFound() {
  return <main className="shell project-page"><p className="eyebrow">404</p><h1>Project not found.</h1><Link className="button" href="/">Return home</Link></main>;
}
