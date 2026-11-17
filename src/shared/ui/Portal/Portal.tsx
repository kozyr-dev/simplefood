"use client";

import { useEffect, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

/** Renders the children into `#portal-root` (or the body), once mounted in the browser. */
export default function Portal({ children, wrapperId = "portal-root" }: PortalProps) {
  const [target, setTarget] = useState<Element | null>(null);

  useEffect(() => {
    // The DOM exists only after mounting.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTarget(document.getElementById(wrapperId) || document.body);
  }, [wrapperId]);

  return target ? createPortal(children, target) : null;
}
