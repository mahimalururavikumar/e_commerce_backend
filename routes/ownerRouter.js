const express = require("express");
const router = express.Router();
const { isAuthorized } = require("../middlewares/ownersMiddleware");
const { ownerLogin, admin, ownerCreate } = require("../controllers/owner");
const { createProduct } = require("../controllers/products");
const upload = require("../config/multer");

router.get("/", function (req, res) {
  res.send("Welcome to owner router");
});

router.get("/addproduct", (req, res) => {
  const messages = {
    error: req.flash("error"),
    success: req.flash("success"),
};
  res.render("createproducts",{messages});
});

router.get("/admin", admin);

router.post("/adminpage", ownerLogin);

router.post("/ownerCreate", ownerCreate);

router.post("/productadded",isAuthorized , upload.single("image"), createProduct);

module.exports = router;
