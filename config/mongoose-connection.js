const mongoose = require('mongoose');
const config = require('config');



mongoose
.connect(`${config.get('MONGODB_URL')}`)
.then(()=> {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});


module.exports = mongoose.connection;