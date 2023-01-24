module.exports = function(err, req, res, next){
    console.log("ye mera ilaka he");
    console.log(err);
    res.status(500).json({
        success: false,
        message: err.message
    });
};