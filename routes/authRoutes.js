const express = require("express");

const router = express.Router();
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
//routes

router.post("/register", registerController);
router.post("/login", loginController);
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
