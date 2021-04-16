import React from "react";
import "./modal.scss";

// -------------------------------------------------
const Modal = (props) => {
  // console.log(props);

  return (
    <div>
      <div className="modal">{props.children}</div>
    </div>
  );
};
export default Modal;
