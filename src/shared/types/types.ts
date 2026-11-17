import { JSX } from "react";

/** Props of the shared Button: a link when `url` is set. */
export interface Button {
  url?: string | undefined;
  children: JSX.Element | string;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}
