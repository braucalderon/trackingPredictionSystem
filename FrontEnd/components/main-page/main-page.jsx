import React, { useState, useEffect } from "react";
import Map from "../map/map";
import Navigation from "../navigation/navigation";
import Submenu from "../submenu/submenu";
import "./main-page.scss";
import { auth } from "../firebase/firebase";

const MainPage = (props) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // library from firebase
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged((user) =>
      setCurrentUser(user)
    );
    // console.log(currentUser);
    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, [currentUser]);

  return (
    <div>
      <Navigation currentUser={currentUser} />
      <Submenu />
      <Map />
    </div>
  );
};
export default MainPage;
