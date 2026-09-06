import Link from "next/link";

export default function NotFound() {
  return <main className="shell recovery-page"><p className="eyebrow">404 / not found</p><h1>That route does not exist.</h1><p className="lede">The portfolio is still here. Head back to explore the work.</p><Link className="button primary" href="/">Return home</Link></main>;
}
