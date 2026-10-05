import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-border text-secondary border-t py-8 text-sm">
      <Container className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/" className="text-foreground font-medium">
            {siteConfig.developerName}
            <span className="text-accent">.</span>
          </Link>
          <p className="mt-1">
            {siteConfig.currentRole} · {siteConfig.location}
          </p>
          <p className="mt-2 text-xs">
            © {new Date().getFullYear()} {siteConfig.developerName}. Built with
            Next.js and TypeScript.
          </p>
        </div>
        <nav
          aria-label="Footer links"
          className="flex flex-wrap gap-x-5 gap-y-2"
        >
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="hover:text-foreground"
          >
            Email
          </a>
        </nav>
      </Container>
    </footer>
  );
}
