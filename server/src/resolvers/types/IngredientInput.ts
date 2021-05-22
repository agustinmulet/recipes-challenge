import { InputType, Field, ID, Float } from "type-graphql";

@InputType()
export class IngredientInput {
  @Field(() => ID)
  recipeId: number;

  @Field(() => String)
  name: string;

  @Field(() => Float)
  amount: number;

  @Field(() => String)
  unit: string;
}
