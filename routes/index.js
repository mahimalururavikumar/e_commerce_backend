const express = require("express");
const isLoginned = require("../middlewares/isLoginned");
const router = express.Router();
const { shop, userCart, ownerLogin, newCollection} = require('../controllers/mainController')

router.get("/", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("index", { error, success });
});

router.get("/login", (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("login", { error, success });
});

router.get("/shop", shop);

router.get("/usercart", isLoginned, userCart);

router.get("/ownerlogin", ownerLogin);

router.get("/newcollection", newCollection);


module.exports = router;
