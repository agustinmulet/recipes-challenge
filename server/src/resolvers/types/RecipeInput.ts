import { InputType, Field } from "type-graphql";

import { Recipe } from "../../entity/recipe";

@InputType()
export class RecipeInput implements Partial<Recipe> {
  @Field()
  name: string;

  @Field({ nullable: true })
  steps: string;
}
