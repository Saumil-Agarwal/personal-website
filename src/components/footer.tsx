import { profile } from "@/content/site";

export function Footer() {
  return <footer className="footer shell"><span>© {new Date().getFullYear()} {profile.name}</span><span>Built with Next.js, TypeScript, and curiosity.</span></footer>;
}
