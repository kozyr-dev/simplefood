"use client";

import React, { JSX, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { apiFetch, errorMessage } from "@/shared/api";
import { emailField } from "@/shared/lib/validation";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";

/**
 * "Forgot your password?": asks the API to email a reset link. The answer
 * is the same whether or not an account has the address, so it can't be
 * used to find out who has one.
 */
export default function ModalResetPassword(): JSX.Element {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="modal modal--small micromodal-slide form-modal" id="forgotPasswordModal" aria-hidden="true">
      <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true" aria-labelledby="forgotPasswordTitle">
          <div className="modal__container__i">
            <header className="modal__header">
              <h2 className="modal__title" id="forgotPasswordTitle">
                Відновлення пароля
              </h2>
              <button className="modal__close" aria-label="Закрити" data-micromodal-close></button>
            </header>
            <div className="modal__content">
              {sent ? (
                <p>
                  Якщо обліковий запис з цією поштою існує, ми надіслали на неї посилання для нового пароля. Воно
                  діє одну годину.
                </p>
              ) : (
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={Yup.object({ email: emailField() })}
                  onSubmit={async ({ email }): Promise<void> => {
                    setError(null);
                    try {
                      await apiFetch<void>("/auth/forgot-password", { method: "POST", body: { email: email.trim() } });
                      setSent(true);
                    } catch (e) {
                      setError(errorMessage(e));
                    }
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="form">
                      <p>Введіть пошту облікового запису: ми надішлемо посилання для нового пароля.</p>
                      <div className="form-group">
                        <MyTextInput
                          name="email"
                          type="email"
                          placeholder="Адреса електронної пошти"
                          className="form-control"
                          autoComplete="email"
                        />
                      </div>
                      {error && <p className="error-message">{error}</p>}
                      <div className="form-submit">
                        <button
                          type="submit"
                          className={clsx("form-submit-btn", { processing: isSubmitting })}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Відправка..." : "Надіслати посилання"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
