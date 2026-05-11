import React, { JSX, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import "yup-phone";
import classNames from "classnames/bind";
import Image from "next/image";
import { User, useSetUser } from "@/entities/User";
import { useUpdateLoggedInUserInfo } from "@/features/Auth";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import styles from "./UserInfoForm.module.scss";

interface UserInfoFormProps {
  user: User;
  onUpdated: () => void;
}

export const UserInfoForm = (props: UserInfoFormProps): JSX.Element => {
  const updateLoggedInUserInfo = useUpdateLoggedInUserInfo();
  const setUser = useSetUser();
  const { openSnackbar } = useSnackbarHook();

  const [formProcessing, setFormProcessing] = useState(false);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const submitBtnClass = classNames({
    processing: formProcessing,
  });

  return (
    <Formik
      initialValues={{
        username: props.user.username || "",
        phone: props.user.phone || "",
        email: props.user.email || "",
        address: props.user.address || "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={Yup.object({
        username: Yup.string().max(30, "Must be 30 characters or less").required("Required Field"),
        phone: Yup.string().phone("UA", true).required("Required Field"),
        email: Yup.string().email("Invalid email address").required("Required Field"),
        address: Yup.string(),
        password: Yup.string().min(7, "Must be 7 characters or more"),
        passwordConfirmation: Yup.string()
          .min(7, "Must be 7 characters or more")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      })}
      onSubmit={async (values, { setSubmitting }): Promise<void> => {
        try {
          const user = await updateLoggedInUserInfo({ userId: props.user.id, data: values });
          setUser(user);
          props.onUpdated();
        } catch (error) {
          if (typeof window !== "undefined") {
            console.log("An error occurred:", error);
            openSnackbar("error", "Error updating user information.");
          }
        }

        setFormProcessing(false);
        setSubmitting(false);
      }}
    >
      <Form className="form login-form">
        <table className={styles["user-details-table"]}>
          <tbody>
            <tr>
              <td>
                <p className="bold">Ім`я</p>
              </td>
              <td>
                <div className="form-group">
                  <MyTextInput name="username" type="text" placeholder="Ім’я" className="form-control" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p className="bold">Телефон</p>
              </td>
              <td>
                <div className="form-group">
                  <MyTextInput name="phone" type="tel" placeholder="(111)111-1111" className="form-control" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p className="bold">Email</p>
              </td>
              <td>
                <div className="form-group">
                  <MyTextInput
                    name="email"
                    type="email"
                    placeholder="Адреса електронної пошти"
                    className="form-control"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <p className="bold">Адреса доставки</p>
              </td>
              <td>
                <div className="form-group">
                  <MyTextInput name="address" type="text" placeholder="Адреса доставки" className="form-control" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Новий пароль (залиште порожнім, щоб не змінювати)</td>
              <td>
                <div className="form-group">
                  <MyTextInput name="password" type="password" placeholder="Новий пароль" className="form-control" />
                </div>
              </td>
            </tr>
            <tr>
              <td>Підтвердити новий пароль</td>
              <td>
                <div className="form-group">
                  <MyTextInput
                    name="passwordConfirmation"
                    type="password"
                    placeholder="Підтвердити новий пароль"
                    className="form-control"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="form-submit">
          <button
            type="submit"
            className={"form-submit-btn form-submit-btn--plain " + submitBtnClass}
            disabled={formProcessing}
          >
            {((): string => (formProcessing ? "Відправка..." : "Зберегти"))()}
          </button>
          {formProcessing && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
        </div>
      </Form>
    </Formik>
  );
};
