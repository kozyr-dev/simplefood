import qs from "qs";
import { getStrapiURL } from "@/shared/utils/helpers/api";
import { useAuthStore } from "../model/store";

function buildOptions(token: string | null, options: RequestInit): RequestInit {
  return {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> | undefined),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  };
}

export async function fetchWithAuth(
  path: string,
  urlParamsObject: Record<string, unknown> = {},
  options: RequestInit = {},
): Promise<unknown> {
  const queryString = qs.stringify(urlParamsObject);
  const url = getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ""}`);

  const token = useAuthStore.getState().token;
  let response = await fetch(url, buildOptions(token, options));

  if (response.status === 401 && token) {
    const refreshRes = await fetch("/api/auth/refresh", { method: "POST" });

    if (refreshRes.ok) {
      const { jwt } = await refreshRes.json();
      useAuthStore.getState().setToken(jwt);
      response = await fetch(url, buildOptions(jwt, options));
    } else {
      // Refresh token expired — force sign-out
      useAuthStore.getState().resetToken();
      throw new Error("Session expired. Please sign in again.");
    }
  }

  if (!response.ok) {
    throw new Error("An error occurred please try again");
  }

  return response.json();
}
