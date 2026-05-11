"use client";

import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import MicroModal from "micromodal";
import Image from "next/image";
import { useSignIn } from "@/features/Auth";
import { useSetUser } from "@/entities/User/model/selectors";
import Portal from "@/shared/ui/Portal/Portal";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import ModalResetPassword from "@/shared/ui/modals/ModalResetPassword/ModalResetPassword";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import styles from "./SignIn.module.scss";

export function SignIn(): React.JSX.Element {
  const [formProcessing, setFormProcessing] = useState(false);
  const { openSnackbar } = useSnackbarHook();
  const signIn = useSignIn();
  const setUser = useSetUser();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const submitBtnClass = classNames({
    processing: formProcessing,
  });

  useEffect(() => {
    // Dynamically load MicroModal.js
    (async () => {
      MicroModal.init({
        disableScroll: true,
        disableFocus: true,
        awaitCloseAnimation: true,
        debugMode: false,
      });
    })();
  }, []);

  const openLostPasswordPopup = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    MicroModal.show("forgotPasswordModal");
  };

  return (
    <div>
      <h4 className={styles["title"]}>УВІЙТИ</h4>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        validationSchema={Yup.object({
          username: Yup.string().max(30, "Must be 30 characters or less").required("Required Field"),
          password: Yup.string().min(7, "Must be 7 characters or more").required("Required Field"),
        })}
        onSubmit={async (values, { setSubmitting }): Promise<void> => {
          try {
            const user = await signIn({ identifier: values.username, password: values.password });
            //console.log('User profile', JSON.stringify(user));
            setUser(user);
          } catch (error) {
            if (typeof window !== "undefined") {
              console.log("An error occurred:", error);
              openSnackbar("error", "Error signing in.");
            }
          }

          setFormProcessing(false);
          setSubmitting(false);
        }}
      >
        <Form className="form login-form">
          <div className="form-group">
            <MyTextInput
              name="username"
              type="text"
              placeholder="Ім'я користувача чи адреса електронної пошти"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <MyTextInput name="password" type="password" placeholder="Пароль" className="form-control" />
          </div>
          {/* <p className="lost-password">
            <a href="" onClick={openLostPasswordPopup}>
              Забули ваш пароль?
            </a>
          </p> */}
          <div className={styles["form-submit"]}>
            <button type="submit" className={"form-submit-btn " + submitBtnClass} disabled={formProcessing}>
              {((): string => (formProcessing ? "Обробка..." : "Увійти"))()}
            </button>
            {formProcessing && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
          </div>
        </Form>
      </Formik>

      <Portal>
        <ModalResetPassword>{<>Modal Content</>}</ModalResetPassword>
      </Portal>
    </div>
  );
}
