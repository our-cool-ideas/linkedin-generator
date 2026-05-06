import { NextRequest, NextResponse } from "next/server";
import { getOpenAI } from "@/lib/openai";
import { buildDynamicPrompt } from "@/lib/prompt";
import { ratelimit } from "@/lib/rateLimit";
import { GenerateRequestSchema } from "@/lib/validation";

function getClientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const timestamp = new Date().toISOString();

  // Rate limiting (Story 2.2)
  let rateLimitPassed = true;
  try {
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      console.error(`[${timestamp}] RATE_LIMIT ip=${ip} status=429`);
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 },
      );
    }
  } catch (err) {
    // Fail-open: Redis outage should not block users
    console.error(`[${timestamp}] RATE_LIMIT_ERROR ip=${ip}`, err);
    rateLimitPassed = false;
  }

  // Parse and validate input (Story 2.1)
  let brief: string;
  let tone: "Analytical" | "Actionable" | "Inspirational";
  let toneValue: number;
  let useEmojis: boolean;
  let useTags: boolean;
  try {
    const body = await req.json();
    const parsed = GenerateRequestSchema.safeParse(body);
    if (!parsed.success) {
      const message = parsed.error.issues[0]?.message ?? "Invalid request.";
      console.error(
        `[${timestamp}] VALIDATION_ERROR ip=${ip} status=400 message="${message}"`,
      );
      return NextResponse.json({ error: message }, { status: 400 });
    }
    brief = parsed.data.brief;
    tone = parsed.data.tone;
    toneValue = parsed.data.toneValue;
    useEmojis = parsed.data.useEmojis;
    useTags = parsed.data.useTags;
  } catch {
    console.error(`[${timestamp}] PARSE_ERROR ip=${ip} status=400`);
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  console.log(
    `[${timestamp}] GENERATE ip=${ip} rateLimit=${rateLimitPassed} tone=${tone} toneValue=${toneValue} brief="${brief.slice(0, 50)}${brief.length > 50 ? "…" : ""}"`,
  );

  // AI generation with 15s timeout (Stories 2.3 + 2.4)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  try {
    const completion = await getOpenAI().chat.completions.create(
      {
        model: "poolside/laguna-xs.2:free",
        messages: [{ role: "user", content: buildDynamicPrompt(tone, toneValue, useEmojis, useTags) + brief }],
      },
      { signal: controller.signal },
    );

    clearTimeout(timeoutId);

    const post = completion.choices[0]?.message?.content;

    if (!post) {
      console.error(`[${timestamp}] NULL_CONTENT ip=${ip} status=500`);
      return NextResponse.json(
        { error: "Generation failed. Please try again." },
        { status: 500 },
      );
    }

    console.log(
      `[${timestamp}] SUCCESS ip=${ip} model=gpt-4o-mini` +
        (completion.usage ? ` tokens=${completion.usage.total_tokens}` : ""),
    );

    return NextResponse.json({ post });
  } catch (err) {
    clearTimeout(timeoutId);

    const isTimeout =
      err instanceof Error &&
      (err.name === "AbortError" || err.message.includes("abort"));

    const internalMessage = isTimeout
      ? "OpenAI call timed out after 15s"
      : String(err);
    console.error(
      `[${timestamp}] ${isTimeout ? "TIMEOUT" : "OPENAI_ERROR"} ip=${ip} status=500 err="${internalMessage}"`,
    );

    return NextResponse.json(
      {
        error: isTimeout
          ? "Generation timed out. Please try again."
          : "Generation failed. Please try again.",
      },
      { status: 500 },
    );
  }
}
