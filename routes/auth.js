const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const { validatorRegister, validatorLogin } = require("../validators/authValidator");
const router = express.Router();

router.post("/register",validatorRegister,registerUser);
router.post("/login",validatorLogin,loginUser);

module.exports = router;