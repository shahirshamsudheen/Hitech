import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxies the site's chat widget to an n8n webhook.
 *
 * Kept server-side so the n8n webhook URL (and optional shared secret)
 * never reach the browser — only this route's own path is public.
 *
 * Required env var: N8N_WEBHOOK_URL
 * Optional env var: N8N_WEBHOOK_SECRET (sent as X-Webhook-Secret header)
 */

const MAX_MESSAGE_LENGTH = 2000;
const UPSTREAM_TIMEOUT_MS = 30000;

export async function POST(request: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { error: 'Chat is not configured yet.' },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const { message, sessionId } = (body ?? {}) as { message?: unknown; sessionId?: unknown };

  if (typeof message !== 'string' || !message.trim()) {
    return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json({ error: 'Message is too long.' }, { status: 400 });
  }
  if (typeof sessionId !== 'string' || !sessionId) {
    return NextResponse.json({ error: 'Session ID is required.' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(process.env.N8N_WEBHOOK_SECRET
          ? { 'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET }
          : {}),
      },
      body: JSON.stringify({
        chatInput: message.trim(),
        message: message.trim(),
        sessionId,
        source: 'hitech-website',
        page: request.headers.get('referer') ?? undefined,
      }),
      signal: controller.signal,
    });

    if (!upstream.ok) {
      return NextResponse.json(
        { error: 'The assistant is unavailable right now.' },
        { status: 502 }
      );
    }

    const data = await upstream.json().catch(() => null);
    const reply =
      (data && (data.reply ?? data.output ?? data.text ?? data.response ?? data.message)) ??
      null;

    if (typeof reply !== 'string' || !reply.trim()) {
      return NextResponse.json(
        { error: 'The assistant sent an empty response.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    const isAbort = err instanceof Error && err.name === 'AbortError';
    return NextResponse.json(
      { error: isAbort ? 'The assistant took too long to respond.' : 'The assistant is unavailable right now.' },
      { status: 504 }
    );
  } finally {
    clearTimeout(timeout);
  }
}
