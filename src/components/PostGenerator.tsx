"use client";

import { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { GeneratorState, Tone } from "@/types";

const MAX_BRIEF_LENGTH = 500;
const TONES: Tone[] = ["Analytical", "Actionable", "Inspirational"];

// ── Icons ──────────────────────────────────────────────────────────────────

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function IconLike() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
    </svg>
  );
}

function IconComment() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconMoon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function LinkedInLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="white" className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

// ── LinkedIn preview card ───────────────────────────────────────────────────

function LinkedInCard({
  post,
  mobile,
  dark,
}: {
  post: string;
  mobile: boolean;
  dark: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setExpanded(false);
  }, [post]);

  const paragraphs = post.split("\n").filter(Boolean);
  const visibleParagraphs = expanded ? paragraphs : paragraphs.slice(0, 3);
  const hasMore = paragraphs.length > 3 && !expanded;

  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden mx-auto",
        mobile ? "max-w-[360px]" : "w-full",
        dark ? "bg-[#1b1f23] border-[#38434f]" : "bg-white border-gray-200",
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
            dark ? "bg-[#38434f] text-gray-400" : "bg-gray-200 text-gray-500",
          )}
        >
          <IconPerson />
        </div>
        <div className="flex-1 min-w-0">
          <p className={cn("font-semibold text-sm", dark ? "text-white" : "text-gray-900")}>
            Your Name
          </p>
          <p className={cn("text-xs mt-0.5", dark ? "text-gray-400" : "text-gray-500")}>
            Your Headline
          </p>
          <p className={cn("text-xs mt-0.5", dark ? "text-gray-500" : "text-gray-400")}>
            Just now
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 pb-4">
        <div className={cn("text-sm leading-relaxed space-y-2", dark ? "text-gray-300" : "text-gray-800")}>
          {visibleParagraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {hasMore && (
            <button
              onClick={() => setExpanded(true)}
              className={cn("font-semibold hover:underline", dark ? "text-gray-400" : "text-gray-500")}
            >
              …see more
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className={cn("px-4 py-2 border-t flex items-center gap-1", dark ? "border-[#38434f]" : "border-gray-100")}>
        {[
          { icon: <IconLike />, label: "Like" },
          { icon: <IconComment />, label: "Comment" },
          { icon: <IconShare />, label: "Share" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-colors",
              dark
                ? "text-gray-400 hover:bg-[#38434f]"
                : "text-gray-500 hover:bg-gray-100",
            )}
          >
            {icon}
            {!mobile && <span>{label}</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

function EmptyLinkedInCard({ dark }: { dark: boolean }) {
  return (
    <div
      className={cn(
        "rounded-lg border overflow-hidden w-full",
        dark ? "bg-[#1b1f23] border-[#38434f]" : "bg-white border-gray-200",
      )}
    >
      {/* Header */}
      <div className="p-4 flex items-start gap-3">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
            dark ? "bg-[#38434f] text-gray-500" : "bg-gray-200 text-gray-400",
          )}
        >
          <IconPerson />
        </div>
        <div>
          <p className={cn("font-semibold text-sm", dark ? "text-white" : "text-gray-900")}>
            Your Name
          </p>
          <p className={cn("text-xs mt-0.5", dark ? "text-gray-400" : "text-gray-500")}>
            Your Headline
          </p>
          <p className={cn("text-xs mt-0.5", dark ? "text-gray-500" : "text-gray-400")}>
            Just now
          </p>
        </div>
      </div>

      {/* Placeholder body */}
      <div className="px-4 pb-6">
        <p className={cn("text-sm", dark ? "text-gray-600" : "text-gray-400")}>
          Your generated LinkedIn post will appear here...
        </p>
      </div>

      {/* Actions */}
      <div className={cn("px-4 py-2 border-t flex items-center gap-1", dark ? "border-[#38434f]" : "border-gray-100")}>
        {[
          { icon: <IconLike />, label: "Like" },
          { icon: <IconComment />, label: "Comment" },
          { icon: <IconShare />, label: "Share" },
        ].map(({ icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold",
              dark ? "text-gray-600" : "text-gray-400",
            )}
            disabled
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

export default function PostGenerator() {
  const [dark, setDark] = useState(false);
  const [brief, setBrief] = useState("");
  const [tone, setTone] = useState<Tone>("Analytical");
  const [toneValue, setToneValue] = useState(40);
  const [state, setState] = useState<GeneratorState>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const [previewView, setPreviewView] = useState<"desktop" | "mobile">("desktop");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = state.status === "loading";
  const isAtLimit = brief.length >= MAX_BRIEF_LENGTH;
  const canSubmit = !isLoading && brief.trim().length > 0 && !isAtLimit;

  async function handleGenerate() {
    if (!canSubmit) return;
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: brief.trim(), tone, toneValue }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setState({ status: "success", post: data.post });
    } catch {
      setState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }

  async function handleCopy() {
    if (state.status !== "success") return;
    await navigator.clipboard.writeText(state.post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // bg & text tokens
  const pageBg = dark ? "bg-[#0a0a0a]" : "bg-gray-100";
  const headerBg = dark ? "bg-[#0a0a0a] border-[#2a2a2a]" : "bg-white border-gray-200";
  const cardBg = dark ? "bg-[#111318] border-[#2a2a2a]" : "bg-white border-gray-200";
  const labelColor = dark ? "text-gray-100" : "text-gray-900";
  const subLabel = dark ? "text-gray-400" : "text-gray-500";
  const inputBg = dark
    ? "bg-[#1b1f23] border-[#38434f] text-gray-100 placeholder-gray-600 focus:ring-[#0077B5]"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-[#0077B5]";
  const footerBg = dark ? "bg-[#0a0a0a] border-[#2a2a2a]" : "bg-gray-100 border-gray-200";

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-200", pageBg)}>
      {/* ── Header ── */}
      <header className={cn("border-b px-6 py-4 flex items-center justify-between", headerBg)}>
        <h1 className={cn("text-xl font-bold tracking-tight", labelColor)}>
          LinkedIn Post Generator
        </h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
              dark
                ? "text-yellow-400 hover:bg-[#2a2a2a]"
                : "text-gray-500 hover:bg-gray-100",
            )}
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>
          <div className="w-8 h-8 rounded-md bg-[#0077B5] flex items-center justify-center">
            <LinkedInLogo className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-6">

          {/* Left panel */}
          <div className={cn("w-full lg:w-[440px] lg:flex-shrink-0 rounded-xl border p-6 space-y-6", cardBg)}>

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="brief" className={cn("block text-sm font-semibold", labelColor)}>
                Post Description
              </label>
              <textarea
                ref={textareaRef}
                id="brief"
                value={brief}
                onChange={(e) => setBrief(e.target.value.slice(0, MAX_BRIEF_LENGTH))}
                disabled={isLoading}
                placeholder="Describe your post idea or key points..."
                rows={7}
                maxLength={MAX_BRIEF_LENGTH}
                className={cn(
                  "w-full rounded-lg border px-3 py-2.5 text-sm resize-none transition-colors",
                  "focus:outline-none focus:ring-2 focus:border-transparent",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  inputBg,
                  isAtLimit && "border-red-400",
                )}
              />
              <p className={cn("text-xs text-right tabular-nums", isAtLimit ? "text-red-500" : subLabel)}>
                {brief.length}/{MAX_BRIEF_LENGTH}
              </p>
            </div>

            {/* Tone */}
            <div className="space-y-2">
              <label htmlFor="tone" className={cn("block text-sm font-semibold", labelColor)}>
                Select Tone
              </label>
              <div className="relative">
                <select
                  id="tone"
                  value={tone}
                  onChange={(e) => setTone(e.target.value as Tone)}
                  disabled={isLoading}
                  className={cn(
                    "w-full rounded-lg border px-3 py-2.5 text-sm appearance-none cursor-pointer transition-colors",
                    "focus:outline-none focus:ring-2 focus:border-transparent",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    dark
                      ? "bg-[#1b1f23] border-[#38434f] text-gray-100 focus:ring-[#0077B5]"
                      : "bg-white border-gray-300 text-gray-900 focus:ring-[#0077B5]",
                  )}
                  style={{ paddingRight: "2.5rem" }}
                >
                  {TONES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <span className={cn("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", subLabel)}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <p className={cn("text-sm font-semibold", labelColor)}>
                Professional vs. Human Tone
              </p>
              <div className="flex justify-between text-xs mb-1">
                <span className={subLabel}>More Human</span>
                <span className={subLabel}>More Professional</span>
              </div>
              <input
                id="toneValue"
                type="range"
                min={0}
                max={100}
                value={toneValue}
                onChange={(e) => setToneValue(Number(e.target.value))}
                disabled={isLoading}
                className="w-full h-1.5 rounded-full appearance-none cursor-pointer disabled:cursor-not-allowed"
                style={{
                  background: `linear-gradient(to right, #0077B5 ${toneValue}%, ${dark ? "#38434f" : "#e5e7eb"} ${toneValue}%)`,
                  accentColor: "#0077B5",
                }}
              />
            </div>

            {/* Error */}
            {state.status === "error" && (
              <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                {state.message}
              </div>
            )}

            {/* Generate button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={!canSubmit}
              className={cn(
                "w-full rounded-xl py-3 text-sm font-semibold text-white transition-colors",
                "bg-[#0077B5] hover:bg-[#005e8e] active:bg-[#004f79]",
                "focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-2",
                "disabled:opacity-40 disabled:cursor-not-allowed",
              )}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating…
                </span>
              ) : (
                "Generate Post"
              )}
            </button>
          </div>

          {/* Right panel */}
          <div className={cn("flex-1 min-w-0 rounded-xl border overflow-hidden", cardBg)}>
            {/* View toggle */}
            <div className="flex items-start justify-between px-6 pt-5 pb-4">
              <p className={cn("text-sm font-semibold", labelColor)}>Preview</p>
              <div className={cn("flex rounded-lg overflow-hidden border", dark ? "border-[#38434f]" : "border-gray-200")}>
                {(["desktop", "mobile"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setPreviewView(v)}
                    className={cn(
                      "px-5 py-2 text-sm font-medium transition-colors capitalize",
                      previewView === v
                        ? "bg-[#0077B5] text-white"
                        : dark
                          ? "bg-[#1b1f23] text-gray-400 hover:text-gray-200"
                          : "bg-white text-gray-600 hover:text-gray-800",
                    )}
                  >
                    {v.charAt(0).toUpperCase() + v.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Preview content */}
            <div className="px-6 pb-6">
              <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className="sr-only"
              >
                {state.status === "success" ? "Your LinkedIn post is ready." : ""}
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-64 gap-3">
                  <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#0077B5] border-t-transparent" />
                  <p className={cn("text-sm", subLabel)}>Generating your post…</p>
                </div>
              ) : state.status === "success" ? (
                <div className="space-y-4">
                  <LinkedInCard post={state.post} mobile={previewView === "mobile"} dark={dark} />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={cn(
                      "w-full rounded-lg py-2.5 text-sm font-medium transition-colors border",
                      dark
                        ? "border-[#38434f] bg-[#1b1f23] text-gray-300 hover:bg-[#2a2f35]"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                      "focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-1",
                    )}
                  >
                    {copied ? "✓ Copied!" : "Copy Post"}
                  </button>
                </div>
              ) : (
                <EmptyLinkedInCard dark={dark} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className={cn("border-t py-4 text-center text-xs", footerBg, subLabel)}>
        Powered by AI • LinkedIn Post Generator
      </footer>
    </div>
  );
}
