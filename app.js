const express = require('express');
const error = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");

// Configuration of PROCESS.ENV
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cookieParser());

//Route Imports
const user = require("./routes/userRoute");
const product = require("./routes/productRoute");

app.use("/api/v1",user);
app.use("/api/v1",product);




app.use(error);

module.exports = app;