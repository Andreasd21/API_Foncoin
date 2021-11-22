//deze gebruiken we niet meer want het is geintergeerd in de foncoin_update

const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect Name, email, gender, password, fonID
//base path: api/insert_user
api.get('/', (req, res) =>{
    // const data = req.query;
    // const user = data.UserID
    // const event = data.EventID

    // const location = data.Location
     const fonid = 123123;
     const event = 2;
     const location = "Cantine p8";
    let date = new Date().toISOString().replace('T', ' ').substr(0, 19); // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs

    let connection = query.connect();

    query.select(connection, "user","FonID", fonid).then(user=>{
        let userID = user[0].UserID;
        const colomns = ["UserID","EventID","Date","Location"];
        const values = [userID,event,`"${date}"`, `"${location}"`];
        query.insert(connection, "transactie", colomns, values ).then(trans=>{
            console.log("transactie inserted");
        }).catch(err=>{
            res.sendStatus(404);
            console.log(err)
        })

    }).catch(err=>{
        res.sendStatus(404);
    })
})
module.exports = api
