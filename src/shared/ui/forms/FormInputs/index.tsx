import { JSX } from "react";
import { useField } from "formik";

export const MyTextInput = ({
  label,
  ...props
}: {
  label?: string;
  name: string;
  type: string;
  value?: string;
  hidden?: boolean;
  disabled?: boolean;
  placeholder: string;
  className?: string;
  id?: string;
}): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <input className={props.className ? `${props.className} text-input` : "text-input"} {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export const MyTextArea = ({
  label,
  ...props
}: {
  label?: string;
  name: string;
  type: string;
  placeholder: string;
  columns?: number;
  className?: string;
  rows?: number;
  id?: string;
}): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <textarea
        className={props.className ? `${props.className} text-input` : "text-input"}
        {...field}
        {...props}
      ></textarea>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </>
  );
};

export const MyCheckbox = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  name: string;
  id?: string;
}): JSX.Element => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="checkbox-input" htmlFor={props.id || props.name}>
        <input type="checkbox" {...field} {...props} />
        {children}
      </label>
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};

export const MySelect = ({ label, ...props }: { label?: string; name: string; id?: string }): JSX.Element => {
  const [field, meta] = useField(props);
  return (
    <div>
      {label && <label htmlFor={props.id || props.name}>{label}</label>}
      <select {...field} {...props} />
      {meta.touched && meta.error ? <div className="error">{meta.error}</div> : null}
    </div>
  );
};
