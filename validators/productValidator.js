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
    check("categoryId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("supplierId")
    .exists()
    .notEmpty()
    .isMongoId(),
    check("mark")
    .exists()
    .notEmpty(),
    check("description")
    .exists()
    .notEmpty(),
    check("price")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("url_image")
    .exists()
    .notEmpty()
    .isURL(),
    check("stock")
    .exists()
    .notEmpty()
    .isNumeric(),
    check("expiration_date")
    .exists()
    .notEmpty()
    .isDate(),
    (req, res, next) => {
        validateResults(req, res, next);
    }
];

module.exports = { validatorGetItem, validatorCreateItem};