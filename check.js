require("dotenv").config({ path: "config/config.env" });
const { configDatabase } = require("./config/configDatabaseName");
const connection = require("./config/database");
const Address = require("./models/addressModel");

configDatabase("client1")
async function working(){

    try {
        const address = new Address({user_id: 1,street1: "vaishali Nagar", city: "Bhopal", zipcode: "462001"})
        console.log(await address.save())
    }
    catch(e){
        console.log("error thrown: Description")
        console.error(e)
    }
}

working()
