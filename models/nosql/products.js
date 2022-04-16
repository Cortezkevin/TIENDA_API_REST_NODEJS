const { default: mongoose } = require("mongoose");
const moongose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { CategoryModel } = require("./categories");

const ProductScheme = new mongoose.Schema(
    {
        name: {
            type: String
        },
        categoryId:{
            type: mongoose.Types.ObjectId,
            select: false
        },
        supplierId:{
            type: moongose.Types.ObjectId,
            select: false
        },
        mark: {
            type: String
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        url_image: {
            type: String
        },
        stock: {
            type: Number
        },
        expiration_date: {
            type: Date
        }        
    },
    {
        timestamps: true,
        versionKey: false 
    }
);

/**
 * Mostrando la data con la relacion
 */
ProductScheme.statics.findAllData = function() {
    const joinData = this.aggregate([
        {
            $lookup:{ 
                from: 'categories',
                localField: 'categoryId',
                foreignField: '_id',
                as: 'category'
            }
        },
        { 
            $unwind: "$category"            
        },
        {
            $lookup:{ 
                from: 'suppliers',
                localField: 'supplierId',
                foreignField: '_id',
                as: 'supplier'
            }
        },
        { 
            $unwind: "$supplier"            
        },
        {
            $unset: ["categoryId","supplierId"]
        },      
    ]);
    return joinData;    
}
/*
ProductScheme.statics.findAllDataSupplier = function() {
    const joinData = this.aggregate([
        {
            $lookup:{ 
                from: 'suppliers',
                localField: 'supplierId',
                foreignField: '_id',
                as: 'supplier'
            }
        },
        { $unwind: "$supplier"}
    ]);
    return joinData;
}*/ 

ProductScheme.plugin(mongooseDelete, { overrideMethods: 'all'});
module.exports = mongoose.model("products", ProductScheme);