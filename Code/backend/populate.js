require("dotenv").config();
const connectDB = require("./config/db");
const Recipe = require("./models/recipe");
const mockData = require("./output.json");

const populating = async () => {
  await connectDB();
  try {
    await Recipe.deleteMany({});
    await Recipe.create(mockData);
  } catch (error) {
    console.log(error, "Something went wrong");
  }
};
populating();
