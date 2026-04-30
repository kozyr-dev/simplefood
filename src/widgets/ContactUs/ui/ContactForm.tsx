import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classNames from "classnames/bind";
import { MyTextInput, MyTextArea } from "./FormInputs";
import Image from "next/image";
//import contactForm from "../../api/contactForm";

export function ContactForm(): React.JSX.Element {
  const [formStatus, setFormStatus] = useState<null | number>(null);
  const [formProcessing, setFormProcessing] = useState(false);

  // @ts-ignore
  const submitBtnClass = classNames({
    processing: formProcessing,
  });

  return (
    <Formik
      initialValues={{
        name: "",
        message: "",
        email: "",
      }}
      validationSchema={Yup.object({
        name: Yup.string().max(30, "Must be 30 characters or less").required("Required Field"),
        message: Yup.string().required("Required Field"),
        email: Yup.string().email("Invalid email address").required("Required Field"),
      })}
      onSubmit={async (values, { setSubmitting }): Promise<void> => {
        setFormProcessing(true);

        //const result = await contactForm.send(values);

        // @ts-ignore
        setFormStatus(result.status);
        setFormProcessing(false);

        setSubmitting(false);
      }}
    >
      <Form className="form form--contact">
        <div className="form-group">
          <MyTextInput name="name" type="text" placeholder="Ім’я" className="form-control" />
        </div>
        <div className="form-group">
          <MyTextInput name="email" type="email" placeholder="Email" className="form-control" />
        </div>
        <div className="form-group">
          <MyTextArea
            columns={40}
            rows={4}
            name="message"
            type="textarea"
            placeholder="Повідомлення"
            className="form-control textarea"
          />
        </div>
        <div className="form-submit">
          <button type="submit" className={"form-submit-btn " + submitBtnClass} disabled={formProcessing}>
            {((): string => (formProcessing ? "Відправка..." : "Надіслати"))()}
          </button>
          {formProcessing && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
        </div>
        {formStatus && (
          <div className={`form-submit-message status-${formStatus}`}>
            <h5>
              {((): string => {
                switch (formStatus) {
                  case 400:
                    return "Помилка. Спробуйте пізніше";
                  default:
                    return "Повідомлення відправлене";
                }
              })()}
            </h5>
          </div>
        )}
      </Form>
    </Formik>
  );
}

export default ContactForm;
