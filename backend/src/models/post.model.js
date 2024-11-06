const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    myfile:{
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Posts', postSchema);