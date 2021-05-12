const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const PORT = 3001;
const app = express(); 
app.use(cors());
app.use(express.json());

//connects to database 
const db = mysql.createConnection({
    user: 'username',
    host: 'localhost',
    password: 'password',
    database: 'database',
});

// gets the call to make a query
app.get('/scheduleGetter',(req,res) => {
    // if passing a parameter with Axios use res.query 
    // to get the parameter
    const entry = req.query.busIDEnter; //given stop_id
    // console.log("Given Stop_ID is: ", entry);
   
    db.query(
    // "SELECT * FROM stops LIMIT 0,10",   
    'SELECT stop_id,stop_lat,stop_lon ' + 
    'FROM stops ' + 
    'WHERE stop_id =' + "'" + `${entry}` + "'",
        (err,result) => {
            if (err) {
                console.log(err); 
            } else {
                res.json(result); //hold the response from the database i.e. data
                console.log(result);//should get stop_id, stop_lat and stop_lon of the given ID
            }
        });
});

// gets the call to make a query
app.get('/timeGetter',(req,res) => {
    // if passing a parameter with Axios use res.query 
    // to get the parameter
    const stopID = req.query.busID; 

    console.log("Time Getter: ", stopID);

    db.query(
    'SELECT trips.trip_id, stop_times.stop_id, stop_times.arrival_time, stop_times.departure_time ' +
    'FROM trips, stop_times ' +
    'WHERE stop_times.stop_id = ' + "'" + `${stopID}` + "'" +' and trips.trip_id = stop_times.trip_id',
        (err,result) => {
            if (err) {
                console.log(err); 
            } else {
                res.json(result); //hold the response from the database i.e. data
                // console.log(result);//getting what we want when schedules is clicked
            }
        });
});


// gets the fare from the database
app.get('/farePrice',(req,res) => {
   
    db.query(
    // "SELECT * FROM stops LIMIT 0,10",   
    'SELECT fare_id, price,currency_type,transfer_duration FROM fare_attributes;',
        (err,result) => {
            if (err) {
                console.log(err); 
            } else {
                res.json(result); //hold the response from the database i.e. data
                // console.log(result);
            }
        });
});


app.listen(PORT, () => { 
    console.log(`Server up listening on ${PORT}...`);
});
