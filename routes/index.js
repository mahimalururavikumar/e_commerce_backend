const express = require("express");
const isLoginned = require("../middlewares/isLoginned");
const router = express.Router();
const {
  shop,
  userCart,
  ownerLogin,
  newCollection,
} = require("../controllers/mainController");

router.get("/", (req, res) => {
  const messages = {
      error: req.flash("error"),
      success: req.flash("success"),
  };
  console.log("Flash Messages:", messages); 
  res.render("index", { messages });
});


router.get("/login", (req, res) => {
  const messages = {
    error: req.flash("error"),
    success: req.flash("success"),
};
  res.render("login", { messages });
});

router.get("/shop", shop);

router.get("/usercart", isLoginned, userCart);

router.get("/ownerlogin", ownerLogin);

router.get("/newcollection", newCollection);

module.exports = router;
