const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authorization");
const { userCart } = require("../controllers/user");
const isLoginned = require("../middlewares/isLoginned");
const userModel = require("../models/user-model");
const productsModel = require("../models/products-model");

router.get("/", function (req, res) {
  res.send("Welcome to user router");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/addtocart/:id", isLoginned, userCart);

router.post("/order/place/:id", isLoginned, async (req, res) => {
  let productId = req.params.id;
  let _id = req.user.id;
  let { phoneNo, address } = req.body;
  let updatedUser = await userModel.findByIdAndUpdate(
    _id,
    { contact: phoneNo, address, orders: productId },
    { new: true }
  );
  if (!updatedUser) {
    console.log("User not Found");
  }
  let user = await userModel.findById(_id);
  let products = await productsModel.findById(productId);
  res.redirect("/usercart");
});

module.exports = router;
