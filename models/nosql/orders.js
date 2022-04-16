const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const OrdersScheme = new mongoose.Schema(
    {
        date:{
            type: Date
        },
        discount:{
            type: Number
        },
        total:{
            type: Number
        },        
        userId:{
            type: mongoose.Types.ObjectId
        },
        paymentId:{
            type: mongoose.Types.ObjectId
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

OrdersScheme.statics.findAllData = function(){
    const joinData = this.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $unwind: "$user"
        },
        {
            $lookup: {
                from: 'payments',
                localField: 'paymentId',
                foreignField: '_id',
                as: 'payment'
            }
        },
        {
            $unwind: "$payment"
        },
        {
            $unset: ["userId", "paymentId"]
        },
        /*{
            $lookup: {
                from: "ordersdetails",
                let: {
                    aliasOrderDetails: "$_id"
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: ["$orderId", ["$$aliasOrderDetails"]]
                            }                            
                        }
                    }
                ],
                as: "order_details"
            }
        }*/
    ]);
    return joinData;
};



OrdersScheme.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("orders", OrdersScheme);