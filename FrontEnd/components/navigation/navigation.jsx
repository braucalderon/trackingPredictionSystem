import React from "react";
import "./navigation.scss";
import { signInWithGoogle } from "../firebase/firebase";
import CustomButton from "../button/button";
import Logo from "../logo/logo";

const Navigation = (props) => {
  return (
    <div className="navigation">
      <div className="navigation-container-1">
        <Logo />
      </div>
      <div className="navigation-container-2">
        <div style={{ marginRight: "3vh" }}>
          <CustomButton name={"Login"} route={"/login"} />
        </div>
      </div>
    </div>
  );
};
export default Navigation;
