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
app.get('/getBusStops',(req,res) => {
    const origin = req.query.Origin;

    db.query(
       'SELECT stop_id,stop_lat,stop_lon FROM stops',
        (err,result) => {
            if (err) {
                console.log(err); 
            } else {
                res.json(result);
            }
        });
});

app.listen(PORT, () => { 
    console.log(`Server up listening on ${PORT}...`);
});

