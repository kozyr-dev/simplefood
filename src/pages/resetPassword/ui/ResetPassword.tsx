"use client";

import { JSX, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { resetPassword } from "@/features/Auth";
import { ApiError, errorMessage } from "@/shared/api";
import { useHashToken } from "@/shared/lib/useHashToken";
import { newPasswordField } from "@/shared/lib/validation";
import Button from "@/shared/ui/base/Button/Button";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";

/** The page a password-reset email links to: `/reset-password#token=…` (1 hour, single use). */
export function ResetPassword(): JSX.Element {
  const token = useHashToken();
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <section className="page-section section-padding">
      <div className="container mx-auto max-w-xl">
        <div className="section-title">
          <h2>Новий пароль</h2>
        </div>
        {token === undefined ? null : done ? (
          <>
            <p>Пароль змінено. Увійдіть з новим паролем; на всіх пристроях потрібно увійти знову.</p>
            <Button className="button--green" url="/account">
              Увійти
            </Button>
          </>
        ) : !token ? (
          <p>Посилання неповне. Відкрийте його з листа ще раз або попросіть нове на сторінці входу.</p>
        ) : (
          <Formik
            initialValues={{ newPassword: "", confirmation: "" }}
            validationSchema={Yup.object({
              newPassword: newPasswordField(),
              confirmation: Yup.string()
                .oneOf([Yup.ref("newPassword")], "Паролі не збігаються")
                .required("Обов’язкове поле"),
            })}
            onSubmit={async ({ newPassword }): Promise<void> => {
              setError(null);
              try {
                await resetPassword(token, newPassword);
                setDone(true);
              } catch (e) {
                setError(
                  e instanceof ApiError && e.code === "INVALID_TOKEN"
                    ? "Посилання недійсне, застаріле або вже використане. Попросіть нове на сторінці входу («Забули ваш пароль?»)."
                    : errorMessage(e),
                );
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="form">
                <div className="form-group">
                  <MyTextInput
                    name="newPassword"
                    type="password"
                    placeholder="Новий пароль (щонайменше 8 символів)"
                    className="form-control"
                    autoComplete="new-password"
                  />
                </div>
                <div className="form-group">
                  <MyTextInput
                    name="confirmation"
                    type="password"
                    placeholder="Новий пароль ще раз"
                    className="form-control"
                    autoComplete="new-password"
                  />
                </div>
                {error && <p className="error-message">{error}</p>}
                <div className="form-submit">
                  <button
                    type="submit"
                    className={clsx("form-submit-btn", { processing: isSubmitting })}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Відправка..." : "Зберегти пароль"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </section>
  );
}
