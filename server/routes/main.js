const express = require("express")
const router = express.Router()
// Controllers
const authController = require('../controllers/authController');
const recipeController = require('../controllers/recipeController');
// Middleware
const { ensureAuth } = require('../middleware/auth')


// Profle route
router.get('/user_profile', ensureAuth, authController.getMe);
router.get('/user_profile/bookmarked_recipes', ensureAuth, recipeController.getBookmarkedRecipes)
router.get('/user_profile/liked_recipes', ensureAuth, recipeController.getLikedRecipes)


router.put('/user_profile/bookmarked_recipes/:id', recipeController.bookmarkRecipe);
router.delete('/user_profile/bookmarked_recipes/:id', recipeController.unBookmarkRecipe);

router.put('/user_profile/liked_recipes/:id', recipeController.likeRecipe);
router.delete('/user_profile/liked_recipes/:id', recipeController.unlikeRecipe);

router.get('/profile/:userName', authController.getUser);
router.get('/profile/:userName/recipes', recipeController.getUserRecipes);

//Main Routes - Used for login, Sign up
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.post("/signup", authController.postSignup);

router.get("/logout", authController.logout);

module.exports = router;