const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const SuppliersScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        address: {
            type: String
        },
        phone: {
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

SuppliersScheme.plugin(mongooseDelete, {overrideMethods: 'all'});
module.exports = mongoose.model("suppliers", SuppliersScheme);