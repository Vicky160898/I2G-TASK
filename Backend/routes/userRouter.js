const express = require("express");
const {
  UserRegister,
  UserLogin,
  UpdateProfile,
} = require("../controller/userController");
const isAuth = require("../middleware/isAuth");
const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.put("/update/profile", isAuth, UpdateProfile);

module.exports = router;
