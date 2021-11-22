const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect userID
//base path: api/website_user
api.get('/', (req, res) =>{
    const data = req.query;
    const user =data.UserID;
    console.log('eerste connectie')
    let connection = query.connect();
    query.select(connection, "user","UserID", user ).then(naam=>{
        console.log("naam is gegeven");
        
        const fon = naam[0].FonID;
        console.log(fon)
        query.select(connection, "balance","FonID", fon ).then(coin=>{
            console.log("coin is gegeven");
            console.log(coin);
            let packet ={
                "Name" : naam[0].Name,
                "Foncoin" : coin[0].Foncoin
            };
            console.log(packet);
            res.send(packet);
        }).catch( err => {
            console.log(err)
            res.sendStatus(404)

        });
    }).catch( err => {
        console.log("eerste query")
        res.sendStatus(404)
    });
 





})
module.exports = api