const isLoginned = require("../middlewares/isLoginned");
const productModel = require("../models/products-model");
const userModel = require("../models/user-model");

module.exports.shop = async (req, res) => {
  let products = await productModel.find();
  let messages = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  res.render("shop", { messages, products });
};

module.exports.userCart = async (req, res) => {
  const messages = {
    error: req.flash("error"),
    success: req.flash("success"),
  };
  user = req.user;
  let products = await productModel.find({ _id: { $in: user.cart } });
  res.render("cart", { user, products, messages });
};

module.exports.ownerLogin = (req, res) => {
  const messages = {
    error: req.flash("error"),
    success: req.flash("success"),
};
  res.render("owner-login", { messages });
};

module.exports.newCollection = async (req, res) => {
  try {
    const messages = {
      error: req.flash("error"),
      success: req.flash("success"),
    };
    let products = await productModel.find().sort({ createdAt: -1 }).limit(6);
    if (products.length === 0) {
      req.flash("error", "no products are added recently");
      console.log("No products yet");
      res.redirect("/shop");
    }
    res.render("newcollections", { messages,products });
  } catch (error) {
    console.error("Error fetching new collection:", error);
    req.flash("error", "Failed to load new collection");
    res.redirect("/shop");
  }
};
