import { JSX } from "react";
import { useField } from "formik";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
};

/** A Formik text input with its error under it (once touched). */
export const MyTextInput = ({ label, ...props }: TextInputProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input className={props.className ? `${props.className} text-input` : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  name: string;
};

export const MyTextArea = ({ label, ...props }: TextAreaProps): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <textarea className={props.className ? `${props.className} text-input` : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};
