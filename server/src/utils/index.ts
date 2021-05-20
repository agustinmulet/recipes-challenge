import { Recipe } from "src/entity/Recipe";

export function calculateAverage(recipe: Recipe) {
  const sum = recipe.ratings.reduce((acc, rate) => acc + rate.value, 0);
  return recipe.ratings.length ? sum / recipe.ratings.length : 0;
}