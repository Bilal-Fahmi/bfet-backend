const mongoose = require('mongoose')


mongoose.set('strictQuery',true)
mongoose.connect(process.env.dbURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection successfull");
}).catch((error)=>{
    console.log("connection failed",error);
})