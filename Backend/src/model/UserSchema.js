const { Schema, model } = require("mongoose");

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+@.+\..+/
    },

    password: { 
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        enum: ['reader', 'author'],
        default: 'reader'
    }

},{timestamps:true});

const UserModel = model('User', userSchema);
module.exports = UserModel;