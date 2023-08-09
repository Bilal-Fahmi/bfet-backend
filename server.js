const express = require('express')
const path = require('path')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const index = require('./api/Routes/index')
// const admin = require('./api/Routes/AdminRoute')
require('dotenv').config()
console.log(process.env.dbURL);

require('./api/Config/database')

app.use(
    cors({
        origin:["http://localhost:5173"],
        methods:["GET","POST","PATCH","DELETE"],
        credentials:true
    })
)

app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,"Public")))

app.use('/',index)
app.use('*',(req,res)=>{
    res.json({message:'lllll'})
})
// app.use('/admin',admin)

app.listen(8000,()=>{
    console.log("server on port 8000");
})