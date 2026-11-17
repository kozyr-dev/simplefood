import * as Yup from "yup";

/*
 * The API's rules for the fields people type, so a form refuses what the
 * API would (api/src/users/dto/user-fields.dto.ts, orders' and contact's DTOs).
 */

/** As the API takes it: digits, spaces, "-", "(", ")", optionally after "+"; 7–20 characters. */
export const PHONE_PATTERN = /^\+?[\d\s()-]{7,20}$/;
/** bcrypt's limit, in UTF-8 bytes. */
export const PASSWORD_MAX_BYTES = 72;
export const PASSWORD_MIN_LENGTH = 8;

const REQUIRED = "Обов’язкове поле";

/** Bytes in UTF-8: what bcrypt counts. */
export function utf8Length(value: string): number {
  let bytes = 0;
  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    bytes += code < 0x80 ? 1 : code < 0x800 ? 2 : code < 0x10000 ? 3 : 4;
  }
  return bytes;
}

export const nameField = () =>
  Yup.string().trim().min(2, "Щонайменше 2 символи").max(100, "Не більше 100 символів").required(REQUIRED);

export const emailField = () =>
  Yup.string().trim().email("Невірна адреса пошти").max(254, "Не більше 254 символів").required(REQUIRED);

export const phoneField = () =>
  Yup.string().trim().matches(PHONE_PATTERN, "Номер телефону: цифри, пробіли, дужки, дефіси; 7–20 символів");

/** A new password: 8 characters or more, at most 72 bytes (fewer with Cyrillic letters). */
export const newPasswordField = () =>
  Yup.string()
    .min(PASSWORD_MIN_LENGTH, `Щонайменше ${PASSWORD_MIN_LENGTH} символів`)
    .test(
      "bytes",
      "Пароль задовгий (кирилиця займає вдвічі більше місця)",
      (value) => !value || utf8Length(value) <= PASSWORD_MAX_BYTES,
    )
    .required(REQUIRED);

export const requiredField = () => Yup.string().required(REQUIRED);
