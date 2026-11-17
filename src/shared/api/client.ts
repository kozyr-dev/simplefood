/**
 * The API base URL. On the server API_URL (it may be an internal address),
 * in the browser NEXT_PUBLIC_API_URL; both are set in next.config.ts.
 */
export function apiBaseUrl(): string {
  return (typeof window === "undefined" ? process.env.API_URL : process.env.NEXT_PUBLIC_API_URL) ?? "";
}

/** A field the API refused, as `details` lists it (`items.2.productId`). */
export interface FieldError {
  field: string;
  messages: string[];
}

/** The API's error envelope: `{error: {status, code, message, requestId, details?}}`. */
interface ErrorBody {
  error?: {
    status?: number;
    code?: string;
    message?: string;
    details?: FieldError[];
  };
}

/**
 * A failed call. `status` 0: the API couldn't be reached. `code` is the
 * API's (`EMAIL_TAKEN`, `TOO_MANY_REQUESTS`, `NOT_FOUND`...); see errors.ts
 * for what to show.
 */
export class ApiError extends Error {
  override name = "ApiError";

  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly details: FieldError[] = [],
    /** Seconds to wait, from a 429's Retry-After. */
    readonly retryAfter: number | null = null,
  ) {
    super(message);
  }
}

/** The ApiError for a response that isn't ok, from its error envelope. */
export async function errorFromResponse(response: Response): Promise<ApiError> {
  let body: ErrorBody = {};
  try {
    body = (await response.json()) as ErrorBody;
  } catch {
    // Not JSON (a proxy's error page): the status says enough.
  }
  const retryAfter = Number(response.headers.get("Retry-After"));
  return new ApiError(
    response.status,
    body.error?.code ?? `HTTP_${response.status}`,
    body.error?.message ?? response.statusText,
    body.error?.details ?? [],
    Number.isFinite(retryAfter) && retryAfter > 0 ? retryAfter : null,
  );
}

export type Query = Record<string, string | number | boolean | null | undefined>;

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  /** Query parameters; `null` and `undefined` ones are left out. */
  query?: Query;
  /** Sent as JSON. */
  body?: unknown;
  /** Sent as `Authorization: Bearer …`. */
  token?: string | null;
}

/** `/api` + path + query, on the API's host. */
export function apiUrl(path: string, query: Query = {}): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null) params.append(key, String(value));
  }
  const search = params.toString();
  return `${apiBaseUrl()}/api${path}${search ? `?${search}` : ""}`;
}

/** The raw response; throws ApiError(0) when the API can't be reached. */
export async function apiRequest(
  path: string,
  { query, body, token, headers, ...init }: ApiRequestOptions = {},
): Promise<Response> {
  try {
    return await fetch(apiUrl(path, query), {
      ...init,
      headers: {
        Accept: "application/json",
        ...(body === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(headers as Record<string, string> | undefined),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    throw new ApiError(0, "NETWORK_ERROR", (error as Error).message);
  }
}

/** The parsed JSON body (`{data, meta?}`), or undefined for a 204; ApiError otherwise. */
export async function apiFetch<T>(path: string, options?: ApiRequestOptions): Promise<T> {
  const response = await apiRequest(path, options);
  if (!response.ok) throw await errorFromResponse(response);
  return (response.status === 204 ? undefined : await response.json()) as T;
}
