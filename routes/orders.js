const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/sessionMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const { getAllItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/ordersController");
const { validatorGetItem, validatorCreateOrder } = require("../validators/orderValidator");

router.get("/",authMiddleware,getAllItems);
router.get("/:id",authMiddleware,validatorGetItem,getItem);
router.post("/",authMiddleware,checkRole(["user","admin"]),validatorCreateOrder,createItem);
//router.put("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,validatorCreateOrder,updateItem);
router.delete("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,deleteItem);

module.exports = router;