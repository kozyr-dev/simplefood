import { ApiError } from "./client";

/** What a visitor reads for each API error code. The API's own messages are English. */
const MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "Невірна пошта або пароль.",
  ACCOUNT_BLOCKED: "Цей обліковий запис заблоковано. Зв’яжіться з нами.",
  EMAIL_TAKEN: "Обліковий запис з цією поштою вже існує.",
  WRONG_PASSWORD: "Поточний пароль невірний.",
  CURRENT_PASSWORD_REQUIRED: "Щоб змінити пошту, введіть поточний пароль.",
  INVALID_TOKEN: "Посилання недійсне або вже використане. Попросіть нове.",
  PRODUCTS_UNAVAILABLE: "Деякі страви зараз недоступні.",
  NETWORK_ERROR: "Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз.",
};

const FALLBACK = "Сталася помилка. Спробуйте пізніше.";

/** A message for any error a call threw; `fallback` for unknown ones. */
export function errorMessage(error: unknown, fallback = FALLBACK): string {
  if (!(error instanceof ApiError)) return fallback;
  if (error.status === 429) {
    const minutes = Math.max(1, Math.ceil((error.retryAfter ?? 60) / 60));
    return `Забагато спроб. Спробуйте ще раз за ${minutes} хв.`;
  }
  return MESSAGES[error.code] ?? fallback;
}

/** The field each code belongs to, so a form can show it next to the input. */
const CODE_FIELDS: Record<string, string> = {
  EMAIL_TAKEN: "email",
  WRONG_PASSWORD: "currentPassword",
  CURRENT_PASSWORD_REQUIRED: "currentPassword",
};

/**
 * Formik errors from an API error: a code that belongs to a field, or the
 * fields a 400 lists (`details`). `rename` maps API fields to form fields.
 * Empty when nothing points at a field: show errorMessage() instead.
 */
export function fieldErrors(error: unknown, rename: Record<string, string> = {}): Record<string, string> {
  if (!(error instanceof ApiError)) return {};
  const field = CODE_FIELDS[error.code];
  if (field) return { [rename[field] ?? field]: MESSAGES[error.code] };
  if (error.status !== 400) return {};
  return Object.fromEntries(
    error.details.map(({ field: name }) => [rename[name] ?? name, "Перевірте це поле."]),
  );
}
