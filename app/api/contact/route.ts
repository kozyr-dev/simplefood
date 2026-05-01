import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body as Record<string, unknown>;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Name is required" }, { status: 422 });
  }
  if (name.trim().length > 30) {
    return NextResponse.json({ error: "Name must be 30 characters or less" }, { status: 422 });
  }
  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 422 });
  }
  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json({ error: "Message is required" }, { status: 422 });
  }

  try {
    const strapiRes = await fetch(`${process.env.API_URL}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { name: name.trim(), email, message: message.trim() } }),
    });

    if (!strapiRes.ok) {
      return NextResponse.json({ error: "Failed to save submission" }, { status: 502 });
    }

    const data = await strapiRes.json();
    return NextResponse.json(data, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
