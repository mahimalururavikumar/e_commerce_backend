const productModel = require('../models/products-model');

module.exports.userCart = async (req, res) =>{

    try {

    user = req.user

    let product = await productModel.findOne({ _id : req.params.id})
    if(!product){
    req.flash('error' ,'error in fecthing the product');
    return res.redirect('/usercart');
    }

    if(!user.cart.includes(product._id)){

        user.cart.push(product._id);
        await user.save();
        req.flash('success','item successfully added to cart')
    } else {
        req.flash('error','Product already in cart you can buy it')
    }
    let products = await productModel.find();
 
    res.redirect(301,'/usercart');
        
    } catch (error) {
        req.flash('error', 'An error occurred while adding the product to the cart');
        res.redirect('/usercart');
    }
}