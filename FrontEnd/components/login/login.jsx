import React from "react";
import { signInWithGoogle } from "../firebase/firebase";
import { useHistory } from 'react-router-dom';

import { Button } from "@material-ui/core";

const Login = (props) => {
   let history = useHistory();

   const onClickHandlerHome = () => {
     history.push('/');
   }


  return (
    <React.Fragment>
      <Button color='inherit' variant='contained' onClick={onClickHandlerHome}>Home</Button>
      <Button variant="contained" color="primary" onClick={signInWithGoogle}>
      {''}
        Sign in with Google{''}
      </Button>
      <div>{signInWithGoogle}</div>
    </React.Fragment>
  );
};
export default Login;
