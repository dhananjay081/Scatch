const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection")


const ownerRouter = require("./routes/ownerRouter")
const productsRouter = require("./routes/productsRouter")
const userRouter = require("./routes/userRouter")
const indexRouter = require("./routes/index")

require("dotenv").config() // YE dusra tarika hai env vsriable ko use karene ka


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs")

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/",indexRouter)

app.listen(3000)
