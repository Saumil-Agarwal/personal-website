"use client";
import Link from "next/link";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="shell recovery-page"><p className="eyebrow">500 / unexpected error</p><h1>Something went sideways.</h1><p className="lede">Try the page again. If the problem continues, the rest of the portfolio is one step away.</p><div className="actions"><button className="button primary" onClick={reset}>Try again</button><Link className="button" href="/">Return home</Link></div></main>;
}
