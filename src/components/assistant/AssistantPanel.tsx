"use client";

import { useEffect, useRef, useState } from "react";
import type { Dispatch, FormEvent, KeyboardEvent, SetStateAction } from "react";
import { ArrowUp, Sparkles, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import {
  answerPortfolioQuestion,
  suggestionsForPath,
} from "@/data/assistant/knowledge";
import type { AssistantMessage } from "@/data/assistant/knowledge";
import { motionDistance, motionEase, motionTiming } from "@/lib/motion";

type Props = {
  pathname: string;
  messages: AssistantMessage[];
  setMessages: Dispatch<SetStateAction<AssistantMessage[]>>;
  onClose: () => void;
};

function Action({ label, href }: { label: string; href: string }) {
  const external = /^https?:|^mailto:/.test(href);
  return (
    <a
      href={href}
      target={external && !href.startsWith("mailto:") ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="border-border hover:border-accent text-accent inline-flex min-h-9 items-center rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
    >
      {label}{" "}
      <span aria-hidden="true" className="ml-1">
        →
      </span>
    </a>
  );
}

export default function AssistantPanel({
  pathname,
  messages,
  setMessages,
  onClose,
}: Props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const end = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const mobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 639px)").matches;
  const suggestions = suggestionsForPath(pathname);

  useEffect(() => {
    closeButton.current?.focus();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
  useEffect(() => {
    end.current?.scrollIntoView({
      block: "end",
      behavior: reducedMotion ? "instant" : "smooth",
    });
  }, [messages, loading, reducedMotion]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !panel.current) return;
    const elements = Array.from(
      panel.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), a[href], textarea:not([disabled])",
      ),
    );
    const first = elements[0];
    const last = elements[elements.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  const ask = (raw: string) => {
    const question = raw.trim();
    if (!question || loading) return;
    setInput("");
    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: "user", text: question },
    ]);
    setLoading(true);
    window.setTimeout(() => {
      try {
        const answer = answerPortfolioQuestion(question, pathname);
        setMessages((current) => [
          ...current,
          { id: crypto.randomUUID(), role: "assistant", ...answer },
        ]);
      } catch {
        setMessages((current) => [
          ...current,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            text: "I couldn't answer that right now. You can still explore Sharan's projects, career, and contact details directly.",
            actions: [
              { label: "Projects", href: "/projects" },
              { label: "Career", href: "/career" },
              { label: "Contact", href: "/contact" },
            ],
          },
        ]);
      } finally {
        setLoading(false);
      }
    }, 250);
  };
  const submit = (event: FormEvent) => {
    event.preventDefault();
    ask(input);
  };

  return (
    <div className="fixed inset-0 z-50" onKeyDown={onKeyDown}>
      <button
        type="button"
        aria-label="Close Ask Sharan"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-black/55"
      />
      <motion.div
        ref={panel}
        id="ask-sharan-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ask-sharan-title"
        initial={
          reducedMotion
            ? false
            : {
                opacity: 0,
                x: mobile ? 0 : motionDistance.large,
                y: mobile ? motionDistance.medium : 0,
              }
        }
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{
          duration: reducedMotion ? 0 : motionTiming.standard,
          ease: motionEase,
        }}
        className="border-border bg-background fixed inset-x-0 bottom-0 flex h-[min(90dvh,720px)] flex-col overflow-hidden rounded-t-2xl border-t shadow-2xl sm:inset-x-auto sm:right-6 sm:bottom-6 sm:h-[min(700px,calc(100dvh-48px))] sm:w-[min(420px,calc(100vw-48px))] sm:rounded-2xl sm:border"
      >
        <header className="border-border bg-background z-10 flex shrink-0 items-start justify-between gap-4 border-b px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="border-border bg-surface text-accent flex size-9 shrink-0 items-center justify-center rounded-lg border">
              <Sparkles size={17} aria-hidden="true" />
            </div>
            <div>
              <h2 id="ask-sharan-title" className="font-semibold">
                Ask Sharan
              </h2>
              <p className="text-secondary mt-0.5 text-xs leading-5">
                Ask about my work, experience, projects or interests.
              </p>
            </div>
          </div>
          <button
            ref={closeButton}
            type="button"
            onClick={onClose}
            aria-label="Close assistant"
            className="text-secondary hover:text-foreground flex size-9 shrink-0 items-center justify-center rounded-md"
          >
            <X size={19} />
          </button>
        </header>

        <div
          className="min-h-0 flex-1 overflow-y-auto px-5 py-6"
          aria-live="polite"
          aria-relevant="additions text"
        >
          {messages.length === 0 ? (
            <div>
              <p className="text-accent text-xs font-medium tracking-[.18em] uppercase">
                Portfolio guide
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                What would you like to know?
              </h3>
              <p className="text-secondary mt-2 text-sm leading-6">
                Curious about my work, career or projects? Ask away.
              </p>
              <div
                className="mt-7 flex flex-wrap gap-2"
                aria-label="Suggested questions"
              >
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    initial={
                      reducedMotion
                        ? false
                        : { opacity: 0, y: motionDistance.small }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0 : motionTiming.fast,
                      delay: reducedMotion ? 0 : index * 0.045,
                    }}
                    type="button"
                    onClick={() => ask(suggestion)}
                    className="border-border bg-surface hover:border-accent rounded-full border px-3 py-2 text-left text-xs leading-5 transition-colors"
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={
                    reducedMotion
                      ? false
                      : { opacity: 0, y: motionDistance.small }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: reducedMotion ? 0 : motionTiming.fast,
                  }}
                  className={
                    message.role === "user" ? "ml-10 flex justify-end" : "mr-5"
                  }
                >
                  <div
                    className={
                      message.role === "user"
                        ? "bg-surface-secondary border-border max-w-full rounded-2xl rounded-br-sm border px-4 py-3"
                        : "max-w-full px-1 py-1"
                    }
                  >
                    {message.role === "assistant" && (
                      <p className="text-accent mb-1 text-xs font-semibold">
                        Ask Sharan
                      </p>
                    )}
                    <p className="text-foreground text-sm leading-6 whitespace-pre-line">
                      {message.text}
                    </p>
                    {message.actions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.actions.map((action) => (
                          <Action
                            key={`${message.id}-${action.href}`}
                            {...action}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div role="status" className="text-secondary px-1 text-sm">
                  Thinking<span className="motion-safe:animate-pulse">…</span>
                </div>
              )}
              <div ref={end} />
            </div>
          )}
        </div>
        <form
          onSubmit={submit}
          className="border-border bg-background shrink-0 border-t px-4 pt-3 pb-[max(14px,env(safe-area-inset-bottom))] sm:px-5"
        >
          <label htmlFor="ask-sharan-input" className="sr-only">
            Ask anything about Sharan
          </label>
          <div className="border-border bg-surface focus-within:border-accent flex items-end gap-2 rounded-xl border p-2">
            <textarea
              id="ask-sharan-input"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  ask(input);
                }
              }}
              rows={1}
              maxLength={500}
              placeholder="Ask anything about Sharan..."
              className="text-foreground placeholder:text-secondary max-h-28 min-h-9 flex-1 resize-none bg-transparent px-2 py-2 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              aria-label="Send question"
              className="bg-accent text-background flex size-9 shrink-0 items-center justify-center rounded-lg hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowUp size={18} />
            </button>
          </div>
          <p className="text-secondary mt-2 text-[11px]">
            Answers use approved portfolio information only.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
