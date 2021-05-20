import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  ResolverInterface,
} from "type-graphql";
import { ILike } from "typeorm";

import { Recipe } from "../entity/Recipe";
import { Rate } from "../entity/Rate";
import { Ingredient } from "../entity/Ingredient";

import { RecipeInput } from "./types/RecipeInput";
import { RateInput } from "./types/RateInput";
import { IngredientInput } from "./types/IngredientInput";

@Resolver(() => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  @Query(() => Recipe, { nullable: true })
  recipe(@Arg("recipeId", () => String) recipeId: string) {
    return Recipe.findOne(recipeId);
  }

  @Query(() => [Recipe], { nullable: true })
  searchRecipe(@Arg("searchTerm", () => String) searchTerm: string) {
    return Recipe.find({
      where: {
        name: ILike(`%${searchTerm}%`),
      },
    });
  }

  @Query(() => [Recipe], { nullable: true })
  async recipes(
    @Arg("order", () => String, { defaultValue: "ASC", nullable: true }) orderBy: "ASC" | "DESC" | 1 | -1 | undefined,
    @Arg("skip", { defaultValue: 0, nullable: true }) skip: number,
    @Arg("take", { defaultValue: 100, nullable: true }) take: number
  ) {
    const recipes = await Recipe.find({
      skip,
      take,
    });
    // TODO: Fix sort, this is not working.
    // averageRating is generated later.
    const sortedRecipes = recipes.sort((a, b) =>
      orderBy === "ASC"
        ? a.averageRating - b.averageRating
        : b.averageRating - a.averageRating
    );
    return sortedRecipes;
  }

  @Mutation(() => Recipe)
  async addRecipe(@Arg("recipe") recipeInput: RecipeInput): Promise<Recipe> {
    const recipe = Recipe.create({
      ...recipeInput,
    });
    return await Recipe.save(recipe);
  }

  @Mutation(() => Recipe)
  async rate(@Arg("rate") rateInput: RateInput): Promise<Recipe> {
    const recipe = await Recipe.findOne(rateInput.recipeId, {
      relations: ["ratings"],
    });
    if (!recipe) {
      throw new Error("Invalid recipe id.");
    }

    const newRate = Rate.create({
      recipe,
      value: rateInput.value,
    });
    recipe.ratings.push(newRate);

    await Recipe.save(recipe);
    return recipe;
  }

  @Mutation(() => Recipe)
  async createIngredient(
    @Arg("ingredient") ingrediendInput: IngredientInput
  ): Promise<Recipe> {
    const recipe = await Recipe.findOne(ingrediendInput.recipeId, {
      relations: ["ratings"],
    });
    if (!recipe) {
      throw new Error("Invalid recipe id.");
    }

    const newIngredient = Ingredient.create({
      recipe,
      name: ingrediendInput.name,
      amount: ingrediendInput.amount,
      unit: ingrediendInput.unit,
    });
    recipe.ingredients.push(newIngredient);

    await Recipe.save(recipe);
    return recipe;
  }

  @FieldResolver()
  ingredients(@Root() recipe: Recipe) {
    return Ingredient.find({
      cache: 1000,
      where: { recipe: { id: recipe.id } },
    });
  }

  @FieldResolver()
  ratings(@Root() recipe: Recipe) {
    return Rate.find({
      cache: 1000,
      where: { recipe: { id: recipe.id } },
    });
  }

  @FieldResolver()
  averageRating(@Root() recipe: Recipe) {
    const sum = recipe.ratings.reduce((acc, rate) => acc + rate.value, 0);
    return recipe.ratings.length ? sum / recipe.ratings.length : 0;
  }

}
