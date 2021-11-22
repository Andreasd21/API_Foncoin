const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect Name,password
//base path: api/inloggen
api.get('/', (req, res) =>{
    const data = req.query;
    const name = data.username
    const password = data.password
    let connection = query.connect();
    //password moet nog geencrypt worden en of ge decrypt worden
    query.select(connection, "user", "Name", `"${name}" && Password = "${password}"` ).then(log=>{
        if  (log == null){
            console.log("gebruikers bestaat niet");
        }

        console.log(data);
        console.log(name);
        console.log(password);  
        console.log(log);
        res.send(log);
        
    }).catch( err => {
        res.sendStatus(404);
        console.log(err)
    });

})
module.exports = api