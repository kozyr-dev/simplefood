"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  wrapperId?: string;
}

export default function Portal({ children, wrapperId = "portal-root" }: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const ref = useRef<Element | null>(null);

  useEffect(() => {
    // Ensure this runs only on the client
    ref.current = document.getElementById(wrapperId) || document.body;
    setMounted(true);
  }, [wrapperId]);

  // Render the children into the specified DOM node only after mounting on the client
  return mounted ? createPortal(children, ref.current!) : null;
}
