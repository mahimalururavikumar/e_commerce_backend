const mongoose = require('mongoose');


const ownerSchema = mongoose.Schema({
    fullname:{
        type:String,
        trim:true,
    },
    email:{
        type: String
    },
    password:{
        type: String,
    },
    products:{
        type: Array,
        default: [],
    },
    picture:{
        type: String,
    },
    gstin:{
        type: String,
        default: '',
    }
})

module.exports = mongoose.model('owner', ownerSchema);