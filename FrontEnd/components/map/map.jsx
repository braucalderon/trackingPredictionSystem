import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Modal from "../modal/modal";
import Trips from "../trips/trips";
import Fares from "../fares/fares-component";
import Schedules from "../schedule/schedule";
import { selectChange, selectBoolean } from "../../redux/subMenuSlice.js";
import { useSelector, useDispatch } from "react-redux";

import "./map.scss";
import {
  selectLat,
  selectLon,
  selectZoom,
  selectInstruction,
} from "../../redux/scheduleSlice";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

// -------------------------------------------------
const Map = (props) => {
  // mapboxRef reference the map to a div
  const mapboxRef = useRef(null);
  const subMenuSelector = useSelector(selectChange);
  const selectBooleanSubMenu = useSelector(selectBoolean);
  const lat = useSelector(selectLat);
  const lon = useSelector(selectLon);
  const zoomm = useSelector(selectZoom);
  const instruction = useSelector(selectInstruction);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const map = () => {
      setLatitude(lat);
      setLongitude(lon);

      let station = [latitude, longitude];
      const map = new mapboxgl.Map({
        container: mapboxRef.current,
        style: "mapbox://styles/mapbox/streets-v10",
        center: station,
        zoom: zoomm,
      });

      // eslint-disable-next-line no-undef
      let directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken,
        controls: { instructions: true },
      });

      let marker = new mapboxgl.Marker({
        draggable: true,
      })
        .setLngLat([latitude, longitude])
        .addTo(map);

      // map.addControl(marker);
      map.addControl(directions, "top-right");

      map.addControl(new mapboxgl.NavigationControl(), "top-left");
    };

    map();
    
  }, [latitude, lat, lon, longitude, zoomm, instruction]);

  let value = subMenuSelector; // value related to the submenu from redux store
  let post = null;

  if (selectBooleanSubMenu) {
    switch (value) {
      case "Fares":
        post = (
          <div className="map-sub-container">
            <Modal styleName='modalFares'>
              <Fares />
            </Modal>
          </div>
        );
        break;
      case "Schedules":
        post = (
          <div className="map-sub-container">
            <Modal styleName="modalSchedule">
              <Schedules />
            </Modal>
          </div>
        );
        break;
      case "Trips":
        post = (
          <div className="map-sub-container">
            <Modal styleName="modalTrips">
              <Trips />
            </Modal>
          </div>
        );
        break;
      default:
        post = null;
    }
  }
  return (
    <React.Fragment>

      <div className="map-container" ref={mapboxRef}>
        {post}
        {/* <div className='scheduleDataMap'></div> */}
      </div>
    </React.Fragment>
  );
};
export default Map;
