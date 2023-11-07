const express = require("express");
const app = express();
const port = 8000;
const apiKey = "";    // Input your API key here from your Spoonacular profile

// Randomly choses a recipe ID in the list of recipe IDs given
// Returns the recipe ID and the Get Analyzed Recipe Instructions API response from Spoonacular for that randomly chosen recipe
  // https://spoonacular.com/food-api/docs#Get-Analyzed-Recipe-Instructions
async function getRandomRecipe(recipeIDs) {
  recipeIDs = JSON.parse(recipeIDs);
  const recipeID = recipeIDs[Math.floor(Math.random() * recipeIDs.length)].toString();;
  const response = await fetch(`https://api.spoonacular.com/recipes/${recipeID}/analyzedInstructions?apiKey=${apiKey}`);
  const result = await response.json();
  return {"recipeID":recipeID, "instructions":result};
}

// Sends back the recipe ID and detailed recipe instructions for a randomly chosen recipe in the given list of recipes
app.get("/", async function (req, res) {
  res.json(await getRandomRecipe(req.query["recipes"]));
});

app.listen(port, function () {
  console.log(`Microservice listening on port ${port}!`);
});
