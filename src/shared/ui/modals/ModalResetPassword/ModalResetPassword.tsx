import React, { JSX } from "react";

interface ModalResetPasswordProps {
  children: React.ReactNode;
}

export default function ModalResetPassword(props: ModalResetPasswordProps): JSX.Element {
  return (
    <div className="modal modal--small micromodal-slide form-modal" id="forgotPasswordModal" aria-hidden="true">
      <div className="modal__overlay" tabIndex={-1} data-micromodal-close>
        <div className="modal__container" role="dialog" aria-modal="true">
          <div className="modal__container__i">
            <header className="modal__header">
              <h2 className="modal__title"></h2>
              <button className="modal__close" aria-label="Close modal" data-micromodal-close></button>
            </header>
            <div className="modal__content">{props.children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
