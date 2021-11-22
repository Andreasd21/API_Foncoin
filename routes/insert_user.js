const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect Name, email, gender, password, fonID
//base path: api/insert_user
api.get('/', (req, res) =>{
    // const data = req.query;
    // const name = data[0].Name
    // const email = data[0].Email
    // const gender = data[0].Gender
    // const password = data[0].Password
    // const fonID = data[0].FonID
     const name = "Neal";
     const email = "afwezig";
     const gender = "Male";
     const password = "afwezig";
     const fonID = 89838469;
    const colomns = ["FonID","Email","Password","Name","Gender"];
    const values = [fonID,`"${email}"`,`"${password}"`,`"${name}"`,`"${gender}"`];
    let connection = query.connect();
    //password moet nog geencrypt worden
    query.insert(connection, "user",colomns, values).then(user=>{
        console.log("user inserted");
        const new_balance = [fonID, 20];
        const bal_fields = ["FonID", "Foncoin"];
        query.insert(connection, "balance",bal_fields, new_balance).then(account=>{
            console.log("balance account created");
        }).catch(err => {
            res.sendStatus(404);
            console.log(err);
        })
    }).catch( err => {

        res.sendStatus(404);
    });
})
module.exports = api