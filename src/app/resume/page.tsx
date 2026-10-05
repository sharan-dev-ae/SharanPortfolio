import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main id="main-content">
      <Container className="py-24">
        <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
          Resume
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight">
          Resume coming soon.
        </h1>
        <p className="text-secondary mt-4 max-w-xl leading-7">
          The current resume will be added during the content pass. For now,
          please get in touch directly.
        </p>
        <a
          href={`mailto:${siteConfig.email}`}
          className="mt-8 inline-block text-sm font-medium underline underline-offset-4"
        >
          Email {siteConfig.developerName}
        </a>
      </Container>
    </main>
  );
}
