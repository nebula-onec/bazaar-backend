# bazaar-backend
Clone the Repo https://github.com/DipanshuJ/bazaar-backend.git

Install dependencies by command $ npm i

Run command $npm start to run server at 8005


Here is the list of api endpoints, I have developed-

1) @name- login API, @type- Post, @body- email and password // email="adarshrawat.run@gmail.com", password="12345678"

url: "/api/v1/admin/login" 


2) @name- logout API

@type- get

url: "api/v1/logout"


This is admin restricted API- You need to login to access this api

@name- GetProduct API

@type- get

url: "api/v1/admin/products"



This is admin restricted API- You need to login to access this api

@name- CreatetProduct API

@type- Post

@body- name, price, description, stock

url: "api/v1/admin/createproduct"

