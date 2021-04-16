import React from "react";
import Map from '../map/map';
import Navigation from '../navigation/navigation';
import Fares from '../fares/fares-component';
import Trips from '../trips/trips';
import Schedules from '../schedule/schedule';
import Submenu from '../submenu/submenu';
import './main-page.scss';



const MainPage = (props) => {
  return (
    <div>
      <Navigation />
      <Submenu />
      <Map />
    </div>
  );
};
export default MainPage;
