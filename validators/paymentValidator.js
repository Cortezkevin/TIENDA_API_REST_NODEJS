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

const validatorCreateItem = [
    check("type")
    .exists()
    .notEmpty()
    .isLength({min:5,max:100}),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorGetItem, validatorCreateItem };