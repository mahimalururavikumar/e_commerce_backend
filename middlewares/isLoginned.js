const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const cookie = require('cookie-parser')

module.exports = async function(req, res, next) {
    let cookie = req.cookies.token;
    if (!cookie) {
        req.flash("error", "You need to log in to access this page.");
        return res.redirect('/login');
    } else {
        try {
            let decoded = jwt.verify(cookie, process.env.JWT_KEY);
            let user = await userModel.findOne({ _id: decoded.id }).select("-password"); // Use async/await
            if (!user) {
                req.flash("error", "User not found.");
                return res.redirect('/login');
            }
            req.user = user;
            next(); // Proceed to next middleware or route handler
        } catch (error) {
            req.flash("error", "Something went wrong.");
            return res.redirect('/login');
        }
    }
};
