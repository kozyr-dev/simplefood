import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Image from "next/image";
import { UseSendContactForm } from "@/features/Form/sendContactForm";
import { errorMessage } from "@/shared/api";
import { emailField } from "@/shared/lib/validation";
import { MyTextInput, MyTextArea } from "@/shared/ui/forms/FormInputs";
import styles from "./ContactUs.module.scss";

type Status = { ok: true } | { ok: false; message: string } | null;

/** Straight to the API: saved, and the shop gets an email it can reply to. */
export function ContactForm(): React.JSX.Element {
  const [status, setStatus] = useState<Status>(null);
  const sendContactForm = UseSendContactForm();

  return (
    <Formik
      initialValues={{ name: "", email: "", message: "", website: "" }}
      validationSchema={Yup.object({
        name: Yup.string().trim().max(100, "Не більше 100 символів").required("Обов’язкове поле"),
        email: emailField(),
        message: Yup.string().trim().max(5000, "Не більше 5000 символів").required("Обов’язкове поле"),
      })}
      onSubmit={async ({ website, ...values }, { resetForm }): Promise<void> => {
        setStatus(null);
        try {
          await sendContactForm(
            { name: values.name.trim(), email: values.email.trim(), message: values.message.trim() },
            website,
          );
          resetForm();
          setStatus({ ok: true });
        } catch (error) {
          setStatus({ ok: false, message: errorMessage(error, "Помилка. Спробуйте пізніше") });
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form className="form form--contact">
          <div className="form-group">
            <MyTextInput name="name" type="text" placeholder="Ім’я" className="form-control" autoComplete="name" />
          </div>
          <div className="form-group">
            <MyTextInput name="email" type="email" placeholder="Email" className="form-control" autoComplete="email" />
          </div>
          <div className="form-group">
            <MyTextArea cols={40} rows={4} name="message" placeholder="Повідомлення" className="form-control textarea" />
          </div>
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="contact-website">Website</label>
            <Field id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="form-submit">
            <button
              type="submit"
              className={clsx("form-submit-btn", { processing: isSubmitting })}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Відправка..." : "Надіслати"}
            </button>
            {isSubmitting && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
          </div>
          {status && (
            <div className={`form-submit-message status-${status.ok ? 200 : 400}`}>
              <h5>{status.ok ? "Повідомлення відправлене" : status.message}</h5>
            </div>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default ContactForm;
