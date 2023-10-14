const express = require("express");
const { default: mongoose } = require("mongoose");
const getRecipe = express.Router();
const getCuisine = express.Router();
const postRecipe = express.Router();
const Recipe = require('../models/recipe');
const Error = require('../errors/error')

//************* Database Queries***************** */
async function postRecipes(addRecipeDetails) {
  console.log("inside model");
  console.log(typeof Recipe)
  try {
    const res = Recipe.create(addRecipeDetails);
    console.log("1 document inserted");
    console.log(res);
  } catch (error) {
    Error.CustomAPIError("Document cannot be ineserted: ")
  }
}

async function getRecipes({ filters = null, page = 0, recipesPerPage = 10,} = {}){
  let query;
  console.log("heeere", filters);
  if (filters) {
    if ("CleanedIngredients" in filters) {
      var str = "(?i)";
      var time = parseInt(filters["totalTime"]);

      for (var i = 0; i < filters["CleanedIngredients"].length; i++) {
        const str1 = filters["CleanedIngredients"][i];
        str += "(?=.*" + str1 + ")";
      }
      console.log(str);
      if (time) {
        query = {
          CleanedIngredients: { $regex: str },
          TotalTimeInMins: { $lte: time },
        };
      } else {
        query = {
          CleanedIngredients: { $regex: str },
        };
      }
      if(query.Cuisine){
        query["Cuisine"] = filters["Cuisine"];
      }
      console.log(query);
    }
  }

  let cursor;
  let recipesList;
  let totalNumRecipes;

  try {
    cursor = await Recipe
      .find(query)
      .collation({ locale: "en", strength: 2 });
    console.log(cursor);
  } catch (e) {
    console.error(`Unable to issue find command, ${e}`);
    return { recipesList: [], totalNumRecipess: 0 };
  }
  
  // const displayCursor = cursor.skip(page*recipesPerPage).limit(recipesPerPage);
  try {
    recipesList = cursor //displayCursor.toArray();
    totalNumRecipes = cursor.length;
    return { recipesList, totalNumRecipes};
  } catch (e) {
    console.error(
      `Unable to convert cursor to array or problem counting documents, ${e}`
    );
    return { recipesList: [], totalNumRecipes: 0};
  }
  // try {
    // some code was deleted from before.

      // ********************Calori calculator code****************
      // var total_cal = 0;
      // await axios
      //   .get("https://api.calorieninjas.com/v1/nutrition?query=" + new_str, {
      //     headers: {
      //       "X-Api-Key": "XSCESI7dxnCa7WydS0dZdQ==2nqZmMFF8hXOwdkE",
      //     },
      //   })
      //   .then(function (response) {
      //     // handle success
      //     for (let i = 0; i < response.data.items.length; i++) {
      //       var temp = response.data.items[i].calories;
      //       // console.log(temp);
      //       total_cal += temp;
      //     }
      //   })
      //   .catch(function (error) {
      //     // handle error
      //     console.log("error:" + error);
      //   })
      //   .then(function () {
      //     // always executed
      //   });}
    }

async function getCuisines() {
  let cuisines = [];
  try {
    cuisines = await Recipe.distinct("Cuisine");
    return cuisines;
  } catch (e) {
    console.error(`Unable to get cuisines, ${e}`);
    return cuisines;
  }
}

//*************Recipe Controller******************/

class RecipesController {
  static async apiPostRecipes(req, res, next) {
    try {
      console.log("inside controller");
      let obj = await postRecipes(req.body);
      res.json(obj);
    } catch (err) {
      console.log("Error in Post Recipes", err);
    }
  }

  static async apiGetRecipes(req, res, next) {
    const recipesPerPage = req.query.recipesPerPage
      ? parseInt(req.query.recipesPerPage, 10)
      : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    //Checking the query to find the required results
    console.log(req.query.CleanedIngredients);
    if (req.query.CleanedIngredients) {
      filters.CleanedIngredients = req.query.CleanedIngredients;
      filters.Cuisine = req.query.Cuisine;
      filters.totalTime = req.query.totalTime;
    }

    const { recipesList, totalNumRecipes} =
      await getRecipes({
        filters,
        page,
        recipesPerPage,
      });

    let response = {
      recipes: recipesList,
      page: page,
      filters: filters,
      entries_per_page: recipesPerPage,
      total_results: totalNumRecipes,
    };
    res.json(response);
  }
  //Function to get the cuisines
  static async apiGetRecipeCuisines(req, res, next) {
    try {
      let cuisines = await getCuisines();
      console.log(cuisines);
    } catch (e) {
      throw new Error.CustomAPIError(`Get Cusines API Error: ${e}`)
    }
  }
}

module.exports = RecipesController