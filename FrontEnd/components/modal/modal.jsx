import React from "react";
import "./modal.scss";

// -------------------------------------------------
const Modal = (props) => {
  
  return (
    <div>
      <div className={props.styleName}>{props.children}</div>
    </div>
  );
};
export default Modal;
