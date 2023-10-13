const mongoose = require('mongoose');
const {Schema} = mongoose

const recipeSchema = new Schema(
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
        budget:{
          type: Number
        },
        typeOfDiet: {
          type: String,
          enum: ['Vegan', 'Vegetarian', 'Non-Vegitarian'],
          message: '${VALUE} is not a diet type.'
        },
        user:{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
    }, { collection: 'recipe' }
);
const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;