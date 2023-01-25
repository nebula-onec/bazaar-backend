const catchAsyncError = require("../middleware/catchAsyncError");
const dbQuery = require("../utils/dbQuery");


exports.getOrderDetails = catchAsyncError( async(req, res, next) => {
    let totalRevenue = 0, totalOrder = 0;
    const orders = await dbQuery(`select * from ${'client1'}.user_order`);

    orders.forEach((order)=>{
        totalRevenue += order.total_price;
    });
    totalOrder=orders.length

    res.status(200).json({
        success: true,
        totalRevenue,
        totalOrder,
        orders
    });
});