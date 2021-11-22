const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect fontys card id
//base path: api/card_reader
api.get('/', (req, res) =>{
    // const data = req.query;
    const data = 777;
    let connection = query.connect();
    query.select(connection, "balance","FonID", data ).then(Coin=>{
        console.log("Coin is gegeven");
    }).catch( err => {
        res.sendStatus(404)
    });


    query.select(connection, "balance","Foncoin", "FonID", data ).then(Name=>{
        console.log("name is gegeven");
    }).catch( err => {
        res.sendStatus(404)
    });
    


})
module.exports = api