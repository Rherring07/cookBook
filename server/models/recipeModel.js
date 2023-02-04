const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    prepTime: {
        type: Object,
        required: true,
    },
    cookTime: {
        type: Object,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    // countryOfOrigin: {
    //     type: String,
    //     required: true,
    // },
    // typeOfFood: {
    //     type: String,
    //     required: true,
    // },
    ingredients: {
        type: [String],
        required: true,
    },
    directions: {
        type: [String],
        required: true,
    },
    likes: {
        type: Number,
        required: true,
    },
    creator: {
        type: String,
        ref: "User",
    },
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
})


module.exports = mongoose.model("Recipe", RecipeSchema);