import React from "react";
import "./modal.scss";

const Backdrop = (props) => (
 
  
  props.show ? <div className='backdrop'></div> : null

);
export default Backdrop;
