"use client";

import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Image from "next/image";
import { useSignUp } from "@/features/Auth";
import { errorMessage, fieldErrors } from "@/shared/api";
import { emailField, nameField, newPasswordField, phoneField } from "@/shared/lib/validation";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import styles from "./SignUp.module.scss";

export function SignUp(): React.JSX.Element {
  const { openSnackbar } = useSnackbarHook();
  const signUp = useSignUp();

  return (
    <>
      <h4 className={styles["title"]}>Реєстрація</h4>

      <Formik
        initialValues={{ name: "", phone: "", email: "", password: "" }}
        validationSchema={Yup.object({
          // Not unique: customers may share a name; the email is the login.
          name: nameField(),
          phone: phoneField().required("Обов’язкове поле"),
          email: emailField(),
          password: newPasswordField(),
        })}
        onSubmit={async (values, { setErrors }): Promise<void> => {
          try {
            await signUp({
              name: values.name.trim(),
              email: values.email.trim(),
              phone: values.phone.trim(),
              password: values.password,
            });
            // A verification link is on its way: the account page says so.
          } catch (error) {
            const errors = fieldErrors(error);
            if (Object.keys(errors).length) setErrors(errors);
            else openSnackbar("error", errorMessage(error, "Не вдалося зареєструватися."));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form register-form">
            <div className="form-group">
              <MyTextInput name="name" type="text" placeholder="Iм`я" className="form-control" autoComplete="name" />
            </div>
            <div className="form-group">
              <MyTextInput
                name="email"
                type="email"
                placeholder="Адреса електронної пошти"
                className="form-control"
                autoComplete="email"
              />
            </div>
            <div className="form-group">
              <MyTextInput name="phone" type="tel" placeholder="(111)111-1111" className="form-control" autoComplete="tel" />
            </div>
            <div className="form-group">
              <MyTextInput
                name="password"
                type="password"
                placeholder="Пароль (щонайменше 8 символів)"
                className="form-control"
                autoComplete="new-password"
              />
            </div>
            <div className="gray">
              <div className={styles["privacy-policy-text"]}>
                <p>
                  Ваші особисті дані будуть використовуватися для спрощення вашої роботи з сайтом, управління доступом
                  до вашого облікового запису та для інших цілей.
                </p>
              </div>
            </div>
            <div className={styles["form-submit"]}>
              <button
                type="submit"
                className={clsx("form-submit-btn", { processing: isSubmitting })}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Обробка..." : "Реєстрація"}
              </button>
              {isSubmitting && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
