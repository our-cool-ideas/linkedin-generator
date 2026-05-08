"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Icons ──────────────────────────────────────────────────────────────────

function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function IconTarget() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  );
}
function IconSliders() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <line x1="4" y1="21" x2="4" y2="14" /><line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" /><line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" /><line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" /><line x1="9" y1="8" x2="15" y2="8" /><line x1="17" y1="16" x2="23" y2="16" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function IconPencil() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconShare() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}
function IconStar() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-amber-400">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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

// ── LinkedIn card icons ────────────────────────────────────────────────────

function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
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
function IconThumbUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
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
function IconSendIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-[18px] h-[18px]">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
    </svg>
  );
}

// ── Reaction bubbles ───────────────────────────────────────────────────────

function ReactionLike({ ring }: { ring: string }) {
  return <span className={cn("inline-flex w-[18px] h-[18px] rounded-full items-center justify-center ring-[1.5px] text-[10px] bg-[#0077B5]", ring)}>👍</span>;
}
function ReactionLove({ ring }: { ring: string }) {
  return <span className={cn("inline-flex w-[18px] h-[18px] rounded-full items-center justify-center ring-[1.5px] text-[10px] bg-[#e0245e]", ring)}>❤️</span>;
}
function ReactionInsightful({ ring }: { ring: string }) {
  return <span className={cn("inline-flex w-[18px] h-[18px] rounded-full items-center justify-center ring-[1.5px] text-[10px] bg-[#f5a623]", ring)}>💡</span>;
}

// ── Mock LinkedIn card — exact same visual structure as the generator preview ──

function MockLinkedInCard({ dark }: { dark: boolean }) {
  const bg       = dark ? "bg-[#1d2226]"    : "bg-white";
  const border   = dark ? "border-[#38434f]" : "border-[#e0dfdf]";
  const nameTx   = dark ? "text-[#e8e8e3]"  : "text-[#000000e6]";
  const metaTx   = dark ? "text-[#a8a09b]"  : "text-[#00000099]";
  const bodyTx   = dark ? "text-[#e8e8e3]"  : "text-[#000000e6]";
  const divider  = dark ? "border-[#38434f]" : "border-[#e0dfdf]";
  const ringCol  = dark ? "ring-[#1d2226]"   : "ring-white";
  const actionTx = dark
    ? "text-[#a8a09b] hover:bg-[#ffffff12] hover:text-[#e8e8e3]"
    : "text-[#00000099] hover:bg-[#0000000d] hover:text-[#000000e6]";
  const avatarBg = dark ? "bg-[#38434f] text-[#a8a09b]" : "bg-[#c0c0c0] text-white";

  return (
    <div className={cn(
      "w-full max-w-lg rounded-lg border overflow-hidden font-[system-ui,-apple-system,sans-serif] shadow-xl",
      dark ? "shadow-black/40" : "shadow-gray-200/80",
      bg, border,
    )}>
      {/* Header */}
      <div className="px-4 pt-3 pb-2 flex items-start gap-2">
        <div className={cn("w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0", avatarBg)}>
          <IconPerson />
        </div>
        <div className="flex-1 min-w-0 ml-0.5">
          <div className="flex items-baseline gap-1">
            <p className={cn("text-[13px] font-semibold leading-snug", nameTx)}>Your Name</p>
            <span className={cn("text-xs", metaTx)}>• 1st</span>
          </div>
          <p className={cn("text-[12px] leading-snug mt-0.5 truncate", metaTx)}>
            Your Professional Headline · Company
          </p>
          <div className={cn("flex items-center gap-1 text-[11px] mt-0.5", metaTx)}>
            <span>Just now</span>
            <span>·</span>
            <IconGlobe />
          </div>
        </div>
        <div className="flex items-center gap-0.5 ml-2 flex-shrink-0">
          <button className={cn(
            "text-[#0077B5] text-[13px] font-semibold px-3 py-1 rounded-full border border-[#0077B5]",
            "hover:bg-[#0077B5]/10 transition-colors",
            dark && "border-[#70b5f9] text-[#70b5f9]",
          )}>
            + Follow
          </button>
          <button className={cn("w-8 h-8 flex items-center justify-center rounded-full transition-colors", actionTx)}>
            <IconDots />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className={cn("px-4 pb-3 text-[14px] leading-[1.6]", bodyTx)}>
        <p className="font-semibold mb-3">Most founders confuse traction with product-market fit.</p>
        <p className="mb-3">They see revenue growing. Users coming back. Investors interested.</p>
        <p className="mb-3">And they assume they&apos;ve found PMF.</p>
        <p className="mb-3">They haven&apos;t. They&apos;ve found <strong className="font-semibold">sales-market fit</strong> — which disappears the moment you stop pushing.</p>
        <p className="mb-0">Real PMF pulls. You can barely keep up.</p>
      </div>

      {/* Reactions row */}
      <div className={cn("px-4 py-1.5 flex items-center justify-between", metaTx)}>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center">
            <span className="relative z-30"><ReactionLike ring={ringCol} /></span>
            <span className="relative z-20 -ml-1"><ReactionLove ring={ringCol} /></span>
            <span className="relative z-10 -ml-1"><ReactionInsightful ring={ringCol} /></span>
          </span>
          <span className="text-xs hover:underline cursor-pointer">847</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <button className="hover:underline hover:text-[#0077B5]">112 comments</button>
          <span className="mx-0.5">·</span>
          <button className="hover:underline hover:text-[#0077B5]">34 reposts</button>
        </div>
      </div>

      {/* Action buttons */}
      <div className={cn("border-t flex items-center", divider)}>
        {([
          { icon: <IconThumbUp />,        label: "Like"    },
          { icon: <IconMessageCircle />,  label: "Comment" },
          { icon: <IconRepeat />,         label: "Repost"  },
          { icon: <IconSendIcon />,       label: "Send"    },
        ]).map(({ icon, label }) => (
          <button
            key={label}
            className={cn(
              "flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-colors",
              actionTx,
            )}
          >
            {icon}
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* AI badge */}
      <div className={cn(
        "px-4 py-2 border-t flex items-center gap-2",
        dark ? "bg-[#1a1f2e] border-[#4f46e5]/20" : "bg-[#eef2ff] border-[#4f46e5]/10",
      )}>
        <div className="w-1.5 h-1.5 rounded-full bg-[#4f46e5] animate-pulse" />
        <p className="text-xs text-[#4f46e5] font-medium">Generated by PostGen in 3 seconds</p>
      </div>
    </div>
  );
}

// ── Reusable section components ────────────────────────────────────────────

function FeatureCard({
  icon, title, desc, dark,
}: { icon: React.ReactNode; title: string; desc: string; dark: boolean }) {
  return (
    <div className={cn(
      "rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow duration-200",
      dark ? "bg-[#111318] border-[#1e1e1e]" : "bg-white border-gray-100",
    )}>
      <div className="w-11 h-11 rounded-xl bg-[#4f46e5]/10 text-[#4f46e5] flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className={cn("text-[15px] font-semibold mb-1.5", dark ? "text-gray-100" : "text-gray-900")}>{title}</h3>
      <p className={cn("text-sm leading-relaxed", dark ? "text-gray-400" : "text-gray-500")}>{desc}</p>
    </div>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <div className="w-8 h-8 rounded-full bg-[#4f46e5] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
      {n}
    </div>
  );
}

// ── Main landing content ───────────────────────────────────────────────────

const DARK_KEY = "postgen-dark";

export default function LandingContent() {
  const [dark, setDark] = useState(false);

  // Read persisted preference on mount
  useEffect(() => {
    if (localStorage.getItem(DARK_KEY) === "true") setDark(true);
  }, []);

  function toggleDark() {
    setDark((d) => {
      const next = !d;
      localStorage.setItem(DARK_KEY, String(next));
      return next;
    });
  }

  const pageBg   = dark ? "bg-[#0a0a0a]"   : "bg-white";
  const navBg    = dark ? "bg-[#0a0a0a] border-[#1e1e1e]" : "bg-white border-gray-100";
  const labelTx  = dark ? "text-gray-100"  : "text-gray-900";
  const subTx    = dark ? "text-gray-400"  : "text-gray-500";
  const sectionBg = dark ? "bg-[#0d1117] border-[#1e1e1e]" : "bg-[#f8fafc] border-gray-100";
  const cardBg   = dark ? "bg-[#111318] border-[#1e1e1e]" : "bg-white border-gray-100";
  const footerBg = dark ? "bg-[#0a0a0a] border-[#1e1e1e]" : "bg-white border-gray-100";
  const dividerTx = dark ? "divide-[#1e1e1e]" : "divide-gray-100";

  return (
    <div className={cn("min-h-screen flex flex-col transition-colors duration-200", pageBg)}>

      {/* ── Nav ── */}
      <nav className={cn("border-b px-6 py-4 flex items-center justify-between max-w-6xl mx-auto w-full", navBg)}>
        <span className={cn("text-base font-bold tracking-tight", labelTx)}>
          PostGen<span className="text-[#4f46e5]">.</span>
        </span>
        <div className="flex items-center gap-3">
          {/* Dark mode */}
          <button
            onClick={toggleDark}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className={cn(
              "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
              dark ? "text-yellow-400 hover:bg-[#1e1e1e]" : "text-gray-500 hover:bg-gray-100",
            )}
          >
            {dark ? <IconSun /> : <IconMoon />}
          </button>
          <Link
            href="/generate"
            className="inline-flex items-center gap-1.5 bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors"
          >
            Try Free
            <IconArrowRight />
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 pb-16">
        {/* Free pill */}
        <div className="inline-flex items-center gap-1.5 bg-green-50 border border-green-200 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
          </svg>
          100% Free · No account required
        </div>

        <h1 className={cn("text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight max-w-3xl", labelTx)}>
          LinkedIn posts that{" "}
          <span className="text-[#4f46e5]">people actually read</span>
        </h1>

        <p className={cn("mt-5 text-lg max-w-xl leading-relaxed", subTx)}>
          Paste a rough idea. Pick your tone. Get a scroll-stopping post in seconds —
          with the right hook, structure, and close built in.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-[#4f46e5] hover:bg-[#4338ca] active:bg-[#3730a3] text-white text-base font-semibold px-7 py-3.5 rounded-full transition-colors shadow-md shadow-[#4f46e5]/20"
          >
            Generate Your Post — Free
            <IconArrowRight />
          </Link>
          <p className={cn("text-sm", dark ? "text-gray-500" : "text-gray-400")}>No sign-up. No credit card.</p>
        </div>

        {/* Social proof */}
        <div className="mt-10 flex items-center gap-2">
          <div className="flex -space-x-2">
            {(["#4f46e5", "#6366f1", "#3730a3", "#818cf8"] as const).map((c, i) => (
              <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold" style={{ background: c }}>
                {["A", "M", "J", "S"][i]}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => <IconStar key={i} />)}
          </div>
          <span className={cn("text-sm", subTx)}>Loved by 2,000+ creators</span>
        </div>
      </section>

      {/* ── Mock post — exact LinkedIn card structure ── */}
      <section className="px-6 pb-20 flex justify-center">
        <MockLinkedInCard dark={dark} />
      </section>

      {/* ── Why section ── */}
      <section className={cn("border-y px-6 py-20", sectionBg)}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#4f46e5] mb-3">Why it works</p>
            <h2 className={cn("text-3xl font-bold", labelTx)}>Everything a great LinkedIn post needs.</h2>
            <p className={cn("mt-3 max-w-xl mx-auto", subTx)}>Built on what actually performs — not generic AI fluff.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <FeatureCard dark={dark} icon={<IconBolt />}    title="Hook-first structure" desc="Every post opens with a scroll-stopper — the line that earns the 'see more' tap before anything else." />
            <FeatureCard dark={dark} icon={<IconSliders />} title="Full tone control"    desc="Analytical, Actionable, or Inspirational. Dial from polished-professional to raw-and-human." />
            <FeatureCard dark={dark} icon={<IconTarget />}  title="Built for LinkedIn"   desc="Short paragraphs, white space, a close that invites replies. Not repurposed blog content." />
            <FeatureCard dark={dark} icon={<IconZap />}     title="Seconds, not hours"   desc="Drop a rough idea. Get a post worth publishing. Skip the blank-page paralysis entirely." />
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="px-6 py-20 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4f46e5] mb-3">How it works</p>
          <h2 className={cn("text-3xl font-bold", labelTx)}>Three steps. One great post.</h2>
        </div>
        <div className="space-y-6">
          {[
            { icon: <IconPencil />, title: "Describe your idea",         desc: "Write a sentence or two about what you want to say — no need to polish it. The AI does the heavy lifting." },
            { icon: <IconSliders />, title: "Set your tone and options",  desc: "Choose voice (Analytical, Actionable, Inspirational), dial the formality, and toggle emojis, hashtags, and hook emphasis." },
            { icon: <IconShare />,   title: "Copy or post directly",      desc: "Preview the formatted post, copy the clean text, or connect LinkedIn to publish in one click." },
          ].map((step, i) => (
            <div key={i} className={cn("flex items-start gap-5 rounded-2xl border shadow-sm p-6", cardBg)}>
              <StepBadge n={i + 1} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[#4f46e5]">{step.icon}</span>
                  <h3 className={cn("text-[15px] font-semibold", labelTx)}>{step.title}</h3>
                </div>
                <p className={cn("text-sm leading-relaxed", subTx)}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Free callout ── */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto bg-[#4f46e5] rounded-3xl px-8 py-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full border border-white/10" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border border-white/10" />
          </div>
          <p className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-3">Completely free</p>
          <h2 className="text-3xl font-bold mb-4 leading-tight">
            No subscription.<br />No credit card. No limits.
          </h2>
          <p className="text-white/80 text-base max-w-md mx-auto mb-8">
            Most AI writing tools lock the good stuff behind a paywall. This one doesn&apos;t. Every feature, every tone, every toggle — free.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-8 text-sm font-medium">
            {["All tone options", "Emoji & hashtag control", "Hook emphasis mode", "Live LinkedIn preview", "Direct post to LinkedIn"].map((f) => (
              <span key={f} className="flex items-center gap-1.5 bg-white/15 rounded-full px-3.5 py-1.5">
                <span className="text-white"><IconCheck /></span>
                {f}
              </span>
            ))}
          </div>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 bg-white text-[#4f46e5] hover:bg-indigo-50 text-base font-bold px-8 py-3.5 rounded-full transition-colors shadow-lg"
          >
            Try the Tool — It&apos;s Free
            <IconArrowRight />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className={cn("border-t px-6 py-6 flex items-center justify-between max-w-6xl mx-auto w-full", footerBg)}>
        <span className={cn("text-sm font-bold", labelTx)}>
          PostGen<span className="text-[#4f46e5]">.</span>
        </span>
        <p className={cn("text-xs", subTx)}>Free forever · No account needed</p>
        <Link href="/generate" className="text-xs text-[#4f46e5] font-semibold hover:underline">
          Open Generator →
        </Link>
      </footer>
    </div>
  );
}
