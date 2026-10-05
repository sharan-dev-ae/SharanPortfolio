"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { MessageCircle, Sparkles } from "lucide-react";
import type { AssistantMessage } from "@/data/assistant/knowledge";

const AssistantPanel = dynamic(() => import("./AssistantPanel"), {
  ssr: false,
});

export function AssistantLauncher() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const launcher = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => {
    setOpen(false);
    window.setTimeout(() => launcher.current?.focus(), 0);
  }, []);

  return (
    <>
      <div className="fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(18px,env(safe-area-inset-bottom))] z-40 sm:right-7 sm:bottom-7">
        <button
          ref={launcher}
          type="button"
          aria-label="Ask Sharan"
          aria-expanded={open}
          aria-controls="ask-sharan-panel"
          onClick={() => setOpen(true)}
          className={`group border-border bg-surface text-foreground hover:border-accent focus-visible:border-accent ask-sharan-launcher relative flex size-14 items-center justify-center rounded-full border shadow-[0_12px_36px_rgba(0,0,0,.45)] transition-[border-color,transform] hover:scale-[1.02] sm:size-16 ${open ? "pointer-events-none opacity-0" : ""}`}
        >
          <MessageCircle size={25} strokeWidth={1.7} aria-hidden="true" />
          <Sparkles
            className="text-accent absolute top-3 right-3"
            size={11}
            aria-hidden="true"
          />
          <span className="border-border bg-surface text-foreground pointer-events-none absolute right-full mr-3 hidden translate-x-1 rounded-md border px-3 py-2 text-xs font-medium whitespace-nowrap opacity-0 shadow-lg transition-[opacity,transform] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100 sm:block">
            Ask Sharan
          </span>
        </button>
      </div>
      {open && (
        <AssistantPanel
          pathname={pathname}
          messages={messages}
          setMessages={setMessages}
          onClose={close}
        />
      )}
    </>
  );
}
