import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./modal.scss";

const Modal = (props) => {
  // console.log(props);

  const [open, setOpen] = useState(true);

  const handleOPen = () => {
    // modalBoolean is set in the submenu component
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log(props.tittleId);
  return (
    <div>
      <div className='modal'>
        {props.children}
      </div>
    </div>
  );
};
export default Modal;
