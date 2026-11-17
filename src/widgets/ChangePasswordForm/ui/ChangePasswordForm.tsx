"use client";

import React, { JSX } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useChangePassword } from "@/features/Auth";
import { errorMessage, fieldErrors } from "@/shared/api";
import { newPasswordField, requiredField } from "@/shared/lib/validation";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";

/** Signs out every other device; this one stays signed in. */
export function ChangePasswordForm(): JSX.Element {
  const changePassword = useChangePassword();
  const { openSnackbar } = useSnackbarHook();

  return (
    <div>
      <h4>Змінити пароль</h4>
      <Formik
        initialValues={{ currentPassword: "", newPassword: "", confirmation: "" }}
        validationSchema={Yup.object({
          currentPassword: requiredField(),
          newPassword: newPasswordField(),
          confirmation: Yup.string()
            .oneOf([Yup.ref("newPassword")], "Паролі не збігаються")
            .required("Обов’язкове поле"),
        })}
        onSubmit={async (values, { resetForm, setErrors }): Promise<void> => {
          try {
            await changePassword({ currentPassword: values.currentPassword, newPassword: values.newPassword });
            resetForm();
            openSnackbar("success", "Пароль змінено. На інших пристроях потрібно увійти знову.");
          } catch (error) {
            const errors = fieldErrors(error);
            if (Object.keys(errors).length) setErrors(errors);
            else openSnackbar("error", errorMessage(error, "Не вдалося змінити пароль."));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form">
            <div className="form-group">
              <MyTextInput
                name="currentPassword"
                type="password"
                placeholder="Поточний пароль"
                className="form-control"
                autoComplete="current-password"
              />
            </div>
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
            <div className="form-submit">
              <button
                type="submit"
                className={clsx("form-submit-btn form-submit-btn--plain", { processing: isSubmitting })}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Відправка..." : "Змінити пароль"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
