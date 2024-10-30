const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const productModel = require("../models/products-model");
const mongoose = require("mongoose");
const isLoginned = require("../middlewares/isLoginned");
const {
  discountedProduct,
  filteredProducts,
  orderByPrice,
  outOfStock,
  addToStock,
  deleteProduct,
} = require("../controllers/products");

router.get("/", function (req, res) {
  res.send("Welcome to products router");
});

router.get("/dicountedproducts", discountedProduct);

router.get("/filter", filteredProducts);

router.get("/orderbyprice", orderByPrice);

router.post("/removefromcart/:id", isLoginned, async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;

  try {
    const objectId = new mongoose.Types.ObjectId(productId);
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      {
        $pull: { cart: objectId },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.redirect("/usercart");
  } catch (error) {
    console.error("Unable to remove item from cart:", error);
    res.redirect("/usercart");
  }
});

router.get("/buy/:id", isLoginned, async (req, res) => {
  const messages = {
    error: req.flash("error"),
    success: req.flash("success"),
};
  let productId = req.params.id;
  let product = await productModel.findOne({ _id: productId });
  console.log(product);
  res.render("buy", { product ,messages});
});

router.post("/outofstock/:id", outOfStock);

router.post("/addtostock/:id", addToStock);

router.post("/delete/:id", deleteProduct);
module.exports = router;
