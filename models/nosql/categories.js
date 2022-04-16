const mongoose  = require("mongoose");
const mongooseDelete  = require("mongoose-delete");

const CategoryScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        description: {
            type: String
        },
        url_image: {
            type: String
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

CategoryScheme.plugin(mongooseDelete, { overrideMethods: 'all'});
module.exports = mongoose.model("categories", CategoryScheme);