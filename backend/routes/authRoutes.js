const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const upload = require("../config/multer");

router.post(
  "/register",
  upload.single("resume"),
  registerUser
);

router.post("/login", loginUser);

module.exports = router;