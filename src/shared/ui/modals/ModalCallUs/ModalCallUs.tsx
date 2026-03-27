import clsx from "clsx";
import { JSX } from "react";
import styles from "./ModalCallUs.module.scss";

interface ModalCallUsProps {
  phone: string;
}

export default function ModalCallUs(props: ModalCallUsProps): JSX.Element {
  const { phone } = props;

  return (
    <div
      className={clsx(styles["modal-call-us"], "modal", "modal--small", "micromodal-slide", "form-modal")}
      id="callMeModal"
      aria-hidden="true"
    >
      <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true">
          <div className="modal__container__i">
            <header className="modal__header">
              <h2 className="modal__title"></h2>
              <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <div className="modal__content text-center">
              <h6 className={clsx(styles["title"], "orange")}>дзвоніть нам</h6>
              <a className={clsx(styles["tel"])} href={`tel: ${phone}`}>
                {phone}
              </a>
              <p>або</p>
              {/* TODO: make the Request form operational */}
              <h6 className={clsx(styles["title"], "orange")}>ЗАЛИШТЕ СВІЙ НОМЕР</h6>
              <form className={styles["form"]}>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    className={clsx(styles["form-control"], "form-control")}
                    placeholder="Ваш номер телефону"
                  />
                </div>
                <p className={clsx(styles["form-submit"], "form-submit")}>
                  <button
                    type="submit"
                    className={clsx(styles["form-submit-btn"], "form-submit-btn", "form-submit-btn--thin")}
                  >
                    Замовити
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
