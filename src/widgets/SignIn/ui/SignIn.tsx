"use client";

import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import MicroModal from "micromodal";
import Image from "next/image";
import { useSignIn } from "@/features/Auth";
import { errorMessage } from "@/shared/api";
import { emailField, requiredField } from "@/shared/lib/validation";
import Portal from "@/shared/ui/Portal/Portal";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import ModalResetPassword from "@/shared/ui/modals/ModalResetPassword/ModalResetPassword";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import styles from "./SignIn.module.scss";

export function SignIn(): React.JSX.Element {
  const { openSnackbar } = useSnackbarHook();
  const signIn = useSignIn();

  useEffect(() => {
    MicroModal.init({
      disableScroll: true,
      disableFocus: true,
      awaitCloseAnimation: true,
      debugMode: false,
    });
  }, []);

  const openLostPasswordPopup = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    MicroModal.show("forgotPasswordModal");
  };

  return (
    <div>
      <h4 className={styles["title"]}>УВІЙТИ</h4>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: emailField(),
          // No length rule: older accounts may have shorter passwords.
          password: requiredField(),
        })}
        onSubmit={async (values): Promise<void> => {
          try {
            await signIn({ email: values.email.trim(), password: values.password });
          } catch (error) {
            openSnackbar("error", errorMessage(error, "Не вдалося увійти."));
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="form login-form">
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
              <MyTextInput
                name="password"
                type="password"
                placeholder="Пароль"
                className="form-control"
                autoComplete="current-password"
              />
            </div>
            <p className="gray">Вхід за адресою пошти (ім’я користувача більше не підходить).</p>
            <p className="lost-password">
              <a href="#" onClick={openLostPasswordPopup}>
                Забули ваш пароль?
              </a>
            </p>
            <div className={styles["form-submit"]}>
              <button
                type="submit"
                className={clsx("form-submit-btn", { processing: isSubmitting })}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Обробка..." : "Увійти"}
              </button>
              {isSubmitting && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
            </div>
          </Form>
        )}
      </Formik>

      <Portal>
        <ModalResetPassword />
      </Portal>
    </div>
  );
}
