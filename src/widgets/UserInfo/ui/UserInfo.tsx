import { JSX, useState } from "react";
import Button from "@/shared/ui/base/Button/Button";
import { User } from "@/entities/User";
import { UserInfoForm } from "@/widgets/UserInfo/ui/UserInfoForm";
import styles from "./UserInfo.module.scss";

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
                  <p className="username">{user.username}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Телефон</p>
                </td>
                <td>
                  <p className="phone">{user?.phone}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Email</p>
                </td>
                <td>
                  <p className="email">{user.email}</p>
                </td>
              </tr>
              <tr>
                <td>
                  <p className="bold">Адреса доставки</p>
                </td>
                <td>
                  <p className="address">{user?.address}</p>
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
