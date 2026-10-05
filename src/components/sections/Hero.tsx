"use client";

import Image from "next/image";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa6";
import { motion, useReducedMotion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { heroContent, heroFacts } from "@/data/home";
import { siteConfig } from "@/config/site";
import { motionDistance, motionEase, motionTiming } from "@/lib/motion";

const socialLinks = [
  {
    label: "WhatsApp",
    ariaLabel: "Contact Sharan on WhatsApp",
    href: siteConfig.whatsapp,
    Icon: FaWhatsapp,
    color:
      "text-[#25D366] group-hover:text-[#62E895] group-focus-visible:text-[#62E895]",
  },
  {
    label: "LinkedIn",
    ariaLabel: "View Sharan on LinkedIn",
    href: siteConfig.linkedin,
    Icon: FaLinkedinIn,
    color:
      "text-[#4CA7F3] group-hover:text-[#8BC8FF] group-focus-visible:text-[#8BC8FF]",
  },
  {
    label: "GitHub",
    ariaLabel: "View Sharan's GitHub",
    href: siteConfig.github,
    Icon: FaGithub,
    color:
      "text-[#B49AFF] group-hover:text-[#D0C1FF] group-focus-visible:text-[#D0C1FF]",
  },
  {
    label: "Instagram",
    ariaLabel: "View Sharan on Instagram",
    href: siteConfig.instagram,
    Icon: FaInstagram,
    color:
      "text-[#F35B9A] group-hover:text-[#FF91BF] group-focus-visible:text-[#FF91BF]",
  },
  {
    label: "Email",
    ariaLabel: "Email Sharan",
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
    color:
      "text-accent group-hover:text-[#CDD4FF] group-focus-visible:text-[#CDD4FF]",
  },
] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();
  const enter = (delay: number, x = 0) => ({
    initial: reduceMotion
      ? (false as const)
      : { opacity: 0, x, y: x ? 0 : motionDistance.medium },
    animate: { opacity: 1, x: 0, y: 0 },
    transition: {
      duration: reduceMotion ? 0 : motionTiming.reveal,
      delay: reduceMotion ? 0 : delay,
      ease: motionEase,
    },
  });
  return (
    <section
      aria-labelledby="hero-title"
      className="border-border overflow-hidden border-b"
    >
      <Container className="grid gap-10 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-stretch lg:gap-8 xl:gap-14">
        <div className="flex flex-col justify-center py-20 sm:py-24 lg:py-16">
          <motion.h1
            {...enter(0.04)}
            id="hero-title"
            className="text-foreground max-w-4xl text-[clamp(3.2rem,6.3vw,7rem)] leading-[.98] font-semibold tracking-[-0.075em]"
          >
            {siteConfig.developerName}
          </motion.h1>
          <motion.p
            {...enter(0.13)}
            className="text-accent mt-5 text-xl font-medium tracking-tight sm:text-2xl"
          >
            {siteConfig.role}
          </motion.p>
          <motion.div
            {...enter(0.2)}
            className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
          >
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-emerald-300 uppercase">
              <span
                className="hero-status-dot h-2 w-2 rounded-full bg-emerald-400"
                aria-hidden="true"
              />{" "}
              Currently
            </span>
            <span className="text-secondary">
              {siteConfig.currentRole} at{" "}
              <strong className="text-foreground font-medium">
                {siteConfig.currentCompany}
              </strong>{" "}
              · {siteConfig.location}
            </span>
          </motion.div>
          <motion.p
            {...enter(0.27)}
            className="text-secondary mt-7 max-w-2xl text-base leading-8 sm:text-lg"
          >
            {heroContent.introduction}
          </motion.p>
          <motion.div
            {...enter(0.33)}
            className="text-secondary mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs"
          >
            <span className="text-foreground font-semibold tracking-[0.15em] uppercase">
              Core stack
            </span>
            <span>{siteConfig.primaryStack.join(" / ")}</span>
          </motion.div>
          <dl className="border-border mt-10 grid grid-cols-2 gap-x-5 gap-y-6 border-y py-7 xl:grid-cols-4">
            {heroFacts.map((fact, index) => (
              <motion.div key={fact.label} {...enter(0.38 + index * 0.055)}>
                <dt className="text-secondary mt-2 text-[11px] leading-5">
                  {fact.label}
                </dt>
                <dd className="text-foreground text-base leading-tight font-semibold tracking-tight sm:text-lg">
                  {fact.value}
                </dd>
              </motion.div>
            ))}
          </dl>
          <motion.div
            {...enter(0.65)}
            className="mt-9 flex flex-wrap gap-3 pr-16 sm:pr-0"
          >
            <Button href="/#work" className="group hover:border-accent">
              View my work{" "}
              <ArrowUpRight
                aria-hidden="true"
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Button>
            <Button href={siteConfig.resumePath} variant="secondary">
              Download resume <Download aria-hidden="true" size={16} />
            </Button>
          </motion.div>
          <nav
            aria-label="Social and contact links"
            className="mt-5 flex flex-wrap items-center gap-2.5"
          >
            {socialLinks.map(
              ({ label, ariaLabel, href, Icon, color }, index) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={ariaLabel}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={
                    href.startsWith("mailto:")
                      ? undefined
                      : "noopener noreferrer"
                  }
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: motionDistance.small }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={reduceMotion ? undefined : { y: -2, scale: 1.02 }}
                  transition={{
                    duration: reduceMotion ? 0 : motionTiming.fast,
                    delay: reduceMotion ? 0 : 0.73 + index * 0.045,
                    ease: motionEase,
                  }}
                  className={`group border-border bg-surface hover:border-accent/50 focus-visible:border-accent relative inline-flex size-10 items-center justify-center rounded-full border shadow-sm transition-colors ${color}`}
                >
                  <Icon size={18} aria-hidden="true" />
                  <span
                    role="tooltip"
                    className="border-border bg-surface text-foreground pointer-events-none absolute top-full left-1/2 mt-2 hidden -translate-x-1/2 rounded-md border px-2.5 py-1.5 text-xs font-medium whitespace-nowrap opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 sm:block"
                  >
                    {label}
                  </span>
                </motion.a>
              ),
            )}
          </nav>
        </div>
        <motion.div
          {...enter(0.44, motionDistance.large)}
          className="hero-portrait-frame relative min-h-[470px] sm:min-h-[620px] lg:my-8 lg:min-h-[640px]"
        >
          <Image
            src="/images/profile/sharan-portrait.png"
            alt="Black and white portrait of Sharan Kuniyil Shaji"
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 43vw"
            className="hero-portrait-image object-cover object-[center_32%] grayscale"
          />
        </motion.div>
      </Container>
    </section>
  );
}
