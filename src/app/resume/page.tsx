import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main id="main-content" className="min-h-[calc(100svh-4.5rem)]">
      <Container className="flex min-h-[calc(100svh-4.5rem)] flex-col py-4 sm:py-6">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-accent text-[10px] font-medium tracking-[0.18em] uppercase">
              Resume
            </p>
            <h1 className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-xl">
              {siteConfig.developerName}
            </h1>
          </div>
          <div className="flex shrink-0 gap-2">
            <a
              href={siteConfig.resumeFilePath}
              download="Sharan-K-Shaji-Resume.pdf"
              aria-label="Download resume PDF"
              className="bg-foreground text-background inline-flex h-9 items-center gap-2 rounded-md px-3 text-sm font-medium"
            >
              <Download size={16} aria-hidden="true" /> <span className="hidden sm:inline">Download PDF</span>
            </a>
            <a
              href={siteConfig.resumeFilePath}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume in a new tab"
              className="border-border hover:bg-surface inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm font-medium transition-colors"
            >
              <span className="hidden sm:inline">Open in new tab</span> <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="border-border bg-surface mt-4 flex flex-1 overflow-hidden rounded-xl border p-1.5 sm:p-2">
          <iframe
            src={`${siteConfig.resumeFilePath}#page=1&zoom=100`}
            title={`${siteConfig.developerName} resume`}
            className="h-full min-h-[calc(100svh-9rem)] w-full rounded-lg bg-white"
          />
        </div>
      </Container>
    </main>
  );
}
