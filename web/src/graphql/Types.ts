export interface Recipe {
  __typename: string;
  name: string;
  id: string;
  averageRating: number;
}

export interface Ingredient {
  __typename: string;
  name: string;
  amount: number;
  unit: string;
}
