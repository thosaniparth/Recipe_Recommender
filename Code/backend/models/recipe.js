const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        recipeName:{
          type: String
        },
        ingredients:{
          type: String
        },
        totalTime:{
          type: Number
        },
        cusine:{
          type: String
        },
        instructions:{
          type: String
        },
        url:{
          type: String
        },
        cleanedIngredient:{
          type: String,
        },
        imageUrl:{
          type: String
        },
        ingredientCount:{
          type: Number
        },
        recipeRating:{
          type: Number
        },
        dietType:{
          type: String,
          enum: {
            values:['Vegan', 'Vegetarian', 'Non-Vegetarian'],
            message: ['${VALUE} is not in one of the diet categories.']
          }
        },
        resturant:{
          type: String
        },
        resturantLocation:{
          type: String
        }
    }
);
  
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;