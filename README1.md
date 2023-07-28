# Bazaar-Backend
**Bazaar** - A system that provide platform to the seller who wants to turn their offline Shop into online marketplace. It enables sellers to setup their store online, and make their store live with their own store’s application ready in a short time.

# REST API

The REST API to the Bazaar app is described below.

## ADMIN API
## Login Admin
    POST  https://bazaar-backend.onrender.com/api/admin/login
    
Request Body
| Field | Type | Availabality |
| :---  | :--- | :--- |
| email | String | Mandatory |
| password | String | Mandatory | 

Response
| Status Code | Json Response |
| :------- | :----- |
| 401 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Invalid Email or Password" <br> }</pre> |
| 200 | <pre> { <br> &emsp; "success": true,<br> &emsp; "message":"Login Successfully" <br> }</pre> |


## Create Product
    POST  https://bazaar-backend.onrender.com/api/admin/product/create
    
Request Body
| Field | Type | Availabality |
| :---  | :--- | :--- |
| product_name | String | Mandatory |
| price | Number | Mandatory | 
| category_id | Number | Optional |
| description_short | String | Optional | 
| description_long | String | Optional |
| stock | Number | Mandatory | 
| imageLinks | String | Optional | 


Response
| Status Code | Json Response |
| :------- | :----- |
|  401 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Please Login to access this resource" <br> }</pre> |
|  400 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Please give Full Details of product" <br> }</pre> |
| 200 | <pre> { <br> &emsp; "success": true,<br> &emsp; "message":"Product Created successfully!" <br> }</pre> |



## Update Product
    PATCH  https://bazaar-backend.onrender.com/api/admin/product/:id
    
Request Body
| Field | Type | Availabality |
| :---  | :--- | :--- |
| product_name | String | Mandatory |
| price | Number | Mandatory | 
| category_id | Number | Optional |
| description_short | String | Optional | 
| description_long | String | Optional |
| stock | Number | Mandatory | 
| imageLinks | String | Optional | 


Response
| Status Code | Json Response |
| :------- | :----- |
|  401 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Please Login to access this resource" <br> }</pre> |
|  400 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Please give Full Details of product" <br> }</pre> |
|  400 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Invalid ID" <br> }</pre> |
| 200 | <pre> { <br> &emsp; "success": true,<br> &emsp; "message":"Product Updated successfully!" <br> }</pre> |



## Delete Product
    DELETE  https://bazaar-backend.onrender.com/api/admin/product/:id
    

Response
| Status Code | Json Response |
| :------- | :----- |
|  401 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Please Login to access this resource" <br> }</pre> |
|  400 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Invalid ID" <br> }</pre> |
| 200 | <pre> { <br> &emsp; "success": true,<br> &emsp; "message":"Product Deleted successfully!" <br> }</pre> |



## Logout Admin
    GET  https://bazaar-backend.onrender.com/api/admin/logout 

Response  ( Set token header to null ) 
| Status Code | Json Response |
| :------- | :----- |
|  200 | <pre> { <br> &emsp; "success": true,<br> &emsp; "message":"Logged Out" <br> }</pre> |



## CLIENT API

## Register User
    POST  https://bazaar-backend.onrender.com/api/register
    
    
Request Header
| client_id | 1 |
| :--- | :---- |

Request Body
| Field | Type | Availabality |
| :---  | :--- | :--- |
| name | String | Mandatory |
| phone | String | optional | 
| email | String | Mandatory |
| password | String | Mandatory | 

Response
| Status Code | Json Response |
| :------- | :----- |
| 401 | <pre> { <br> &emsp; "success": false,<br> &emsp; "message":"Invalid Email or Password" <br> }</pre> |
| 200 | <pre> { <br> &emsp; "success": true,<br> &emsp; "message":"Login Successfully" <br> }</pre> |




