import React from "react";
import "./navigation.scss";
import { makeStyles } from '@material-ui/core/styles';
import { signInWithGoogle } from "../firebase/firebase";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root:{
    backgroundColor: 'transparent',
    padding: '.5vh',
    '&:hover':{
      border: '3px solid black',
      backgroundColor: 'transparent'
    }
  }
}))
const Navigation = (props) => {

  const classes = useStyles();

  return (
    <div className="navigation">
      <div className="navigation-container-1">
        <div>Logo</div>
      </div>
      <div className="navigation-container-2">
        <div>Testing</div>
        <div>
          <Button className={classes.root} >Login</Button>
          {/* <button onClick={signInWithGoogle}>Sign in with google</button> */}
        </div>
      </div>
    </div>
  );
};
export default Navigation;
