import { gql } from '@apollo/client';

export const SEARCH_RECIPE = gql`
  query searchRecipe($searchTerm: String!) {
    searchRecipe(searchTerm: $searchTerm) {
      id
      name
      averageRating
    }
  }
`