import { NextRequest, NextResponse } from "next/server";

const STRAPI_URL = process.env.API_URL;
const REFRESH_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: "No refresh token" }, { status: 401 });
  }

  const strapiRes = await fetch(`${STRAPI_URL}/api/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!strapiRes.ok) {
    const response = NextResponse.json({ error: "Token refresh failed" }, { status: 401 });
    response.cookies.delete("refresh_token");
    return response;
  }

  const { jwt, refreshToken: newRefreshToken } = await strapiRes.json();
  const response = NextResponse.json({ jwt });

  // Rotate the refresh token if Strapi returns a new one
  const tokenToSet = newRefreshToken ?? refreshToken;
  response.cookies.set("refresh_token", tokenToSet, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: REFRESH_MAX_AGE,
    path: "/",
  });

  return response;
}
