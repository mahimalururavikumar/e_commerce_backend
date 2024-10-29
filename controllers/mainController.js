const isLoginned = require("../middlewares/isLoginned");
const productModel = require("../models/products-model");
const userModel = require("../models/user-model");

module.exports.shop = async (req, res) => {
    let products = await productModel.find();
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("shop", { error, success, products });
}

module.exports.userCart =  async (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    user = req.user;
    let products = await productModel.find({ _id: { $in: user.cart } });
    res.render("cart", { user, products, success, error });
}

module.exports.ownerLogin =  (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("owner-login", { error, success });
}

module.exports.newCollection =  async (req, res) => {
    try {
      let products = await productModel.find().sort({ createdAt: -1 }).limit(6);
      if (products.length === 0) {
        req.flash("error", "no products are added recently");
        console.log('No products yet');
        res.redirect("/shop");
  
      }
      res.render("newcollections", { products });
    } catch (error) {
      console.error("Error fetching new collection:", error);
      req.flash("error", "Failed to load new collection");
      res.redirect("/shop");
    }
}
