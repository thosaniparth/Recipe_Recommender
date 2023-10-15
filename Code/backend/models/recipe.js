const mongoose = require('mongoose');
const {Schema} = mongoose

const recipeSchema = new Schema(
    {
        TranslatedRecipeName:{
          type: String,
          required: [true, "Recipe Name is required"],
        },
        TotalTimeInMins:{
          type: Number,
          required: [true, "Total Time is required"]
        },
        Cuisine:{
          type: String,
          required: [true, "Cuisine is required"]
        },
        imageUrl:{
          type: String
        },
        CleanedIngredients:{
          type: String,
          required: [true, "Ingredients is required"]
        },
        TranslatedInstructions:{
          type: String,
          required: [true, "Instructions is required"]
        },
        budget:{
          type: Number
        },
        typeOfDiet: {
          type: String,
          enum: ['Vegan', 'Vegetarian', 'Non-Vegetarian'],
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