const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetItem = [
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorCreateOrderDetails = [
    check("orderId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("productId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("amount")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("discount")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("subtotal")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("total")
    .exists()
    .notEmpty()
    .isNumeric(),
    (req, res, next) => {
        console.log("DATA VALIDATOR",req.body);
        return validateResults(req, res, next);
    }
]

module.exports = { validatorGetItem, validatorCreateOrderDetails };