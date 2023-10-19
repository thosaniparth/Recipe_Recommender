import React from "react";
import "../video.css";
import background from "./componentImages/bg-card2.jpg";

// Recipe component dealing with individial recipe items
const Recipe = (recipe) => {
  // splitting the ingredients with seperator as a comma
  var ingredients_seperated = recipe.recipe["Cleaned-Ingredients"].split(",");
  var diet_type = "vegetarian";
  for (var i = 0; i < ingredients_seperated.length; i++) {
    if (ingredients_seperated[i].includes("chicken")) {
      diet_type = "Non-vegetarian";
    } else if (ingredients_seperated[i].includes("fish")) {
      diet_type = "Non-vegetarian";
    } else if (ingredients_seperated[i].includes("lobster")) {
      diet_type = "Non-vegetarian";
    } else if (ingredients_seperated[i].includes("beef")) {
      diet_type = "Non-vegetarian";
    }
  }

  var translated_instruction = recipe.recipe["TranslatedInstructions"];
  var time_to_cook = recipe.recipe["TotalTimeInMins"];
  var calories = recipe.recipe["calories"];
  console.log("time_to_cook", time_to_cook);
  // mapping each ingredient to be displayes as a list item
  ingredients_seperated = ingredients_seperated.map((ingredient) => (
    <li key={ingredient} className="recipe_ingredient_item">
      {" "}
      {ingredient}
    </li>
  ));
  <p>{translated_instruction}</p>;

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="col-lg-2 pb-1"
      id="resultContainer"
    >
      <div className="card">
        <div className="card-body">
          <h2>{recipe.recipe.TranslatedRecipeName}</h2>
          <h3>Time to cook: {time_to_cook} minutes</h3>
          <h3>Diet Type: {diet_type}</h3>
          <p className="card.text">
            <h3>Ingredients: </h3>
            <br />
            <ul className="result_ingredients"> {ingredients_seperated} </ul>
            <h3>Calories: {calories}</h3>
            <h3>Instructions: </h3>
            <br />
            <ol className="result_instructions"> {translated_instruction} </ol>
            <img
              src={recipe.recipe["image-url"]}
              alt={recipe.recipe.TranslatedRecipeName}
            />
          </p>
          <div className="row"></div>
        </div>
      </div>
    </div>
  );
};

export default Recipe;
