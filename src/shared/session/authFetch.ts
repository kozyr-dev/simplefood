import { ApiError, apiRequest, errorFromResponse, type ApiRequestOptions } from "@/shared/api";
import { refreshAccessToken } from "./refresh";
import { useSessionStore } from "./store";

export interface AuthFetchOptions extends Omit<ApiRequestOptions, "token"> {
  /** Sends the token when there is one, and goes ahead without (guest checkout). */
  optional?: boolean;
}

/**
 * An API call as the signed-in user: the access token as a bearer token,
 * one refresh and one retry on a 401. Throws ApiError (401 when there's no
 * session, without calling the API); the tab is signed out when the refresh
 * fails.
 */
export async function authFetch<T>(path: string, { optional = false, ...options }: AuthFetchOptions = {}): Promise<T> {
  let token = useSessionStore.getState().accessToken;
  if (!token && useSessionStore.getState().status === "unknown") {
    token = await refreshAccessToken();
  }

  if (!token && !optional) {
    throw new ApiError(401, "UNAUTHORIZED", "Not signed in");
  }

  let response = await apiRequest(path, { ...options, token });
  if (response.status === 401 && token) {
    // Expired (15 minutes) or revoked: one refresh, shared by every call that
    // hit it. Never retried without a token: an order placed by someone who
    // believes they're signed in must not quietly become a guest's.
    token = await refreshAccessToken();
    if (token) {
      response = await apiRequest(path, { ...options, token });
    }
  }
  if (!response.ok) throw await errorFromResponse(response);
  return (response.status === 204 ? undefined : await response.json()) as T;
}
