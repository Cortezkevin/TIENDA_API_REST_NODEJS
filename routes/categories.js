const express = require("express");
const { validatorGetItem, validatorCreateItem } = require("../validators/categoryValidator");
const checkRole = require("../middleware/roleMiddleware");
const authMiddleware = require("../middleware/sessionMiddleware");
const { getAllItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/categoriesController");
const router = express.Router();

router.get("/",authMiddleware,getAllItems);
router.get("/:id",authMiddleware,validatorGetItem,getItem);
router.post("/",authMiddleware,checkRole(["user","admin"]),validatorCreateItem,createItem);
router.put("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,validatorCreateItem,updateItem);
router.delete("/:id",authMiddleware,checkRole(["user","admin"]),validatorGetItem,deleteItem);

module.exports = router;