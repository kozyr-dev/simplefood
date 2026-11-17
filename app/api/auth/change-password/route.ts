import { NextRequest, NextResponse } from "next/server";
import { callApi, passError, readBody, startSession } from "../_lib/session";

/** Needs the access token (Authorization); every other session ends, this one gets a new pair. */
export async function POST(request: NextRequest) {
  const body = await readBody(request);
  if (body instanceof NextResponse) return body;

  const apiResponse = await callApi(request, "change-password", body);
  return apiResponse.ok ? startSession(apiResponse) : passError(apiResponse);
}
