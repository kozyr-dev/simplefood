"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import Image from "next/image";
import { useSignUp } from "@/features/Auth";
import styles from "./SignUp.module.scss";

export function SignUp(): React.JSX.Element {
  const [formProcessing, setFormProcessing] = useState(false);

  const signUp = useSignUp();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const submitBtnClass = classNames({
    processing: formProcessing,
  });

  return (
    <>
      <h4 className={styles["title"]}>Реєстрація</h4>

      <Formik
        initialValues={{
          name: "",
          phone: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().max(30, "Must be 30 characters or less").required("Required Field"),
          phone: Yup.string().phone("UA", true).required("Required Field"),
          email: Yup.string().email("Invalid email address").required("Required Field"),
          password: Yup.string().min(7, "Must be 7 characters or more").required("Required Field"),
        })}
        onSubmit={async (values, { setSubmitting }): Promise<void> => {
          try {
            const response = await signUp({
              username: values.name,
              email: values.email,
              phone: values.phone,
              password: values.password,
            });
            if (typeof window !== "undefined") {
              console.log("User profile", JSON.stringify(response));
            }
          } catch (error) {
            if (typeof window !== "undefined") {
              console.log("An error occurred:", error);
            }
          }

          setFormProcessing(false);

          setSubmitting(false);
        }}
      >
        <Form className="form register-form">
          <div className="form-group">
            <MyTextInput name="name" type="text" placeholder="Iм`я" className="form-control" />
          </div>
          <div className="form-group">
            <MyTextInput name="email" type="email" placeholder="Адреса електронної пошти" className="form-control" />
          </div>
          <div className="form-group">
            <MyTextInput name="phone" type="tel" placeholder="(111)111-1111" className="form-control" />
          </div>
          <div className="form-group">
            <MyTextInput name="password" type="password" placeholder="Пароль" className="form-control" />
          </div>
          <div className="gray">
            <div className={styles["privacy-policy-text"]}>
              <p>
                Ваші особисті дані будуть використовуватися для спрощення вашої роботи з сайтом, управління доступом до
                вашого облікового запису та для інших цілей.
              </p>
            </div>
          </div>
          <div className={styles["form-submit"]}>
            <button type="submit" className={"form-submit-btn " + submitBtnClass} disabled={formProcessing}>
              {((): string => (formProcessing ? "Обробка..." : "Реєстрація"))()}
            </button>
            {formProcessing && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
          </div>
        </Form>
      </Formik>
    </>
  );
}
