module.exports = function(err, req, res, next) {
    console.log("My Error Handler");
    console.log(err);
    res.status(500).json({
        success: false,
        message: err.message
    });
};