const userModel = require('../models/user-model')
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser');
const { generateToken} = require('../utils/generateToken');

module.exports.registerUser = async function (req, res){
    try {
        let {fullname,password,email} = req.body;

    let user = await userModel.findOne({email})
    if(user){
        req.flash('error','user already exists')
        return res.redirect('/')
    }
    bcrypt.genSalt(10, function(err, salt){
        if (err) return res.send(err.message)
        bcrypt.hash(password, salt, async function(err, hash){
            if (err) return res.send(err.message)
                try {
                    let createdUser = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    });
                    
                    let token = generateToken(createdUser)
                    res.cookie('token', token)
                    req.flash('success','user created successfully')
                    res.redirect('/shop');
                } catch (error) {
                    res.flash('error', error.message)
                    return res.redirect('/')
                }
        })
    })
        
    } catch (error) {
        res.send(error.message)
    }
}


module.exports.loginUser = async function (req, res) {
    try {
      const { email, password } = req.body;

      const user = await userModel.findOne({ email });
      if (!user) {
        console.log(`User found: ${user ? 'Yes' : 'No'}`);
        req.flash('error', 'Login failed, user not found.');
        return res.redirect('/login');
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
        console.log(`Password notMatched: ${isPasswordCorrect}`);
        req.flash('error', 'Invalid credentials.');
        return res.redirect('/login');
      }
        const token = generateToken(user);
        res.cookie('token', token, { httpOnly: true });
        req.flash('success', 'Successfully logged in!');
        return res.redirect('/shop');
    } catch (error) {
        console.error('Login Error:', error.message);
        req.flash('error', 'Something went wrong, please try again.');
        return res.status(500).redirect('/login');
    }
  };

module.exports.logoutUser = async function(req, res) {
    try {

        res.clearCookie('token');
        req.flash('success','You have logged out successfully')
        res.redirect('/login')
        
    } catch (error) {
        req.flash('error', message.error);
    }
}
