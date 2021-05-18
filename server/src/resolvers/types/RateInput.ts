import { InputType, Field, Int, ID } from "type-graphql";

@InputType()
export class RateInput {
  @Field(() => ID)
  recipeId: number;

  @Field(() => Int)
  value: number;
}
