import { InputType, Field, Int, ID } from "type-graphql";

@InputType()
export class IngredientInput {
  @Field(() => ID)
  recipeId: number;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  amount: number;
}
