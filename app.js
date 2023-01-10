const express = require('express');
const app = express();

// Configuration of PROCESS.ENV
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "config/config.env" });
}





module.exports = app;