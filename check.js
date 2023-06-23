require("dotenv").config({ path: "config/config.env" });
const { configDatabase } = require("./config/configDatabaseName");
const connection = require("./config/database");
const Address = require("./models/addressModel");


async function working(){

    connection.query('insert into client1.user_order SET buyer_id = 4, address_id = 4, shipping_price= 10, total_price= 15000', (err, result)=> {
        if(err) throw err;
        console.log(result)
    })
}

working()
