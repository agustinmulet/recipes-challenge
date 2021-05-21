import { gql } from "@apollo/client";

export const GET_RECIPES = gql`
  query getRecipes(
    $searchTerm: String,
    $order: String,
    $skip: Int,
    $take: Int
    ) {
    recipes(
      searchTerm: $searchTerm,
      order: $order,
      skip: $skip,
      take: $take
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
      averageRating
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
