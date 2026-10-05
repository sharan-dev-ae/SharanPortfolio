"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useRef } from "react";
import { navigation } from "@/data/navigation";
import { siteConfig } from "@/config/site";

export function MobileMenu() {
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => menuRef.current?.removeAttribute("open");

  return (
    <details
      ref={menuRef}
      className="relative ml-auto lg:hidden"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          closeMenu();
          menuRef.current?.querySelector("summary")?.focus();
        }
      }}
    >
      <summary className="border-border flex cursor-pointer list-none items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium marker:hidden [&::-webkit-details-marker]:hidden">
        <Menu aria-hidden="true" size={17} /> Menu
      </summary>
      <nav
        aria-label="Mobile navigation"
        className="border-border bg-surface absolute top-full right-0 mt-3 flex w-48 flex-col rounded-lg border p-2 shadow-2xl"
      >
        {navigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={closeMenu}
            className="text-secondary hover:bg-surface-secondary hover:text-foreground rounded px-3 py-2 text-sm"
          >
            {item.label}
          </Link>
        ))}
        <Link
          href={siteConfig.resumePath}
          onClick={closeMenu}
          className="border-border text-foreground hover:bg-surface-secondary mt-1 rounded border-t px-3 py-2 text-sm"
        >
          Resume
        </Link>
      </nav>
    </details>
  );
}
