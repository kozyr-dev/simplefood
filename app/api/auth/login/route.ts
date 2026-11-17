import { NextRequest, NextResponse } from "next/server";
import { callApi, passError, readBody, startSession } from "../_lib/session";

export async function POST(request: NextRequest) {
  const body = await readBody(request);
  if (body instanceof NextResponse) return body;

  const apiResponse = await callApi(request, "login", body);
  return apiResponse.ok ? startSession(apiResponse) : passError(apiResponse);
}
