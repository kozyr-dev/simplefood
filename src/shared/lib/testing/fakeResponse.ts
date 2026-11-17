/**
 * For tests: enough of a fetch Response for the API client (jsdom has no
 * fetch globals). Status 204 has no body.
 */
export function fakeResponse(status: number, body?: unknown, headers: Record<string, string> = {}): Response {
  const lower = Object.fromEntries(Object.entries(headers).map(([key, value]) => [key.toLowerCase(), value]));
  return {
    ok: status >= 200 && status < 300,
    status,
    statusText: `status ${status}`,
    headers: { get: (name: string) => lower[name.toLowerCase()] ?? null },
    json: async () => {
      if (body === undefined) throw new SyntaxError("Unexpected end of JSON input");
      return body;
    },
    text: async () => (body === undefined ? "" : JSON.stringify(body)),
  } as unknown as Response;
}

/** An API error body, as the API sends it. */
export function apiError(status: number, code: string, details?: { field: string; messages: string[] }[]) {
  return { error: { status, code, message: `message for ${code}`, requestId: "req-1", ...(details && { details }) } };
}
