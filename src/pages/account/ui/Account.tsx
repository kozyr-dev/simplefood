"use client";

import { JSX } from "react";
import { SignIn } from "@/widgets/SignIn";
import { SignUp } from "@/widgets/SignUp";
import { UserInfo } from "@/widgets/UserInfo";
import { useUser, useResetUser } from "@/entities/User";
import { useSignOut } from "@/features/Auth";
import useSnackbarHook from "@/shared/hooks/useSnackbarHook";
import styles from "./Account.module.scss";

export function Account(): JSX.Element {
  const user = useUser();
  const { openSnackbar } = useSnackbarHook();
  const signOut = useSignOut();
  const resetUser = useResetUser();

  const logoutHandler = async (e: React.MouseEvent<HTMLAnchorElement>): Promise<void> => {
    e.preventDefault();
    try {
      await signOut();
    } catch (error) {
      console.log("An error occurred:", error);
      openSnackbar("error", "Error signing out.");
    } finally {
      resetUser();
    }
  };

  return (
    <section className="page-section section-padding section-account">
      <div className="container mx-auto max-w-6xl">
        <div className="section-title">
          <h2>
            <span>ОСОБИСТИЙ</span> КАБIНЕТ
          </h2>
        </div>
        {!user ? (
          <div className="flex flex-row gap-10">
            <div className="basis-1/2">
              <SignIn />
            </div>
            <div className="basis-1/2">
              <SignUp />
            </div>
          </div>
        ) : (
          <div className="flex flex-row gap-10">
            <div className="basis-2/3">
              <UserInfo {...user} />
            </div>
            <div className="basis-1/3 text-right">
              <a href="#" className={styles["logout-btn"]} onClick={logoutHandler}>
                ВИЙТИ
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
