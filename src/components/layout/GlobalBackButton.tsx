"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";

function getBackDestination(pathname: string) {
  if (!pathname || pathname === "/") return null;
  if (pathname.startsWith("/prototypes/automated-deployment-monitoring/build/")) {
    return { href: "/prototypes/automated-deployment-monitoring", label: "Deployment dashboard" };
  }
  if (pathname.startsWith("/prototypes/")) {
    return { href: "/prototypes", label: "All prototypes" };
  }
  if (pathname.startsWith("/projects/")) {
    return { href: "/projects", label: "All projects" };
  }
  return { href: "/", label: "Home" };
}

export function GlobalBackButton() {
  const pathname = usePathname();
  const destination = getBackDestination(pathname);

  if (!destination) return null;

  return (
    <Link
      href={destination.href}
      aria-label={`Back to ${destination.label}`}
      className="global-back-button group fixed top-4 right-4 z-[110] inline-flex h-11 items-center gap-2 rounded-full border border-white/15 bg-[#0d1119]/95 px-4 text-xs font-semibold text-white shadow-[0_12px_36px_rgba(0,0,0,.35)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-[#70a1ff]/60 hover:bg-[#162033] focus-visible:outline-[#70a1ff] sm:top-5 sm:right-5"
    >
      <ArrowLeft size={15} className="text-[#70a1ff] transition-transform group-hover:-translate-x-0.5" aria-hidden="true" />
      <span>Back</span>
      <span className="hidden text-[#9aa9bf] sm:inline">· {destination.label}</span>
    </Link>
  );
}
