const express = require("express");
const {
  registerUser,
  activateUser,
  loginUser,
} = require("../controllers/userController");
const upload = require("../miscellaneous/multer");

const router = express.Router();

// REGISTER USER
router.post("/register", upload.single("file"), registerUser);

// ACTIVATE USER
router.post("/activate", activateUser);

// ACTIVATE USER
router.post("/login", loginUser);

module.exports = router;
