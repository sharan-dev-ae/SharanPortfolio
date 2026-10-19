import type { Metadata } from "next";
import { Download, ExternalLink } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return (
    <main id="main-content">
      <Container className="py-24">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
              Resume
            </p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              {siteConfig.developerName}
            </h1>
            <p className="text-secondary mt-3">{siteConfig.role}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={siteConfig.resumeFilePath}
              download="Sharan-K-Shaji-Resume.pdf"
              className="bg-foreground text-background inline-flex min-h-10 items-center gap-2 rounded-md px-4 py-2 text-sm font-medium"
            >
              <Download size={16} aria-hidden="true" /> Download PDF
            </a>
            <a
              href={siteConfig.resumeFilePath}
              target="_blank"
              rel="noopener noreferrer"
              className="border-border hover:bg-surface inline-flex min-h-10 items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors"
            >
              Open in new tab <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
        <div className="border-border bg-surface mt-10 overflow-hidden rounded-2xl border p-2 sm:p-3">
          <iframe
            src={`${siteConfig.resumeFilePath}#view=FitH`}
            title={`${siteConfig.developerName} resume`}
            className="h-[72vh] min-h-[620px] w-full rounded-xl bg-white"
          />
        </div>
        <p className="text-secondary mt-4 text-xs">
          If the preview does not load in your browser, use the download or open
          button above.
        </p>
      </Container>
    </main>
  );
}
