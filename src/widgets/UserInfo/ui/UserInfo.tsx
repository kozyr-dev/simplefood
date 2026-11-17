"use client";

import { JSX, useState } from "react";
import { useResendVerification } from "@/features/Auth";
import { User } from "@/entities/User";
import { errorMessage } from "@/shared/api";
import Button from "@/shared/ui/base/Button/Button";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import { UserInfoForm } from "@/widgets/UserInfo/ui/UserInfoForm";
import styles from "./UserInfo.module.scss";

/** "Confirmed", or a button that sends the verification link again (3 an hour). */
function EmailStatus({ verified }: { verified: boolean }): JSX.Element {
  const resend = useResendVerification();
  const { openSnackbar } = useSnackbarHook();
  const [sending, setSending] = useState(false);

  if (verified) return <span className="gray">підтверджено</span>;

  const onResend = async (e: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    e.preventDefault();
    setSending(true);
    try {
      await resend();
      openSnackbar("success", "Посилання для підтвердження надіслано на вашу пошту.");
    } catch (error) {
      openSnackbar("error", errorMessage(error));
    } finally {
      setSending(false);
    }
  };

  return (
    <span className="gray">
      не підтверджено ·{" "}
      {sending ? (
        "надсилаємо…"
      ) : (
        <a href="#" onClick={onResend}>
          надіслати посилання ще раз
        </a>
      )}
    </span>
  );
}

export function UserInfo(user: User): JSX.Element {
  const [editable, setEditable] = useState(false);

  const makeEditable = (e: React.MouseEvent): void => {
    e.preventDefault();
    setEditable(true);
  };

  return (
    <div className={styles["profile-info"]}>
      <h4>Інформація</h4>

      {editable ? (
        <UserInfoForm user={user} onUpdated={() => setEditable(false)} />
      ) : (
        <>
          <table className={styles["user-details-table"]}>
            <tbody>
              <tr>
                <td>
                  <p className="bold">Ім`я</p>
                </td>
                <td>
                  <p className="username">{user.name}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Телефон</p>
                </td>
                <td>
                  <p className="phone">{user.phone}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Email</p>
                </td>
                <td>
                  <p className="email">
                    {user.email} <EmailStatus verified={user.emailVerified} />
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Адреса доставки</p>
                </td>
                <td>
                  <p className="address">{user.address}</p>
                </td>
              </tr>
            </tbody>
          </table>
          <Button onClick={makeEditable} className="make-editable-btn button--small button--plain">
            редагувати
          </Button>
        </>
      )}
    </div>
  );
}
