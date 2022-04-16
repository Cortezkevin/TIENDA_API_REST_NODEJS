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
    .notEmpty(),
    check("address")
    .exists()
    .notEmpty(),
    check("phone")
    .exists()
    .notEmpty()
    .isNumeric(),
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

module.exports = { validatorGetItem, validatorCreateItem};