import { notFound } from "next/navigation";
import { ApiError } from "@/shared/api";

/**
 * The value, or Next's not-found page for an API 404 (an unknown or
 * unpublished page or post). Called on the server before anything is
 * streamed, so the response really is a 404. Other errors propagate.
 */
export async function notFoundOn404<T>(load: Promise<T>): Promise<T> {
  try {
    return await load;
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }
}
