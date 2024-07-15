import React from 'react';
import './Modal.css';

const Modal = ({ children, className, show }) => {
  return (
    <div
      className={`modal ${className ? className : ""} ${
        show ? "show" : "hidden"
      }`}
    >
      <div className="modal-inner">
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
