import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { BeyondCodeCarousel } from "@/components/sections/BeyondCodeCarousel";
import { StoryHeading } from "@/components/sections/StoryHeading";
import {
  aboutStory,
  buildFocus,
  engineeringPrinciples,
  personalSnapshot,
} from "@/data/about";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: "The person, work, and interests of Sharan Kuniyil Shaji.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <Container className="grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-16 lg:py-20">
        <FadeIn
          from="left"
          className="about-photo-frame relative order-2 min-h-[390px] sm:min-h-[540px] lg:order-1 lg:min-h-[650px]"
        >
          <Image
            src="/images/profile/about-portrait-bw.png"
            alt="Portrait of Sharan Kuniyil Shaji"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 44vw"
            className="about-photo-image object-cover object-[center_38%]"
          />
        </FadeIn>
        <div className="order-1 lg:order-2">
          <Link
            href="/"
            className="text-secondary hover:text-foreground inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft aria-hidden="true" size={16} /> Back to homepage
          </Link>
          <FadeIn>
            <p className="text-accent mt-14 text-xs font-semibold tracking-[.2em] uppercase">
              The person behind the work
            </p>
          </FadeIn>
          <FadeIn delay={0.08}>
            <h1 className="mt-5 max-w-2xl text-5xl leading-[1.02] font-semibold tracking-[-.065em] sm:text-7xl">
              More Than the Code.
            </h1>
          </FadeIn>
          <FadeIn delay={0.16}>
            <p className="text-secondary mt-8 max-w-xl text-lg leading-8">
              I’m {siteConfig.developerName}, a senior full-stack software
              engineer based in Dubai and originally from Kozhikode, Kerala. I
              build enterprise software, but curiosity takes me well beyond the
              desk.
            </p>
          </FadeIn>
          <FadeIn delay={0.22} className="border-border mt-10 border-t pt-7">
            <p className="text-foreground text-lg font-semibold">
              {siteConfig.developerName}
            </p>
            <p className="text-accent mt-1 text-sm">
              {siteConfig.currentRole} · {siteConfig.currentCompany} · Dubai,
              UAE
            </p>
            <div className="text-secondary mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
              <span>
                {siteConfig.engineeringExperience} software engineering
              </span>
              <span>{siteConfig.uaeExperience} UAE experience</span>
            </div>
          </FadeIn>
        </div>
      </Container>
      <section
        aria-label="Personal snapshot"
        className="border-border bg-surface/40 border-y py-9"
      >
        <Container>
          <dl className="grid gap-6 sm:grid-cols-3">
            {personalSnapshot.slice(0, 3).map((item, index) => (
              <FadeIn key={item.label} delay={index * 0.06}>
                <dt className="text-secondary text-xs tracking-[.17em] uppercase">
                  {item.label}
                </dt>
                <dd className="mt-2 text-base font-medium">{item.value}</dd>
              </FadeIn>
            ))}
          </dl>
        </Container>
      </section>
      <section aria-labelledby="who-title" className="py-24 sm:py-36">
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,.43fr)_minmax(0,.57fr)] lg:gap-20">
          <div id="who-title">
            <StoryHeading number="01" title="Who I Am" eyebrow="The story" />
          </div>
          <FadeIn className="text-secondary border-border max-w-3xl space-y-6 border-t pt-8 text-lg leading-9 sm:text-xl">
            {aboutStory.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p>
              That instinct to explore and improve carries into everything from
              software and machines to training and travel.
            </p>
          </FadeIn>
        </Container>
      </section>
      <section
        aria-labelledby="what-title"
        className="border-border bg-surface/40 border-y py-24 sm:py-36"
      >
        <Container className="grid gap-10 lg:grid-cols-[minmax(0,.57fr)_minmax(0,.43fr)] lg:gap-20">
          <div className="order-2 lg:order-1">
            <FadeIn className="border-border border-t pt-8">
              <p className="text-secondary max-w-3xl text-lg leading-9 sm:text-xl">
                I build enterprise applications and business platforms across
                frontend, backend, databases, APIs, workflows, automation,
                integrations, dashboards, and real-time systems. At NAFFCO, that
                means software used across multiple business functions.
              </p>
              <p className="text-secondary mt-6 max-w-3xl text-base leading-8">
                {buildFocus.introduction}
              </p>
            </FadeIn>
            <FadeIn delay={0.12}>
              <p className="text-accent mt-10 text-xs font-semibold tracking-[.18em] uppercase">
                Core tools
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {buildFocus.stack.map((technology) => (
                  <li
                    key={technology}
                    className="border-accent/25 bg-accent/5 rounded-full border px-4 py-2 text-sm"
                  >
                    {technology}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
          <div id="what-title" className="order-1 lg:order-2">
            <StoryHeading number="02" title="What I Do" eyebrow="The craft" />
          </div>
        </Container>
      </section>
      <section aria-labelledby="how-title" className="py-24 sm:py-36">
        <Container>
          <div id="how-title">
            <StoryHeading
              number="03"
              title="How I Work"
              eyebrow="The approach"
            />
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {engineeringPrinciples.map((principle, index) => (
              <FadeIn
                key={principle.title}
                delay={index * 0.1}
                className="group border-border hover:border-accent/50 hover:bg-surface-secondary/70 bg-surface min-h-64 rounded-xl border p-7 transition-[border-color,background-color,transform] duration-300 hover:-translate-y-1 sm:p-9"
              >
                <span className="text-accent font-mono text-sm">
                  0{index + 1}
                </span>
                <h3 className="mt-8 text-2xl font-semibold tracking-tight">
                  {principle.title}
                </h3>
                <p className="text-secondary mt-5 text-base leading-8">
                  {principle.body}
                </p>
              </FadeIn>
            ))}
          </div>
        </Container>
      </section>
      <section
        aria-labelledby="beyond-title"
        className="border-border bg-surface/40 border-y py-24 sm:py-36"
      >
        <Container>
          <FadeIn>
            <p className="text-accent text-xs font-semibold tracking-[.2em] uppercase">
              Away from the desk
            </p>
            <h2
              id="beyond-title"
              className="mt-4 text-4xl font-semibold tracking-[-.055em] sm:text-6xl"
            >
              Beyond the Code
            </h2>
            <p className="text-secondary mt-5 text-lg">
              There’s a lot more to me than software.
            </p>
          </FadeIn>
          <FadeIn className="mt-12">
            <BeyondCodeCarousel />
          </FadeIn>
        </Container>
      </section>
      <Container className="flex flex-wrap gap-x-8 gap-y-4 py-16 sm:py-20">
        <Link
          href="/career"
          className="text-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-semibold"
        >
          Explore my career <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
        <Link
          href="/#work"
          className="text-foreground hover:text-accent inline-flex items-center gap-2 text-sm font-semibold"
        >
          View selected work <ArrowUpRight aria-hidden="true" size={17} />
        </Link>
      </Container>
    </main>
  );
}
