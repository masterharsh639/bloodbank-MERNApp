const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/create-inventory", authMiddleware, createInvertoryController);

module.exports = router;
