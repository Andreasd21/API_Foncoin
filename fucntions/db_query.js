const mysql = require("mysql");


let Con = module.exports = {
    connect: () => {
        // Functions to open connection with the database
        const connection = mysql.createConnection({
            host: "192.168.1.175",
            user: "root",
            password: "",
            database: "foncoindb",
            charset : 'utf8mb4',
            supportBigNumbers: true,
            bigNumberStrings: true
        });

        connection.connect(function (err) {
            if (err) throw err;

            console.log(`Connected to database`);
        })

        return connection;
    },
    //selecteer en pakt de data van de database
    select: (connection, table, field, value) => {
        return new Promise((resolve, reject) =>
        {
         connection.query(`SELECT * FROM ${table} WHERE ${field} =  ${value}`, function (err, result, fields) {
            if (err) reject (err);
            resolve(result);
            });
        });

    },
    //zet gegeven data in de database op de geselecterde plek
    insert: (connection, table, colomns, values) => {
        return new Promise((resolve, reject) =>{
            let sql =`INSERT INTO ${table} (${colomns.join(',')}) VALUES (${values.join(',')})`;
            connection.query(sql,function (err, result){
                if (err) reject(err);
                resolve("INSERTED INTO DATABASE")
        })

        });
    },
    //modificeert de geselecteerde data 
    update: (connection, table,colomn,values,field,condition) => {
        return new Promise((resolve, reject) =>{
            let sql =`UPDATE ${table} SET ${colomn} = ${values} WHERE ${field} = ${condition}`;
            connection.query(sql,function (err, result){
                if (err) reject(err);
                resolve("UPDATED VALUE");
            });

        })

    },   
    //selecteer en pakt de data van de database
    select_specifiek: (connection, row, table, field, value) => {
        return new Promise((resolve, reject) =>
        {
         connection.query(`SELECT ${row} FROM ${table} WHERE ${field} =  ${value}`, function (err, result, fields) {
            if (err) reject (err);
            resolve(result);
            });
        });
    }
}
    

// test van queries verwijder in echte deel
// runs the function card read en handels a error or succes 
// DB_con = Con.connect();
// Con.select(DB_con, "user", "FonID", "777").then(data=>{

//     console.log(data);
// }).catch( err => {
//     //console.log("fontis kaart is niet geregistreerd");
//     throw err;
// });

// Con.update(DB_con,"balance","foncoin", 100, "FonID", 777)
// //test array voor insert
// // let values = ["230",'"TimMarver@gmailcom"','"windowhater123"','"Tim den Hartigh"'];
// // Con.insert(DB_con, table , values);

//dit niet verwijderene!
module.exports = Con;
