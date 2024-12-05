const express = require('express');
const config = require('../config');
const app = express();
const {connect} = require("mongoose");
const routes = require('./routes');


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api', routes)

const bootstrap = async()=>{
    await connect(config.mongoDb)

    app.listen(config.port, ()=>{
        console.log(`Port is running on ${config.port}`)
    })
} 

bootstrap()

