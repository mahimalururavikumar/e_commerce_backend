const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = mongoose.Schema({
    fullname:{
        type:String,
        trim:true
    },
    email:{
        type: String
    },
    password:{
        type: String,
    },
    cart:[
        {
        type: Schema.Types.ObjectId,
        ref: 'products'
        }
    ],
    isadmin: Boolean,
    orders:[{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }],
    contact:{
        type: Number,
    },
    picture:{
        type: String,
    },
    address:{
        type: Object,
        default:{line1:'',line2:''},
    },
})

module.exports = mongoose.model('User', userSchema);