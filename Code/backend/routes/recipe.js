const express = require('express')
const RecipesController = require('../controllers/recipe')
const getRecipe = express.Router();
const getCuisine = express.Router();
const postRecipe = express.Router();

//URl to get the recipes
getRecipe.route("/")
.get(RecipesController.apiGetRecipes);

postRecipe.route("/")
.post(RecipesController.apiPostRecipes);

getCuisine.route("/")
.get(RecipesController.apiGetRecipeCuisines);

module.exports = {
  getRecipe,
  postRecipe,
  getCuisine
};