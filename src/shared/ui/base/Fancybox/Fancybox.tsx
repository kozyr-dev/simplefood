import React, { JSX, useEffect } from "react";
// @ts-ignore
import { Fancybox as NativeFancybox } from "@fancyapps/ui/dist/fancybox.esm.js";
import "@fancyapps/ui/dist/fancybox.css";

interface FancyboxProps {
  delegate?: string;
  options?: object;
  children: JSX.Element | string;
}

const Fancybox: React.FC<FancyboxProps> = (props) => {
  const delegate = props.delegate || "[data-fancybox]";

  useEffect(() => {
    const opts = props.options || {};

    NativeFancybox.bind(delegate, opts);

    return () => {
      NativeFancybox.destroy();
    };
  }, [props.options, delegate]);

  return <>{props.children}</>;
};

export default Fancybox;
