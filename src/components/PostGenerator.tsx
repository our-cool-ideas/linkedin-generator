"use client";

import { useRef, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";
import type { GeneratorState, Tone } from "@/types";

const MAX_BRIEF_LENGTH = 500;
const MAX_POST_LENGTH = 3000;
const TONES: Tone[] = ["Analytical", "Actionable", "Inspirational"];

// ── Icons ──────────────────────────────────────────────────────────────────

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
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

function IconGlobe() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3">
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM1.08 8.49h2.3a12.7 12.7 0 0 0 .82 3.84 6.93 6.93 0 0 1-3.12-3.84zM3.38 7.5h-2.3a6.93 6.93 0 0 1 3.12-3.84 12.7 12.7 0 0 0-.82 3.84zm1 .99h3.13v3.75a11.9 11.9 0 0 1-1.81-.44 11.78 11.78 0 0 1-1.32-3.31zm0-1h3.13V3.74A11.9 11.9 0 0 0 5.7 4.18 11.78 11.78 0 0 0 4.38 7.5zm4.13 4.74V8.49h3.12a11.78 11.78 0 0 1-1.32 3.31 11.9 11.9 0 0 1-1.8.44zm0-5.74V3.75a11.9 11.9 0 0 1 1.81.44 11.78 11.78 0 0 1 1.32 3.31H8.5zm1.63 5.83a12.7 12.7 0 0 0 .82-3.84h2.3a6.93 6.93 0 0 1-3.12 3.84zm.82-4.83a12.7 12.7 0 0 0-.82-3.84 6.93 6.93 0 0 1 3.12 3.84h-2.3z" />
    </svg>
  );
}

function IconDots() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
    </svg>
  );
}

function IconThumbUp({ filled = false }: { filled?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? "#0077B5" : "none"} stroke={filled ? "#0077B5" : "currentColor"} strokeWidth="1.5" className="w-[18px] h-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.25M6.633 10.5H5.25a1.5 1.5 0 00-1.5 1.5v5.25a1.5 1.5 0 001.5 1.5h1.383c.21 0 .413.07.575.2l.29.23" />
    </svg>
  );
}

function IconMessageCircle() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
    </svg>
  );
}

function IconRepeat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
    </svg>
  );
}

function IconSend() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
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

// ── Markdown renderer for LinkedIn post ────────────────────────────────────
// Root cause of spacing: whitespace-pre-wrap + ReactMarkdown block elements double-space.
// Fix: pre-process single \n → markdown hard break (two trailing spaces + \n),
// remove whitespace-pre-wrap, and let ReactMarkdown control all spacing via proper elements.

function PostMarkdown({ content, className }: { content: string; className?: string }) {
  // Convert single newlines to markdown hard breaks; leave \n\n paragraph breaks alone
  const processed = content
    .replace(/\r\n/g, "\n")
    .replace(/(?<!\n)\n(?!\n)/g, "  \n");

  return (
    <div className={cn("text-[14px] leading-[1.6] break-words", className)}>
      <ReactMarkdown
        components={{
          h1: ({ children }) => <p className="font-bold mb-2">{children}</p>,
          h2: ({ children }) => <p className="font-bold mb-2">{children}</p>,
          h3: ({ children }) => <p className="font-semibold mb-1">{children}</p>,
          p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          br: () => <br />,
          ul: ({ children }) => <ul className="mb-2">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2">{children}</ol>,
          li: ({ children }) => <li className="ml-4 list-disc">{children}</li>,
          hr: () => null,
          a: ({ children }) => <span>{children}</span>,
        }}
      >
        {processed}
      </ReactMarkdown>
    </div>
  );
}

// ── LinkedIn card ─────────────────────────────────────────────────────────

const TRUNCATE_CHARS = 300;

function LinkedInCard({ post, mobile, dark }: { post: string; mobile: boolean; dark: boolean }) {
  const [liked, setLiked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setLiked(false);
    setExpanded(false);
  }, [post]);

  // Strip markdown for plain-text length check
  const plainText = post.replace(/#{1,6}\s?/g, "").replace(/\*\*/g, "").replace(/\*/g, "");
  const isLong = plainText.length > TRUNCATE_CHARS;
  const showFull = expanded || !isLong;

  // For the truncated view, cut the raw markdown at approx char boundary
  const truncatedPost = isLong && !expanded
    ? post.slice(0, TRUNCATE_CHARS)
    : post;

  const overLimit = post.length > MAX_POST_LENGTH;

  const bg = dark ? "bg-[#1d2226]" : "bg-white";
  const border = dark ? "border-[#38434f]" : "border-[#e0dfdf]";
  const nameTx = dark ? "text-[#e8e8e3]" : "text-[#000000e6]";
  const metaTx = dark ? "text-[#a8a09b]" : "text-[#00000099]";
  const bodyTx = dark ? "text-[#e8e8e3]" : "text-[#000000e6]";
  const divider = dark ? "border-[#38434f]" : "border-[#e0dfdf]";
  const actionTx = dark ? "text-[#a8a09b] hover:bg-[#ffffff12]" : "text-[#00000099] hover:bg-[#0000000d]";

  return (
    <div className={cn("rounded-lg border overflow-hidden mx-auto font-[system-ui,-apple-system,sans-serif]", bg, border, mobile ? "max-w-[375px]" : "w-full")}>

      {/* ── Post header ── */}
      <div className="px-4 pt-3 pb-2 flex items-start gap-2">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={cn("w-12 h-12 rounded-full flex items-center justify-center overflow-hidden", dark ? "bg-[#38434f] text-[#a8a09b]" : "bg-[#c0c0c0] text-[#ffffff]")}>
            <IconPerson />
          </div>
          {/* LinkedIn badge */}
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-sm bg-[#0077B5] flex items-center justify-center">
            <LinkedInLogo className="w-3 h-3" />
          </div>
        </div>

        {/* Meta */}
        <div className="flex-1 min-w-0 ml-1">
          <div className="flex items-center gap-1.5">
            <p className={cn("text-sm font-semibold leading-tight", nameTx)}>Your Name</p>
            <span className={cn("text-xs", metaTx)}>• 1st</span>
          </div>
          <p className={cn("text-xs leading-tight mt-0.5 truncate", metaTx)}>Your Professional Headline · Company</p>
          <div className={cn("flex items-center gap-1 text-xs mt-0.5", metaTx)}>
            <span>Just now</span>
            <span>·</span>
            <IconGlobe />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-2 flex-shrink-0">
          <button className={cn("text-[#0077B5] text-sm font-semibold px-3 py-1 rounded-full border border-[#0077B5] hover:bg-[#0077B5]/10 transition-colors", dark && "border-[#70b5f9] text-[#70b5f9]")}>
            Follow
          </button>
          <button className={cn("p-1 rounded-full transition-colors", actionTx)}>
            <IconDots />
          </button>
        </div>
      </div>

      {/* ── Post body ── */}
      <div className="px-4 pb-3">
        {/* Character limit warning */}
        {overLimit && (
          <div className="mb-2 text-xs text-amber-600 dark:text-amber-400 font-medium">
            ⚠ This post exceeds LinkedIn&apos;s {MAX_POST_LENGTH.toLocaleString()} character limit
          </div>
        )}

        <PostMarkdown content={truncatedPost} className={bodyTx} />

        {isLong && !expanded && (
          <button
            onClick={() => setExpanded(true)}
            className={cn("text-sm font-semibold mt-0.5", metaTx, "hover:underline")}
          >
            …see more
          </button>
        )}
      </div>

      {/* ── Reactions summary ── */}
      <div className={cn("px-4 py-1.5 flex items-center justify-between border-t", divider)}>
        <div className="flex items-center gap-1">
          <span className="flex -space-x-0.5">
            <span className="text-sm">👍</span>
            <span className="text-sm">❤️</span>
            <span className="text-sm">💡</span>
          </span>
          <span className={cn("text-xs ml-1", metaTx)}>{liked ? "You and 247 others" : "247"}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className={cn("text-xs hover:underline", metaTx)}>38 comments</button>
          <span className={cn("text-xs", metaTx)}>·</span>
          <button className={cn("text-xs hover:underline", metaTx)}>12 reposts</button>
        </div>
      </div>

      {/* ── Action buttons ── */}
      <div className={cn("px-2 py-0.5 flex items-center border-t", divider)}>
        {[
          {
            icon: <IconThumbUp filled={liked} />,
            label: "Like",
            active: liked,
            onClick: () => setLiked((l) => !l),
          },
          { icon: <IconMessageCircle />, label: "Comment", onClick: () => {} },
          { icon: <IconRepeat />, label: "Repost", onClick: () => {} },
          { icon: <IconSend />, label: "Send", onClick: () => {} },
        ].map(({ icon, label, active, onClick }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-semibold transition-colors",
              active ? "text-[#0077B5]" : actionTx,
              mobile && label !== "Like" && "hidden",
              mobile && "first:flex",
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
  const bg = dark ? "bg-[#1d2226]" : "bg-white";
  const border = dark ? "border-[#38434f]" : "border-[#e0dfdf]";
  const nameTx = dark ? "text-[#e8e8e3]" : "text-[#000000e6]";
  const metaTx = dark ? "text-[#a8a09b]" : "text-[#00000099]";
  const divider = dark ? "border-[#38434f]" : "border-[#e0dfdf]";
  const actionTx = dark ? "text-[#a8a09b]" : "text-[#00000060]";

  return (
    <div className={cn("rounded-lg border overflow-hidden w-full font-[system-ui,-apple-system,sans-serif]", bg, border)}>
      <div className="px-4 pt-3 pb-2 flex items-start gap-2">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 relative", dark ? "bg-[#38434f] text-[#a8a09b]" : "bg-[#c0c0c0] text-white")}>
          <IconPerson />
          <div className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-sm bg-[#0077B5] flex items-center justify-center">
            <LinkedInLogo className="w-3 h-3" />
          </div>
        </div>
        <div className="flex-1 ml-1">
          <div className="flex items-center gap-1.5">
            <p className={cn("text-sm font-semibold", nameTx)}>Your Name</p>
            <span className={cn("text-xs", metaTx)}>• 1st</span>
          </div>
          <p className={cn("text-xs mt-0.5", metaTx)}>Your Headline · Company</p>
          <div className={cn("flex items-center gap-1 text-xs mt-0.5", metaTx)}>
            <span>Just now</span><span>·</span><IconGlobe />
          </div>
        </div>
      </div>

      <div className="px-4 pb-6">
        <p className={cn("text-sm", metaTx)}>Your generated LinkedIn post will appear here...</p>
      </div>

      <div className={cn("px-2 py-0.5 flex items-center border-t", divider)}>
        {["Like", "Comment", "Repost", "Send"].map((label) => (
          <button key={label} disabled className={cn("flex-1 py-2.5 text-xs font-semibold", actionTx)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Toggle switch shared component ─────────────────────────────────────────

function Toggle({
  checked,
  onChange,
  disabled,
  dark,
}: {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  dark: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      disabled={disabled}
      className={cn(
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        checked ? "bg-[#0077B5]" : dark ? "bg-[#38434f]" : "bg-gray-200",
      )}
    >
      <span
        className={cn(
          "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200",
          checked ? "translate-x-5" : "translate-x-0",
        )}
      />
    </button>
  );
}

// ── Main component ──────────────────────────────────────────────────────────

type LinkedInStatus =
  | { status: "idle" }
  | { status: "connected"; name: string }
  | { status: "posting" }
  | { status: "posted" }
  | { status: "post_error"; message: string };

export default function PostGenerator() {
  const [dark, setDark] = useState(false);
  const [brief, setBrief] = useState("");
  const [tone, setTone] = useState<Tone>("Analytical");
  const [toneValue, setToneValue] = useState(40);
  const [useEmojis, setUseEmojis] = useState(false);
  const [useTags, setUseTags] = useState(false);
  const [focusHook, setFocusHook] = useState(false);
  const [state, setState] = useState<GeneratorState>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const [previewView, setPreviewView] = useState<"desktop" | "mobile">("desktop");
  const [li, setLi] = useState<LinkedInStatus>({ status: "idle" });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = state.status === "loading";
  const isAtLimit = brief.length >= MAX_BRIEF_LENGTH;
  const canSubmit = !isLoading && brief.trim().length > 0 && !isAtLimit;

  const postCharCount = state.status === "success"
    ? state.post.replace(/#{1,6}\s?/g, "").replace(/\*\*/g, "").replace(/\*/g, "").length
    : 0;
  const postOverLimit = postCharCount > MAX_POST_LENGTH;

  // Check LinkedIn connection on mount and after returning from OAuth
  useEffect(() => {
    fetch("/api/auth/linkedin/status")
      .then((r) => r.json())
      .then((data) => {
        if (data.connected) setLi({ status: "connected", name: data.name });
      })
      .catch(() => {});

    // Show error from OAuth redirect query param
    const params = new URLSearchParams(window.location.search);
    const liError = params.get("li_error");
    if (liError) {
      setLi({ status: "post_error", message: "LinkedIn connection failed. Please try again." });
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  async function handleGenerate() {
    if (!canSubmit) return;
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: brief.trim(), tone, toneValue, useEmojis, useTags, focusHook }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState({ status: "error", message: data.error ?? "Something went wrong. Please try again." });
        return;
      }
      setState({ status: "success", post: data.post });
      // Reset any previous post status when a new post is generated
      if (li.status === "posted" || li.status === "post_error") {
        setLi({ status: "connected", name: (li as { name?: string }).name ?? "" });
      }
    } catch {
      setState({ status: "error", message: "Something went wrong. Please try again." });
    }
  }

  async function handleCopy() {
    if (state.status !== "success") return;
    const plain = state.post.replace(/#{1,6}\s?/g, "").replace(/\*\*/g, "").replace(/\*/g, "");
    await navigator.clipboard.writeText(plain);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleDisconnect() {
    await fetch("/api/auth/linkedin/logout", { method: "POST" });
    setLi({ status: "idle" });
  }

  async function handlePostToLinkedIn() {
    if (state.status !== "success" || li.status !== "connected") return;
    setLi((prev) => ({ ...prev, status: "posting" } as LinkedInStatus));
    try {
      const res = await fetch("/api/linkedin/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post: state.post }),
      });
      const data = await res.json();
      if (!res.ok) {
        const name = li.status === "connected" ? li.name : "";
        if (res.status === 401) {
          setLi({ status: "idle" }); // token expired, force reconnect
        } else {
          setLi({ status: "post_error", message: data.error ?? "Failed to post." });
          setTimeout(() => setLi({ status: "connected", name }), 4000);
        }
        return;
      }
      setLi((prev) => ({ ...prev, status: "posted" } as LinkedInStatus));
    } catch {
      const name = li.status === "connected" ? li.name : "";
      setLi({ status: "post_error", message: "Network error. Please try again." });
      setTimeout(() => setLi({ status: "connected", name }), 4000);
    }
  }

  // Theme tokens
  const pageBg    = dark ? "bg-[#0a0a0a]"        : "bg-[#f0f2f5]";
  const headerBg  = dark ? "bg-[#0a0a0a] border-[#2a2a2a] shadow-[0_1px_6px_rgba(0,0,0,0.35)]"
                         : "bg-white border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)]";
  const cardBg    = dark ? "bg-[#111318] border-[#2a2a2a] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
                         : "bg-white border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.07)]";
  const sectionBg = dark ? "bg-[#0d1117] border border-[#2a2a2a] rounded-xl p-4"
                         : "bg-gray-50 border border-gray-100 rounded-xl p-4";
  const dividerCls = dark ? "border-[#2a2a2a]" : "border-gray-100";
  const labelTx   = dark ? "text-gray-100"        : "text-gray-900";
  const sectionLabelTx = dark ? "text-[10px] font-semibold uppercase tracking-widest text-gray-500"
                               : "text-[10px] font-semibold uppercase tracking-widest text-gray-400";
  const subTx     = dark ? "text-gray-400"        : "text-gray-500";
  const inputCls  = dark
    ? "bg-[#1b1f23] border-[#38434f] text-gray-100 placeholder-gray-600 focus:ring-[#0077B5]"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-[#0077B5]";
  const footerBg  = dark ? "bg-[#0a0a0a] border-[#2a2a2a]" : "bg-[#f0f2f5] border-gray-200";

  const liConnected = li.status === "connected";
  const liPosting   = li.status === "posting";
  const liPosted    = li.status === "posted";
  const liName      = li.status === "connected" ? li.name : "";

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-200", pageBg)}>

      {/* ── Header ── */}
      <header className={cn("border-b px-6 py-4 flex items-center justify-between gap-4", headerBg)}>
        <h1 className={cn("text-xl font-bold tracking-tight flex-shrink-0", labelTx)}>
          LinkedIn Post Generator
        </h1>

        <div className="flex items-center gap-3 ml-auto">
          {/* LinkedIn connect / user pill */}
          {liConnected ? (
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 bg-[#0077B5]/10 text-[#0077B5] rounded-full px-3 py-1.5 text-xs font-medium">
                <LinkedInLogo className="w-3.5 h-3.5 [&_path]:fill-[#0077B5]" />
                <span className="max-w-[120px] truncate">{liName}</span>
              </div>
              <button
                onClick={handleDisconnect}
                className={cn("text-xs font-medium px-2 py-1 rounded-md transition-colors", subTx, dark ? "hover:bg-[#2a2a2a]" : "hover:bg-gray-100")}
              >
                Disconnect
              </button>
            </div>
          ) : (
            <a
              href="/api/auth/linkedin"
              className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#005e8e] text-white text-xs font-semibold px-3 py-1.5 rounded-full transition-colors"
            >
              <LinkedInLogo className="w-3.5 h-3.5" />
              Connect LinkedIn
            </a>
          )}

          {/* Dark mode */}
          <button
            onClick={() => setDark((d) => !d)}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
              dark ? "text-yellow-400 hover:bg-[#2a2a2a]" : "text-gray-500 hover:bg-gray-100",
            )}
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>

          {/* LinkedIn logo badge */}
          <div className="w-8 h-8 rounded-md bg-[#0077B5] flex items-center justify-center flex-shrink-0">
            <LinkedInLogo className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1 px-6 py-8">
        <div className="mx-auto max-w-6xl flex flex-col lg:flex-row gap-6">

          {/* ── Left panel ── */}
          <div className={cn("w-full lg:w-[440px] lg:flex-shrink-0 rounded-xl border overflow-hidden", cardBg)}>

            {/* ── Section: Post Description ── */}
            <div className="px-5 pt-5 pb-4 space-y-2">
              <p className={sectionLabelTx}>Post Description</p>
              <textarea
                ref={textareaRef}
                id="brief"
                value={brief}
                onChange={(e) => setBrief(e.target.value.slice(0, MAX_BRIEF_LENGTH))}
                disabled={isLoading}
                placeholder="Describe your post idea or key points..."
                rows={6}
                maxLength={MAX_BRIEF_LENGTH}
                className={cn(
                  "w-full rounded-lg border px-3 py-2.5 text-sm resize-none transition-colors",
                  "focus:outline-none focus:ring-2 focus:border-transparent",
                  "disabled:opacity-50 disabled:cursor-not-allowed",
                  inputCls,
                  isAtLimit && "!border-red-400",
                )}
              />
              <p className={cn("text-xs text-right tabular-nums", isAtLimit ? "text-red-500" : subTx)}>
                {brief.length} / {MAX_BRIEF_LENGTH}
              </p>
            </div>

            {/* ── Divider ── */}
            <div className={cn("border-t mx-5", dividerCls)} />

            {/* ── Section: Tone & Style ── */}
            <div className="px-5 py-4 space-y-4">
              <p className={sectionLabelTx}>Tone &amp; Style</p>

              {/* Tone dropdown */}
              <div className={sectionBg}>
                <div className="space-y-2">
                  <label htmlFor="tone" className={cn("block text-xs font-medium", subTx)}>
                    Voice
                  </label>
                  <div className="relative">
                    <select
                      id="tone"
                      value={tone}
                      onChange={(e) => setTone(e.target.value as Tone)}
                      disabled={isLoading}
                      className={cn(
                        "w-full rounded-lg border px-3 py-2 text-sm appearance-none cursor-pointer transition-colors",
                        "focus:outline-none focus:ring-2 focus:border-transparent",
                        "disabled:opacity-50 disabled:cursor-not-allowed",
                        dark
                          ? "bg-[#111318] border-[#38434f] text-gray-100 focus:ring-[#0077B5]"
                          : "bg-white border-gray-200 text-gray-900 focus:ring-[#0077B5]",
                      )}
                      style={{ paddingRight: "2.5rem" }}
                    >
                      {TONES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    <span className={cn("pointer-events-none absolute right-3 top-1/2 -translate-y-1/2", subTx)}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className={cn("border-t mt-4 pt-4", dividerCls)}>
                  <div className="flex justify-between text-xs mb-2">
                    <span className={subTx}>More Human</span>
                    <span className={cn("font-medium tabular-nums", labelTx)}>{toneValue}</span>
                    <span className={subTx}>More Professional</span>
                  </div>
                  <input
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
              </div>
            </div>

            {/* ── Divider ── */}
            <div className={cn("border-t mx-5", dividerCls)} />

            {/* ── Section: Post Options ── */}
            <div className="px-5 py-4 space-y-3">
              <p className={sectionLabelTx}>Post Options</p>
              <div className={cn(sectionBg, "space-y-0 divide-y", dark ? "divide-[#2a2a2a]" : "divide-gray-100")}>
                {([
                  { label: "Emphasize Hook",    desc: "Max effort on opening lines", checked: focusHook,  set: setFocusHook  },
                  { label: "Include Emojis",    desc: "Add emojis to the content",   checked: useEmojis,  set: setUseEmojis  },
                  { label: "Include Hashtags",  desc: "Add relevant tags at the end",checked: useTags,    set: setUseTags    },
                ] as const).map(({ label, desc, checked, set }) => (
                  <div key={label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                    <div>
                      <p className={cn("text-sm font-medium", labelTx)}>{label}</p>
                      <p className={cn("text-xs mt-0.5", subTx)}>{desc}</p>
                    </div>
                    <Toggle checked={checked} onChange={() => set((v) => !v)} disabled={isLoading} dark={dark} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── Divider ── */}
            <div className={cn("border-t mx-5", dividerCls)} />

            {/* ── Footer: error + generate ── */}
            <div className="px-5 py-4 space-y-3">
              {state.status === "error" && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700">
                  {state.message}
                </div>
              )}
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canSubmit}
                className={cn(
                  "w-full rounded-xl py-3 text-sm font-semibold text-white transition-colors shadow-sm",
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
                ) : "Generate Post"}
              </button>
            </div>
          </div>

          {/* ── Right panel ── */}
          <div className={cn("flex-1 min-w-0 rounded-xl border overflow-hidden", cardBg)}>

            {/* Panel header */}
            <div className={cn("flex items-center justify-between px-5 py-3 border-b", dividerCls, dark ? "bg-[#0d1117]" : "bg-gray-50")}>
              <div className="flex items-center gap-2.5">
                <p className={sectionLabelTx}>Preview</p>
                {state.status === "success" && (
                  <span className={cn(
                    "text-[10px] tabular-nums font-semibold px-2 py-0.5 rounded-full",
                    postOverLimit
                      ? "bg-amber-100 text-amber-700"
                      : "bg-green-100 text-green-700",
                  )}>
                    {postCharCount.toLocaleString()} / {MAX_POST_LENGTH.toLocaleString()}
                  </span>
                )}
              </div>
              <div className={cn("flex rounded-lg overflow-hidden border", dark ? "border-[#38434f]" : "border-gray-200")}>
                {(["desktop", "mobile"] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setPreviewView(v)}
                    className={cn(
                      "px-4 py-1.5 text-xs font-semibold transition-colors capitalize",
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

            {/* Preview body */}
            <div className="px-5 py-5">
              <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
                {state.status === "success" ? "Your LinkedIn post is ready." : ""}
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-64 gap-3">
                  <span className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-[#0077B5] border-t-transparent" />
                  <p className={cn("text-sm", subTx)}>Generating your post…</p>
                </div>
              ) : state.status === "success" ? (
                <div className="space-y-3">
                  <LinkedInCard post={state.post} mobile={previewView === "mobile"} dark={dark} />

                  {/* Action buttons */}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={handleCopy}
                      className={cn(
                        "flex-1 rounded-lg py-2.5 text-sm font-medium transition-colors border",
                        dark
                          ? "border-[#38434f] bg-[#1b1f23] text-gray-300 hover:bg-[#2a2f35]"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
                        "focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-1",
                      )}
                    >
                      {copied ? "✓ Copied!" : "Copy Post"}
                    </button>

                    {liConnected && (
                      <button
                        type="button"
                        onClick={handlePostToLinkedIn}
                        disabled={liPosting || liPosted || postOverLimit}
                        className={cn(
                          "flex-1 rounded-lg py-2.5 text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2",
                          liPosted
                            ? "bg-green-600"
                            : "bg-[#0077B5] hover:bg-[#005e8e] active:bg-[#004f79]",
                          "disabled:opacity-50 disabled:cursor-not-allowed",
                          "focus:outline-none focus:ring-2 focus:ring-[#0077B5] focus:ring-offset-1",
                        )}
                      >
                        {liPosting ? (
                          <>
                            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            Posting…
                          </>
                        ) : liPosted ? (
                          "✓ Posted!"
                        ) : (
                          <>
                            <LinkedInLogo className="w-3.5 h-3.5" />
                            Post to LinkedIn
                          </>
                        )}
                      </button>
                    )}
                  </div>

                  {/* Post error */}
                  {li.status === "post_error" && (
                    <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                      {li.message}
                    </div>
                  )}

                  {/* Not connected nudge */}
                  {!liConnected && (
                    <p className={cn("text-xs text-center", subTx)}>
                      <a href="/api/auth/linkedin" className="text-[#0077B5] font-medium hover:underline">
                        Connect LinkedIn
                      </a>{" "}
                      to post directly from here
                    </p>
                  )}
                </div>
              ) : (
                <EmptyLinkedInCard dark={dark} />
              )}
            </div>
          </div>

        </div>
      </main>

      {/* ── Footer ── */}
      <footer className={cn("border-t py-4 text-center text-xs", footerBg, subTx)}>
        Powered by AI • LinkedIn Post Generator
      </footer>
    </div>
  );
}
