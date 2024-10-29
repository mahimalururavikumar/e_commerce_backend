const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    image:{
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount:{
        type: Number,
        default: 0,
    },
    bgcolor:{
        type: String,
        default: '#000000',
        set : (value) => value && value.trim() ? value : '#000000'
    },
    panelcolor:{
        type: String,
        default: '#F1F1F1',
        set : (value) => value && value.trim() ? value : '#F1F1F1'
    },
    textcolor:{
        type: String,
        default: '#333333',
        set: (value) => value && value.trim() ? value : '#333333'
    },
    stock: { 
        type: Boolean,
        default: true,
    }
},{timestamps: true});

module.exports = mongoose.model('products', productSchema);