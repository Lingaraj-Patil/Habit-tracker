const express = require("express");
const { createHabit, updateHabit, getHabit, deleteHabit, markHabitComplete } = require("../controllers/habitController");
const protect = require("../middleware/authMiddleWare");
const router = express.Router();

router.post("/create",protect,createHabit);
router.post("/:id/mark-complete",protect,markHabitComplete);
router.put("/update/:id",protect,updateHabit);
router.get("/get/:id",protect,getHabit);
router.delete("/delete/:id",protect,deleteHabit);

module.exports = router;