const express = require("express");
const api = express.Router();

const query = require("../fucntions/db_query");

//expect fontys card id and the eventID
//base path: api/foncoin_update
api.get('/', (req, res) =>{
    const data = req.query;
    const fonid = data.fonid
    const eventid = data.event 

    let connection = query.connect();

    // code voor het checken als je een event doet dat je maar 1 keer per dag mag doen
    if (eventid == 1 || eventid == 4 )
    {
        console.log("eerste query")
        query.select(connection,"user", "FonID",fonid).then(user=>{
            let id = user[0].UserID
            console.log(id);
            console.log("tweede query")
            query.select_specifiek(connection,"MAX(Date)", "transactie", "UserID", id ).then(date=>{
                console.log(date);
                
                let dag = date[0]["MAX(Date)"];
                let old_dag = new Date(dag)
                let date_current = new Date()
                if (old_dag.getDay != date_current.getDay){
                    console.log(old_dag.toISOString())
                    console.log(date_current.toISOString())
                    
                    transactie()
                }
                else{
                    console.log("geen transactie gedaan")
                    console.log(old_dag.toISOString())
                    console.log(date_current.toISOString())
                }
            }).catch(err =>{
                console.log(err)
                res.sendStatus(404)
            })
        }).catch(err =>{
            console.log(err);
            res.sendStatus(404);
        })
    }else{
        transactie()
    }
    function transactie(){
        //query voor je foncoin te updaten in de database
        //heb user erbij gezet bij de table
        query.select(connection,"balance","FonID",fonid).then(balance=>{
            const old_balance = balance[0].Foncoin;

            query.select(connection, "event","EventID",eventid).then(event=>{
                const value = event[0].Value;
                const new_value = old_balance + value;
                console.log("value is gegeven");
                console.log(new_value);
                query.update(connection, "balance", "Foncoin", new_value, "FonID", fonid ).then(update=>{
                    console.log("value updated");
                    res.sendStatus(200);
                }).catch(err =>{
                    res.sendStatus(404);
                })
            }).catch( err => {
                res.sendStatus(404);
                console.log(err);
            });    
        }).catch(err =>{
            console.log(err);
            res.sendStatus(404);
        })

        
        //Query voor het inserten van transactie
        const location = "Cantine p8";
        let date = new Date().toISOString().replace('T', ' ').substr(0, 19); // https://stackoverflow.com/questions/10645994/how-to-format-a-utc-date-as-a-yyyy-mm-dd-hhmmss-string-using-nodejs

        query.select(connection, "user","FonID", fonid).then(user=>{
            let userID = user[0].UserID;
            const colomns = ["EventID","UserID","Date","Location"];
            const values = [eventid,userID,`"${date}"`, `"${location}"`];
            query.insert(connection, "transactie", colomns, values ).then(trans=>{
                console.log("transactie inserted");
            }).catch(err=>{
                res.sendStatus(404);
                console.log(err)
            })

        }).catch(err=>{
            res.sendStatus(404);
        })
    }


})
module.exports = api