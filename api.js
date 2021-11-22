const express = require("express");
const cors = require("cors");
const api = express();

api.use(
    cors({
    origin:"*",
})
)

const port = 3000 ;

//test
// api.get('/', (req, res) =>{
//     res.send('200')
// })
// api paths
api.use('/api/card_reader', require('./routes/card_reader'))
api.use('/api/foncoin_update', require('./routes/foncoin_update'));
api.use('/api/insert_user', require ('./routes/insert_user'));
api.use('/api/insert_transactie', require ('./routes/insert_transactie'));
api.use('/api/inloggen', require ('./routes/inloggen'));
api.use('/api/website_user', require('./routes/website_user'));
api.use('/api/History_select', require ('./routes/History_select'));
// api.use(cors());

//start the api
api.listen(port, () =>{
    console.log(`Het werkt listining on ${port}`)
})