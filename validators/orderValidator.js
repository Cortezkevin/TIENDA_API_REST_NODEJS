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

const validatorCreateOrder = [
    check("userId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("paymentId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("date")
    .exists()
    .notEmpty()
    .isDate(),
    check("discount")
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

module.exports = { validatorGetItem, validatorCreateOrder };