import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <Container id="main-content" as="main" className="py-20 sm:py-28">
      <p className="text-accent text-xs font-medium tracking-[0.2em] uppercase">
        Contact
      </p>
      <h1 className="mt-5 text-4xl font-semibold tracking-[-0.05em] sm:text-6xl">
        Let&apos;s connect.
      </h1>
      <p className="text-secondary mt-6 max-w-2xl leading-8">
        Based in {siteConfig.location} and open to meaningful engineering
        conversations.
      </p>
      <a
        href={`mailto:${siteConfig.email}`}
        className="mt-8 inline-block text-base font-medium underline underline-offset-4"
      >
        {siteConfig.email}
      </a>
    </Container>
  );
}
