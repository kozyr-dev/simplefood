"use client";

import React from "react";
import { SnackbarProvider } from "notistack"; // docs - https://notistack.com/api-reference

interface NotificationProviderProps {
  children: React.ReactNode;
}

export function NotificationProvider({ children }: NotificationProviderProps): React.JSX.Element {
  return <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>;
}
