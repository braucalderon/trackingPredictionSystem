import './App.css';
import React, {useState,useMemo} from "react";
import Axios from 'axios';
import ReactMapGL, {Marker,NavigationControl} from "react-map-gl";
import busStop from './assets/bus-stop.svg';
import DeckGL, {GeoJsonLayer} from 'deck.gl';


function App() {

  
  const serverURL = 'http://localhost:3001'
  // const [origin, setOrigin] = useState('');
  // const [destination, setDestination] = useState('');
  const [busStops,setbusStops] = useState([]);
  const [viewport, setViewport] = useState({
    width: '99vw',
    height: '90vh',
    latitude: 39.9611111,
    longitude: -82.9988889,
    zoom: 13,
    pitch: 0,
    bearing: 0
  });

  var positions = [];

  const navControlStyle =  {
    right:10,
    bottom:20
  };

  //NOT WORKING
  const layer = new GeoJsonLayer({
    id: 'geojson-layer',
    data: positions.slice(0,100),
    pickable: true,
    stroked: false,
    filled: true,
    extruded: true,
    lineWidthScale: 20,
    lineWidthMinPixels: 2,
    getFillColor: [160, 160, 180, 200],
    getRadius: 100,
    getLineWidth: 1,
    getElevation: 30
  });
  
  // Only rerender markers if data has changed
  const markers = useMemo(() => busStops.map(
      stops => (
        <Marker 
          key={stops.stop_id} 
          latitude={stops.stop_lat} 
          longitude={stops.stop_lon} 
        >
          <button id={stops.stop_id} className="markerButton" onClick={showStopInfo}>
            <img src={busStop} alt='Bus Stop'/>
          </button>
        </Marker>
      )
    ), [busStops]);
  

  // connects to server to make a query 
  function showStops() {
    Axios.get(`${serverURL}/getBusStops`).then((response) => {
      setbusStops(response.data);

      busStops.forEach(Element => {
        positions.push([Element.stop_lon,Element.stop_lat]);
      })
      console.log("Bus Stops Coordinates: ", busStops.splice(0, 5));
    });
  }

  function showStopInfo () {
    Axios.get(`${serverURL}/getStopInfo`).then((response) => {
      console.log("hi");

    });
  }

  return (
    <div className="App">
      {/* <div className = "tripFinder">
        <label> Origin:</label>
        <input type="text" onChange={(event) => {
          setOrigin(event.target.value);}}/>
        <label> Destination:</label>
        <input type="text" onChange={(event) => {
          setDestination(event.target.value);}}/>
      </div> */}
      <div className="busStop">
        <button onClick={showStops}> Show Stops </button> 
      </div>

      <div>

        <ReactMapGL 
          {...viewport}
          maxZoom={20}
          mapboxApiAccessToken = {"API KEY"}
          mapStyle= "mapbox://styles/mapbox/streets-v11"
          onViewportChange= {viewport => {
            setViewport(viewport);
          }}
        > 
          <NavigationControl style={navControlStyle} showZoom={true} />

          {/* creates the markers for each bus stop */}
          <DeckGL
            viewState={viewport}
            controller={true}
            layers={[layer]}
          >
          {markers}
          </DeckGL>

        </ReactMapGL>
      
      </div >

    </div>
  );

}
  

export default App;
console.log("Website up...");
require('dotenv').config();