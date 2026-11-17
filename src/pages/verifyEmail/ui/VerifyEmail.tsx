"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { userApi, useUserStore } from "@/entities/User";
import { verifyEmail } from "@/features/Auth";
import { ApiError, errorMessage } from "@/shared/api";
import { useHashToken } from "@/shared/lib/useHashToken";
import { useSessionStore } from "@/shared/session";
import Button from "@/shared/ui/base/Button/Button";

type State = "checking" | "verified" | "invalid" | "failed" | "missing";

/** The page a verification email links to: `/verify-email#token=…` (48 hours, single use). */
export function VerifyEmail(): JSX.Element {
  const token = useHashToken();
  const [state, setState] = useState<State>("checking");
  const [error, setError] = useState("");
  // The token works once: never sent twice (development mode runs effects twice).
  const sent = useRef(false);

  useEffect(() => {
    if (token === undefined || sent.current) return;
    if (!token) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState("missing");
      return;
    }
    sent.current = true;
    verifyEmail(token)
      .then(async () => {
        setState("verified");
        // Signed in here? Show "confirmed" on the account page too.
        if (useSessionStore.getState().accessToken) {
          useUserStore.getState().setUser(await userApi.me());
        }
      })
      .catch((e: unknown) => {
        if (e instanceof ApiError && e.code === "INVALID_TOKEN") {
          setState("invalid");
        } else {
          setError(errorMessage(e));
          setState("failed");
        }
      });
  }, [token]);

  return (
    <section className="page-section section-padding">
      <div className="container mx-auto max-w-xl">
        <div className="section-title">
          <h2>Підтвердження пошти</h2>
        </div>
        {state === "checking" && <p>Перевіряємо посилання…</p>}
        {state === "verified" && <p>Дякуємо! Вашу пошту підтверджено.</p>}
        {state === "invalid" && (
          <p>
            Посилання недійсне, застаріле або вже використане. Увійдіть до особистого кабінету, щоб надіслати нове.
          </p>
        )}
        {state === "missing" && <p>Посилання неповне. Відкрийте його з листа ще раз.</p>}
        {state === "failed" && <p>{error}</p>}
        {state !== "checking" && (
          <Button className="button--green" url="/account">
            Особистий кабінет
          </Button>
        )}
      </div>
    </section>
  );
}
