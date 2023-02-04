const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')
const { ensureAuth } = require('../middleware/auth')
const upload = require("../middleware/multer");


router.get('/', recipeController.getFeed);
// router.get('/:userName/recipes', recipeController.getUserRecipes)
router.post('/', ensureAuth, upload.single('file'), recipeController.createRecipe);

router.get('/:id', recipeController.getRecipe);
router.delete('/:id', recipeController.deleteRecipe);




module.exports = router