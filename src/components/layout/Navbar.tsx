import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { navigation } from "@/data/navigation";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <header className="border-border/80 bg-background/90 sticky top-0 z-50 border-b backdrop-blur-md">
      <Container className="flex h-18 items-center justify-between gap-6">
        <Link
          href="/"
          className="text-foreground shrink-0 text-base font-semibold tracking-[-0.04em]"
          aria-label={`${siteConfig.developerName}, home`}
        >
          {siteConfig.wordmark}
          <span className="text-accent">.</span>
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-7 lg:flex"
        >
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-secondary hover:text-foreground text-sm transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href={siteConfig.resumePath}
          className="border-border text-foreground hover:border-secondary hover:bg-surface hidden items-center gap-1.5 rounded-md border px-3.5 py-2 text-sm font-medium transition-colors lg:inline-flex"
        >
          Resume <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
        <MobileMenu />
      </Container>
    </header>
  );
}
