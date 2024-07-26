const mongoose  = require("mongoose");
const config = require("config");

const dbgr = require("debug")("development:mongoose"); // $env:DEBUG="development:mongoose" set on the terminal

mongoose
.connect(`${config.get("MONGODB_URI")}/scatch`)
.then(function(){
    dbgr("connected");
})
.catch(function(err){
    dbgr(err)
})

module.exports = mongoose.connection;