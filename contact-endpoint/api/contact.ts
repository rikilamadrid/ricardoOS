import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN ?? "https://ricardolamadrid.com";
const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "riki.lamadrid@gmail.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "RicardoOS <onboarding@resend.dev>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 5;

// In-memory only — good enough as a basic abuse deterrent given Fluid
// Compute reuses instances; not a durable/distributed limiter.
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const origin = req.headers.origin;
  if (origin && origin !== ALLOWED_ORIGIN) {
    res.status(403).json({ error: "Forbidden" });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] as string | undefined)?.split(",")[0]?.trim() ??
    req.socket.remoteAddress ??
    "unknown";
  if (isRateLimited(ip)) {
    res.status(429).json({ error: "Too many requests" });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const { name, email, message, company } = body;

  // Honeypot — bots fill this, real users never see it. Pretend success.
  if (typeof company === "string" && company.trim().length > 0) {
    res.status(200).json({ ok: true });
    return;
  }

  if (typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({ error: "Name is required" });
    return;
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    res.status(400).json({ error: "A valid email is required" });
    return;
  }
  if (typeof message !== "string" || message.trim().length < 5) {
    res.status(400).json({ error: "Message is too short" });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "Server misconfigured" });
    return;
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email.trim(),
      subject: `New message from ${name.trim()} via RicardoOS`,
      text: message.trim(),
    });

    if (error) {
      console.error("Resend send error:", error);
      res.status(502).json({ error: "Failed to send" });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend send threw:", err);
    res.status(502).json({ error: "Failed to send" });
  }
}
