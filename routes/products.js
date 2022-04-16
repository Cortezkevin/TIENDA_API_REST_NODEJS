const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/sessionMiddleware");
const checkRole = require("../middleware/roleMiddleware");
const { getAllItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/productsController");
const { validatorGetItem, validatorCreateItem } = require("../validators/productValidator");

router.get("/",authMiddleware,getAllItems);
router.get("/:id",authMiddleware,validatorGetItem,getItem);
router.post("/",authMiddleware,checkRole(["user","admin"]),validatorCreateItem,createItem);
router.put("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,validatorCreateItem,updateItem);
router.delete("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,deleteItem);

module.exports = router;