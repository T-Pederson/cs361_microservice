const apiKey = "";    // Input your API key here from your Spoonacular profile

// An example call that gets a list of 5 recipes from Spoonacular's Find By Ingredients API and prints out a randomly chosen recipe's detail instructions in string format
  // https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients
async function exampleCall() {
  // Get some recipes from Spoonacular and build a stringified list of recipe IDs
  const spoonReq = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=apples,+flour,+sugar&number=5&apiKey=${apiKey}`);
  const spoonRes = await spoonReq.json();
  let recipeIDs = [];
  for (const recipe of spoonRes) {
    recipeIDs.push(recipe["id"]);
  }
  recipeIDs = JSON.stringify(recipeIDs);

  // Call the microservice to get the detailed recipe info of a randomly chosen recipe from the list of recipeIDs
  const response = await fetch(`http://localhost:8000?recipes=${recipeIDs}`);
  const data = await response.json();
  console.log(JSON.stringify(data));
}

exampleCall();
