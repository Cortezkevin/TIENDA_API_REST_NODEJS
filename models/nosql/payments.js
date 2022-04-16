const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const PaymentScheme = new mongoose.Schema(
    {
        type:{
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

PaymentScheme.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("payments", PaymentScheme);