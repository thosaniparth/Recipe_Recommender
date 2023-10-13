const mongoose = require('mongoose');

const recipeSchema = mongoose.Schema(
    {
        TranslatedRecipeName:{
          type: String
        },
        TotalTimeInMins:{
          type: Number
        },
        Cuisine:{
          type: String
        },
        imageUrl:{
          type: String
        },
        CleanedIngredients:{
          type: String,
        },
        TranslatedInstructions:{
          type: String
        },
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
    }
);
  
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;