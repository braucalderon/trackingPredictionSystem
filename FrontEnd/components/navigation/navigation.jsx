import React from "react";
import "./navigation.scss";
import CustomButton from "../button/button";
import Logo from "../logo/logo";
import { Button } from '@material-ui/core';
import { auth } from "../firebase/firebase";


const Navigation = (props) => {
  return (
    <div className="navigation">
      <div className="navigation-container-1">
        <Logo />
      </div>
      <div className="navigation-container-2">
        <div style={{ marginRight: "3vh" }}>
          {props.currentUser ?  
            <Button onClick={() => auth.signOut()}>Sign Out</Button>
          :
            <CustomButton route={"/login"} name="Login" />
          }
          
        </div>
      </div>
    </div>
  );
};
export default Navigation;
