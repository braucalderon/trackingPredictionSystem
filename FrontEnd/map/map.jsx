import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Button from '@material-ui/core/Button';
import Modal from '../modal/modal';
import { changeState } from '../../redux/reducer.js';
import { useSelector } from 'react-redux';


import "./map.scss";

mapboxgl.accessToken = `${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`;

const Map = (props) => {
  const mapboxRef = useRef(null);
  const [modal, setModal] = useState(true);
  const subMenuSelector = useSelector(changeState);


  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapboxRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-74.4, 40.9],
      zoom: 8,
    });

    map.addControl(new mapboxgl.NavigationControl());
    
  },[]);

  
  const closeModalHandler = () => {
    setModal(false);
  }
  const openModalHandler = (id) => {
    setModal(true);
  }
  

  console.log(subMenuSelector);
  subMenuSelector.payload.subMenu.value === 'Fares' ? console.log('fares') : console.log('it is not');
  let post = null;
  if(modal){
    post = (
      <div className='map-sub-container'>
        <Modal>
        
          <Button onClick={closeModalHandler}>Close</Button>
        </Modal>
       
      </div>
    );
  }
  // --------------------------------------------------------------
  return (
    <React.Fragment>
      <div className="map-container" ref={mapboxRef}>
      {post}
     
       
      </div>
    </React.Fragment>
  );
};
export default Map;
