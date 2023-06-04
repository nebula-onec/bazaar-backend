const app = require('./app');

const cloudinary = require('cloudinary').v2;

// Configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME ,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

app.listen(process.env.PORT, ()=>{
    console.log(`server is running on ${process.env.PORT}`);
});

