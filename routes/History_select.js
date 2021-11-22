const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect UserID
//base path: api/History_select
api.get('/', (req, res) =>{
    const data = req.query;
    const user = data.UserID
    let connection = query.connect();
    function select_history(){
    return new Promise((resolve, reject) =>
    {
        connection.query(`SELECT a.EventID, a.Location, a.Date, b.Event_title, b.Value,  b.EventID FROM transactie a, event b WHERE b.EventID = a.EventID && UserID = ${user}`, function (err, result, fields) {
            if (err) reject (err);
            resolve(result);
            });
        });
    }
    select_history().then(history=>{
        console.log(history);
        res.send(history);

    }).catch(err=>{
        res.sendStatus(404);
    })
        
    })
module.exports = api
