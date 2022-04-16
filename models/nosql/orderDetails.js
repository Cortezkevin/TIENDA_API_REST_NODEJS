const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const OrderDetailsScheme = new mongoose.Schema(
    {
        orderId: {
            type: mongoose.Types.ObjectId
        },
        productId: {
            type: mongoose.Types.ObjectId
        },
        amount: {
            type: Number
        },
        discount: {
            type: Number
        },
        subtotal: {
            type: Number
        },
        total: {
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

OrderDetailsScheme.statics.findAllData = function() {
    const joinData = this.aggregate([
        {
            $lookup:{
                from: "orders",
                localField: "orderId",
                foreignField: "_id",
                as: "order"
            }
        },
        { 
            $unwind: "$order"
        },
        {
            $lookup:{
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "product"
            }
        },
        { 
            $unwind: "$product"
        },
        {
            $unset: ["orderId","productId"]
        }
    ]);
    return joinData;
}

OrderDetailsScheme.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("ordersdetails", OrderDetailsScheme);