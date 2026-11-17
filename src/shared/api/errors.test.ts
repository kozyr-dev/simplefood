import { ApiError } from "./client";
import { errorMessage, fieldErrors } from "./errors";

describe("errorMessage", () => {
  it.each([
    ["INVALID_CREDENTIALS", "Невірна пошта або пароль."],
    ["EMAIL_TAKEN", "Обліковий запис з цією поштою вже існує."],
    ["NETWORK_ERROR", "Немає зв’язку з сервером. Перевірте інтернет і спробуйте ще раз."],
  ])("explains %s", (code, message) => {
    expect(errorMessage(new ApiError(400, code, "x"))).toBe(message);
  });

  it("gives the wait of a 429 in minutes, rounded up", () => {
    expect(errorMessage(new ApiError(429, "TOO_MANY_REQUESTS", "x", [], 290))).toBe(
      "Забагато спроб. Спробуйте ще раз за 5 хв.",
    );
    expect(errorMessage(new ApiError(429, "TOO_MANY_REQUESTS", "x"))).toBe("Забагато спроб. Спробуйте ще раз за 1 хв.");
  });

  it("falls back for unknown codes and other errors", () => {
    expect(errorMessage(new ApiError(500, "INTERNAL_SERVER_ERROR", "x"), "fallback")).toBe("fallback");
    expect(errorMessage(new Error("boom"))).toBe("Сталася помилка. Спробуйте пізніше.");
  });
});

describe("fieldErrors", () => {
  it("puts a field's code next to that field", () => {
    expect(fieldErrors(new ApiError(409, "EMAIL_TAKEN", "x"))).toEqual({
      email: "Обліковий запис з цією поштою вже існує.",
    });
    expect(fieldErrors(new ApiError(400, "WRONG_PASSWORD", "x"))).toEqual({
      currentPassword: "Поточний пароль невірний.",
    });
  });

  it("lists the fields a 400 names, renamed for the form", () => {
    const error = new ApiError(400, "BAD_REQUEST", "x", [
      { field: "phone", messages: ["bad"] },
      { field: "address", messages: ["bad"] },
    ]);

    expect(fieldErrors(error, { address: "street" })).toEqual({
      phone: "Перевірте це поле.",
      street: "Перевірте це поле.",
    });
  });

  it("is empty when nothing points at a field", () => {
    expect(fieldErrors(new ApiError(500, "INTERNAL_SERVER_ERROR", "x"))).toEqual({});
    expect(fieldErrors(new Error("x"))).toEqual({});
  });
});
