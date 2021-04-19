import React from 'react';
import CloseButton from '../button/subMenuButton';
import TripsInput from "./tripsInput";



const Trips = (props => {

    return(
        <div>
            <TripsInput />
            
            <CloseButton position={true} name="close"/>
        </div>
    )
});
export default Trips;