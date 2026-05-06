"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { GeneratorState } from "@/types";
import Markdown from "react-markdown";

const MAX_BRIEF_LENGTH = 500;

export default function PostGenerator() {
  const [brief, setBrief] = useState("");
  const [state, setState] = useState<GeneratorState>({ status: "idle" });
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isLoading = state.status === "loading";
  const isAtLimit = brief.length >= MAX_BRIEF_LENGTH;
  const canSubmit = !isLoading && brief.trim().length > 0 && !isAtLimit;
  const showClear = brief.length > 0 || state.status !== "idle";

  async function handleGenerate() {
    if (!canSubmit) return;

    setState({ status: "loading" });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ brief: brief.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setState({
          status: "error",
          message: data.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setState({ status: "success", post: data.post });
    } catch {
      setState({
        status: "error",
        message: "Something went wrong. Please try again.",
      });
    }
  }

  async function handleCopy() {
    if (state.status !== "success") return;
    await navigator.clipboard.writeText(state.post);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function handleClear() {
    setBrief("");
    setState({ status: "idle" });
    setCopied(false);
    textareaRef.current?.focus();
  }

  return (
    <div className="w-full space-y-6">
      {/* Always-mounted live region so screen readers register it on page load */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {state.status === "success" ? "Your LinkedIn post is ready." : ""}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="space-y-4"
        aria-busy={isLoading}
      >
        <div className="space-y-1">
          <label
            htmlFor="brief"
            className="block text-sm font-medium text-gray-700"
          >
            Your brief
          </label>
          <textarea
            ref={textareaRef}
            id="brief"
            name="brief"
            value={brief}
            onChange={(e) =>
              setBrief(e.target.value.slice(0, MAX_BRIEF_LENGTH))
            }
            disabled={isLoading}
            placeholder="E.g. Why most founders mistake product-market fit for sales traction"
            rows={4}
            maxLength={MAX_BRIEF_LENGTH}
            aria-describedby="brief-count"
            className={cn(
              "w-full rounded-lg border px-4 py-3 text-gray-900 placeholder-gray-500",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed",
              "resize-none text-base transition-colors",
              isAtLimit ? "border-red-400" : "border-gray-300",
            )}
          />
          <div className="flex items-center justify-between">
            <p
              id="brief-count"
              aria-live="polite"
              className={cn(
                "text-xs tabular-nums",
                isAtLimit ? "text-red-600 font-medium" : "text-gray-600",
              )}
            >
              {brief.length}/{MAX_BRIEF_LENGTH}
              {isAtLimit && " — character limit reached"}
            </p>
            {showClear && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear input and reset"
                className={cn(
                  "min-h-[44px] min-w-[44px] flex items-center justify-center",
                  "text-xs text-gray-600 hover:text-gray-900",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2",
                )}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
          className={cn(
            "w-full rounded-lg px-6 py-3 text-base font-semibold text-white min-h-[44px]",
            "bg-blue-600 hover:bg-blue-700 active:bg-blue-800",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
            "disabled:bg-blue-300 disabled:cursor-not-allowed",
            "transition-colors",
          )}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-2">
              <span
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                aria-hidden="true"
              />
              <span>Generating…</span>
            </span>
          ) : (
            "Generate Post"
          )}
        </button>
      </form>

      {state.status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      {state.status === "success" && (
        <div className="space-y-3">
          <div
            aria-label="Generated LinkedIn post"
            className="rounded-lg border border-gray-200 bg-white px-5 py-4 text-gray-900 text-sm leading-relaxed whitespace-pre-wrap"
          >
            <Markdown>{state.post}</Markdown>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className={cn(
              "w-full rounded-lg px-6 py-3 text-base font-semibold min-h-[44px]",
              "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 active:bg-gray-100",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
              "transition-colors",
            )}
          >
            {copied ? "✓ Copied!" : "Copy Post"}
          </button>
        </div>
      )}
    </div>
  );
}
