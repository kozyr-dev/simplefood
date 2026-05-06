import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.API_URL;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/auth/local/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await strapiRes.json();

  if (!strapiRes.ok) {
    return NextResponse.json(data, { status: strapiRes.status });
  }

  const { jwt, refreshToken, user } = data;
  const response = NextResponse.json({ jwt, user });

  if (refreshToken) {
    response.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: REFRESH_MAX_AGE,
      path: "/",
    });
  }

  return response;
}
