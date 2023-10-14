const express = require('express')
const {apiGetRecipeCuisines, apiGetRecipes, apiPostRecipes} = require('../controllers/recipe')
const getRecipe = express.Router();
const getCuisine = express.Router();
const postRecipe = express.Router();

//URl to get the recipes
getRecipe.route("/")
.get(apiGetRecipes);

postRecipe.route("/")
.post(apiPostRecipes);

getCuisine.route("/")
.get(apiGetRecipeCuisines);

module.exports = {
  getRecipe,
  postRecipe,
  getCuisine
};