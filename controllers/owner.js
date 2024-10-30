const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');
const productModel = require('../models/products-model');
const { generateToken } = require('../utils/generateToken');


module.exports.ownerLogin = async (req,res) => {
    try {
        
        let { email, password } = req.body;
        
        const owner = await ownerModel.findOne({email});
        if(!owner){
            console.log(`Owner Found: ${owner ? 'YES' : 'NO'}`);
            req.flash('error','owner not exist');
            return res.redirect('/ownerlogin');
        }

        const isPasswordCorrect = await bcrypt.compare(password, owner.password);
        if(!isPasswordCorrect){
            console.log(`Password notMatched`);
            req.flash('error','invalid credientials');
            return res.redirect('/ownerlogin')
        }

        const token = generateToken(owner);
        res.cookie('token',token,{secure: true});
        req.flash('success','Successfully logged in');
        res.redirect('/owner/admin');
    } catch (error) {
        console.error('Login Error:', error.message);
        req.flash('error', 'Something went wrong, please try again.');
        return res.status(500).redirect('/ownerlogin');
    }
}


module.exports.admin =  async (req,res) => {

    try {
        
        const messages = {
            error: req.flash("error"),
            success: req.flash("success"),
        };

   
    let products = await productModel.find();
    if(!products){
        req.flash('error','error in fetching the products');
        console.log('failed to fetch products');
        return res.redirect('/ownerlogin');
    }
    
    res.render('admin',{products,messages})
    } catch (error) {
        console.error('Error fetching products:', error.message);
        req.flash('error', 'Unable to load products');
        res.redirect('/ownerlogin');
    }

}


module.exports.ownerCreate = async (req,res) => {

    try {
        
        if(process.env.NODE_ENV === 'development'){
            let {fullname,email,password} = req.body;

            let owners = await ownerModel.find();
            if(owners.length > 0)
            {
                return res.status(400).send("There should be only one owner")
            }

            const salt = await bcrypt.genSalt(10);
            const hashedpassword = await bcrypt.hash(password,salt)
            
            let createdOwner = await ownerModel.create({
                fullname,
                email,
                password : hashedpassword,
            })
            res.status(201).send(createdOwner);
        }    


    } catch (error) {
        res.status(500).send(error.message);
    }

    
}