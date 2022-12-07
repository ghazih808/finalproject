const express = require('express');
const app = express();
const path= require('path');
var bodyParser = require('body-parser');
// app.set('view engine','ejs');

app.use(bodyParser.urlencoded({ extended: false }))

//view engine
app.set("view engine","ejs")
//app.use(static)

//load assets
// app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
// app.use('/Img',express.static(path.resolve(__dirname,"assets/Img")))
// app.use('/JS',express.static(path.resolve(__dirname,"assets/JS")))
 app.use(express.static(path.join(__dirname,"Assests")))
//load routers
app.use('/',require('./Server/Routes/router'))


app.listen(process.env.PORT ||3002 , () => { console.log(`Server is running on http://localhost:${3002}`) });