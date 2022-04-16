const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/sessionMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const { getAllItems, getItem, createItem, deleteItem } = require("../controllers/orderDetailsController");
const { validatorGetItem, validatorCreateOrderDetails } = require("../validators/orderDetailValidator");

router.get("/",authMiddleware,getAllItems);
router.get("/:id",authMiddleware,validatorGetItem,getItem);
router.post("/",authMiddleware,checkRole(["user","admin"]),validatorCreateOrderDetails,createItem);
router.delete("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,deleteItem);

module.exports = router;