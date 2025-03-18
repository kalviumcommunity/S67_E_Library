const { model, Schema } =require( "mongoose");

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },
    
    coverImage: {
        type: String,
    }
},{timestamps:true});

const BookModel = model('Book', bookSchema);
module.exports = BookModel;