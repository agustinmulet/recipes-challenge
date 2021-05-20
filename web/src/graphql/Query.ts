import { gql } from "@apollo/client";

export const SEARCH_RECIPE = gql`
  query searchRecipe($searchTerm: String!) {
    searchRecipe(searchTerm: $searchTerm) {
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
      name
      averageRating
    }
  }
`;
