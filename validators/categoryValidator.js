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
    check("name")
    .exists()
    .notEmpty()
    .isLength({min:9,max:100}),
    check("description")
    .exists()
    .notEmpty()
    .isLength({min:15,max:100}),
    check("url_image")
    .exists()
    .notEmpty()
    .isURL(),
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]

module.exports = { validatorGetItem, validatorCreateItem };