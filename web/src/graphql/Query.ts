import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query getRecipes(
    $searchTerm: String,
    $order: String
    ) {
    recipes(
      searchTerm: $searchTerm,
      order: $order
    ) {
      id
      name
      averageRating
    }
  }
`;

export const RECIPE_BY_ID = gql`
  query recipeById($recipeId: String!) {
    recipe(recipeId: $recipeId) {
      id
      name
      steps
      ingredients {
        name
        amount
        unit
      }
    }
  }
`;

export const RATE_RECIPE = gql`
  mutation rateRecipe($rate: Int!, $recipeId: ID!) {
    rate(rate: { value: $rate, recipeId: $recipeId }) {
      id
      name
      averageRating
    }
  }
`;
