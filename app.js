const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const path = require("path");
const flash = require('connect-flash');
const expressSession = require('express-session');


const ownerRouter = require("./routes/ownerRouter")
const productsRouter = require("./routes/productsRouter")
const userRouter = require("./routes/userRouter")
const indexRouter = require("./routes/index")
const db = require("./config/mongoose-connection")

require("dotenv").config() // YE dusra tarika hai env vsriable ko use karene ka


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(
    expressSession({
        resave:false,
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs")

app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use("/",indexRouter)


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
