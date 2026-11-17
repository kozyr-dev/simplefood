import React, { JSX } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Image from "next/image";
import type { ProfileChanges, User } from "@/entities/User";
import { useUpdateProfile } from "@/features/Auth";
import { errorMessage, fieldErrors } from "@/shared/api";
import { emailField, nameField, phoneField } from "@/shared/lib/validation";
import { MyTextInput } from "@/shared/ui/forms/FormInputs";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import styles from "./UserInfoForm.module.scss";

interface UserInfoFormProps {
  user: User;
  onUpdated: () => void;
}

type Values = { name: string; phone: string; email: string; address: string; currentPassword: string };

/** Only what changed; an emptied phone or address is cleared (`null`). */
function changesOf(user: User, values: Values): ProfileChanges {
  const changes: ProfileChanges = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim() || null;
  const address = values.address.trim() || null;
  if (name !== user.name) changes.name = name;
  if (phone !== user.phone) changes.phone = phone;
  if (address !== user.address) changes.address = address;
  if (email !== user.email) {
    changes.email = email;
    changes.currentPassword = values.currentPassword;
  }
  return changes;
}

/** The profile. A new email needs the current password; the password itself has its own form. */
export const UserInfoForm = (props: UserInfoFormProps): JSX.Element => {
  const updateProfile = useUpdateProfile();
  const { openSnackbar } = useSnackbarHook();
  const { user } = props;

  return (
    <Formik<Values>
      initialValues={{
        name: user.name,
        phone: user.phone ?? "",
        email: user.email,
        address: user.address ?? "",
        currentPassword: "",
      }}
      validationSchema={Yup.object({
        name: nameField(),
        phone: phoneField(),
        email: emailField(),
        address: Yup.string().max(500, "Не більше 500 символів"),
        currentPassword: Yup.string().when("email", {
          is: (email: string) => email?.trim() !== user.email,
          then: (schema) => schema.required("Щоб змінити пошту, введіть поточний пароль"),
        }),
      })}
      onSubmit={async (values, { setErrors }): Promise<void> => {
        const changes = changesOf(user, values);
        if (!Object.keys(changes).length) {
          props.onUpdated();
          return;
        }
        try {
          await updateProfile(changes);
          if (changes.email) {
            openSnackbar("success", "Пошту змінено: перевірте її, ми надіслали посилання для підтвердження.");
          }
          props.onUpdated();
        } catch (error) {
          const errors = fieldErrors(error);
          if (Object.keys(errors).length) setErrors(errors);
          else openSnackbar("error", errorMessage(error, "Не вдалося зберегти зміни."));
        }
      }}
    >
      {({ isSubmitting, values }) => (
        <Form className="form login-form">
          <table className={styles["user-details-table"]}>
            <tbody>
              <tr>
                <td>
                  <p className="bold">Ім`я</p>
                </td>
                <td>
                  <div className="form-group">
                    <MyTextInput name="name" type="text" placeholder="Ім’я" className="form-control" autoComplete="name" />
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Телефон</p>
                </td>
                <td>
                  <div className="form-group">
                    <MyTextInput
                      name="phone"
                      type="tel"
                      placeholder="(111)111-1111"
                      className="form-control"
                      autoComplete="tel"
                    />
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
                      autoComplete="email"
                    />
                  </div>
                </td>
              </tr>
              {values.email.trim() !== user.email && (
                <tr>
                  <td>Поточний пароль (щоб змінити пошту)</td>
                  <td>
                    <div className="form-group">
                      <MyTextInput
                        name="currentPassword"
                        type="password"
                        placeholder="Поточний пароль"
                        className="form-control"
                        autoComplete="current-password"
                      />
                    </div>
                  </td>
                </tr>
              )}
              <tr>
                <td>
                  <p className="bold">Адреса доставки</p>
                </td>
                <td>
                  <div className="form-group">
                    <MyTextInput
                      name="address"
                      type="text"
                      placeholder="Адреса доставки"
                      className="form-control"
                      autoComplete="street-address"
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-submit">
            <button
              type="submit"
              className={clsx("form-submit-btn form-submit-btn--plain", { processing: isSubmitting })}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Відправка..." : "Зберегти"}
            </button>
            {isSubmitting && <Image src="/loader.svg" className="spinner" alt="spinner" width="50" height="50" />}
          </div>
        </Form>
      )}
    </Formik>
  );
};
