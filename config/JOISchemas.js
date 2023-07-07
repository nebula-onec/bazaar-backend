const joi = require("joi")

const schemas = {
    myOrders: joi.object({
        page: joi.number().integer().min(1).default(1)
    }),
    orderDetail: joi.object({
        id: joi.number().integer().required()
    }),
    paramsId: joi.object({
        id: joi.number().integer()
    }),
    orderCreate: joi.object({
        orderProducts: joi.object().pattern(joi.number().integer(), joi.number().integer().min(1).required().label("Product's Quantity"), {matches: joi.array().items(joi.number().integer().required())}).required(),
        address_id: joi.number().integer().required(),
        shipping_price: joi.number().integer().min(10).required(),
    }),
    orderStatus: joi.object({
        order_id: joi.number().integer().required(),
        new_status: joi.number().integer().min(2).max(3).required()
    }),
    orderList: joi.object({
        page: joi.number().integer().min(1).default(1)
    }),
    productsList: joi.object({
        name: joi.string().default(""),
        category: joi.number().integer(),
        page: joi.number().integer().min(1).default(1)
    }),
    productCreate: joi.object({
        product_name: joi.string().min(3).max(255).required(),
        price: joi.number().integer().min(10).max(1000000).required(),
        stock: joi.number().integer().min(0).required(),
        imageLinks: joi.array().items(joi.string()).default([]),
        category_id: joi.number().integer(),
        description_short: joi.string(),
        description_long: joi.string()
    }),
    userRegister: joi.object({
        name: joi.string().pattern(/^[a-zA-Z ]+$/).required(),
        email: joi.string().email().required(),
        phone: joi.string().length(10).pattern(/^[0-9]{10}$/),
        password: joi.string().min(4).max(255).required(),
    }),
    loginDetails: joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    }),
    cartPost: joi.object({
        cart: joi.object().pattern(joi.number().integer(), joi.number().integer().min(1).max(20).required().label("Product's Quantity"), { matches: joi.array().items(joi.number().integer().required()) }).required(),
    }),
    order: joi.object({
        id: joi.number().integer()
    }),
    createAddress: joi.object({
        street1: joi.string().required(),
        street2: joi.string(),
        city: joi.string().required(),
        zipcode: joi.number().integer().required()
    }),
}

module.exports = schemas