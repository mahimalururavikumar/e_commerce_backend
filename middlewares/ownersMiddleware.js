const jwt = require('jsonwebtoken');
const ownerModel = require('../models/owner-model')

module.exports.isAuthorized = async (req, res,next) => {
    
    try {
        
        let cookie = req.cookies.token;

        if(!cookie){
            req.flash('error','you must be admin to acccess this page');
            console.log('No token found in cookies');
            return res.redirect('/ownerlogin');
        }

        try{
            let decode = jwt.verify(cookie, process.env.JWT_KEY);
            let owner = await ownerModel.findOne({ _id:decode.id }).select("-password");
            if(!owner){
                req.flash('error','Unauthorized access');
                console.log('Unauthorized access owner not found');
                return res.redirect('/ownerlogin')
            }

            req.owner = owner;
            req.flash('success','Successfull logged in')
            console.log('successfull logged in')
            next();

        } catch (error) {
            req.flash('error','Invalid or Token expired');
            console.log('Jwt verification error', error);
            return res.redirect('/ownerlogin');
        }
    } catch (error) {
        console.error('Authorization error:', error);
        req.flash("error", "Something went wrong.");
        return res.redirect('/ownerlogin');
    }
}