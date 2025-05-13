const { model, Schema } =require( "mongoose");

const bookSchema = new Schema({

    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },


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
        type: String
    },

    description: {
    type: String
    },

    review: {
    type: String
    },

    rating: {
    type: Number
    }

},{timestamps:true});

const BookModel = model('Book', bookSchema);
module.exports = BookModel;