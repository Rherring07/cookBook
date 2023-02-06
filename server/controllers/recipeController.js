const cloudinary = require("../middleware/cloudinary");

const Recipe = require('../models/recipeModel')
const User = require('../models/UserModel');
const passport = require('passport');
const validator = require('validator');

module.exports = {
    getFeed: async (req,res) => {
        try {
            const recipes = await Recipe.find({})
            res.status(200).json(recipes)
        } catch(err) {
            console.log(err);
        }
    },

    getUserRecipes: async (req,res) => {
        try {
            const user = await User.findOne({userName: req.params.userName})
            const recipes = await Recipe.find({creator: user.userName})
            res.status(200).json(recipes)
        } catch(err) {
            console.log(err);
            console.log('get User Recipes error')
        }
    },

    // ---- GET BOOKMARKED RECIPES
    // Queries database for every recipes user has bookmarked
    getBookmarkedRecipes: async (req,res) => {
        try {

            const bookmarkedRecipes = req.user.bookmarkedRecipes
            
            bookmarkedRecipes ? res.status(200).json(bookmarkedRecipes) : res.status(200).json([]) // returns bookmarked recipes or empty array
        } catch(err) {
            console.log(err);
            console.log('get Bookmarked Recipes error')
        }
    },

    getLikedRecipes: async (req,res) => {
        try {
            const likedRecipes = req.user.likedRecipes
            likedRecipes ? res.status(200).json(likedRecipes) : res.status(200).json([])
        } catch(err) {
            console.log(err);
            console.log('get User Recipes error')
        }
    },

    // getUserRecipes: 
    getRecipe: async (req,res) => {
        try {
            const recipe = await Recipe.findById(req.params.id);
            res.status(200).json(recipe)
        } catch(err) {
            console.log(err);
        }
    },


    createRecipe: async (req,res) => {
        try {
           
            const { name, prepTime, cookTime, description, ingredients, directions } = JSON.parse(req.body.formData)
           
            const validationErrors = [];

            if(!name || !prepTime || !cookTime || !description || !ingredients || !directions)
                validationErrors.push({ msg: "Please fill out all fields"});

            if (validationErrors.length) {
                return res.status(400).send(validationErrors[0])
            }
            // Upload Image to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path);
           
            const recipe = await Recipe.create({
                name: name,
                prepTime: prepTime,
                cookTime: cookTime,
                description: description,
                // countryOfOrigin: req.body.countryOfOrigin,
                // typeOfFood: req.body.typeOfFood,
                ingredients: ingredients.trim().split('\n'),
                directions: directions.trim().split('\n'),
                likes: 0,
                creator: req.user.userName,
                image: result.secure_url,
                cloudinaryId: result.public_id,
            })
            console.log('Recipe has been added!');
            res.status(200).json(recipe)
        } catch (err) {
            console.log(err);
            console.log('error')
          }
    },   

    likeRecipe: async (req,res) => {
        try {
            await Recipe.findOneAndUpdate(
                { _id: req.params.id},
                { $inc: {likes: 1} }
            );
            const recipe = await Recipe.findById(req.params.id)
            
           // Update req user info
           const user = req.user;
           user.likedRecipes.push(recipe._id);

            await User.findOneAndUpdate(
                { userName: req.user.userName },
                { $addToSet: {'likedRecipes': recipe._id} }
            );
            // const user = await User.findById(req.user.id)
            console.log("Likes +1");
            res.status(200).send([user, recipe])
            } catch (err) {
            console.log(err);
        }
    },

    
    unlikeRecipe: async (req,res) => {
        try {
            await Recipe.findOneAndUpdate(
                { _id: req.params.id},
                { $inc: {likes: -1} }
            );
            const recipe = await Recipe.findById(req.params.id)

            // Update req user info
            const user = req.user;
            const recipeIndex = user.likedRecipes.indexOf(recipe._id)
            user.likedRecipes.splice(recipeIndex, 1);

            // Update database
            await User.findOneAndUpdate( 
                { userName: req.user.userName },
                { $pull: {'likedRecipes': recipe._id} }
            )
            console.log("Likes -1");

            res.status(200).send([user,recipe])
            } catch (err) {
            console.log(err);
        }
    },

    
    bookmarkRecipe: async (req,res) => {
        try {
            const recipe = await Recipe.findOne({_id: req.params.id});
            // Update req user info
            const user = req.user;
            user.bookmarkedRecipes.push(recipe);
            // Update database
            await User.findOneAndUpdate(
                { userName: req.user.userName },
                { $addToSet: {'bookmarkedRecipes': recipe} }
            );

            console.log("Bookmarked");
            res.status(200).send(user)
            } catch (err) {
            console.log(err);
        }
    },

    
    unBookmarkRecipe: async (req,res) => {
        try {
            const recipe = await Recipe.findOne({_id: req.params.id})
             // Update req user info
             const user = req.user;
             const recipeIndex = user.bookmarkedRecipes.indexOf(recipe)
             user.bookmarkedRecipes.splice(recipeIndex, 1);

            await User.findOneAndUpdate(
                { userName: req.user.userName },
                { $pull: { 'bookmarkedRecipes': recipe }  }
            );

           
            console.log("Removed from Bookmarks");
  
            res.status(200).send(user)
            } catch (err) {
            console.log(err);
        }
    },

    deleteRecipe: async (req,res) => {
        try {
            // Find post by id
            const recipe = await Recipe.findById(req.params.id);
            console.log(recipe);
            // Delete image from cloudinary
            await cloudinary.uploader.destroy(recipe.cloudinaryId);
            // delete from user
            await User.findOneAndUpdate(
                { userName: req.user.userName },
                { 
                    $pull: { 'bookmarkedRecipes': recipe }, 
                    $pull: { 'likedRecipes': recipe._id }  
                }  
            );
            // Delete post from db
            await Recipe.deleteOne(recipe);
            console.log("Deleted Recipe");
            res.status(200).json(req.params.id)
        } catch (err) {
            console.log(err);
            console.log('error');
            console.log(req.params.id)
        }
    },
}