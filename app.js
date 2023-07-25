const express = require('express');
const error = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require('cors')

// Configuration of PROCESS.ENV
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
}
app.use((req, res,next)=>{
    console.log(req.url);
    next();
})

app.use(cors())
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

app.get("/", (req, res)=> {
    res.send("hello world")
})
//Route Imports
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");
const home = require('./routes/homeRoute');
const order = require("./routes/orderRoute");
const address = require("./routes/addressRoute");
const category = require("./routes/categoryRoute");

app.use("/api", user);
app.use("/api", product);
app.use("/api", home);
app.use("/api", order);
app.use("/api", address);
app.use("/api", category);


app.use(error);

module.exports = app;