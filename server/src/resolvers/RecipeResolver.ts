import {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  ResolverInterface,
  Int,
} from "type-graphql";
import { ILike } from "typeorm";

import { Recipe } from "../entity/Recipe";
import { Rate } from "../entity/Rate";
import { Ingredient } from "../entity/Ingredient";

import { RecipeInput } from "./types/RecipeInput";
import { RateInput } from "./types/RateInput";
import { IngredientInput } from "./types/IngredientInput";
import { calculateAverage } from "../utils";

@Resolver(() => Recipe)
export class RecipeResolver implements ResolverInterface<Recipe> {
  @Query(() => Recipe, { nullable: true })
  recipe(@Arg("recipeId", () => String) recipeId: string) {
    return Recipe.findOne(recipeId);
  }

  @Query(() => [Recipe], { nullable: true })
  async recipes(
    @Arg("order", () => String, { nullable: true }) orderBy: "ASC" | "DESC" | 1 | -1 | undefined,
    @Arg("skip", () => Int, { defaultValue: 0, nullable: true }) skip: number,
    @Arg("take", () => Int, { defaultValue: 100, nullable: true }) take: number,
    @Arg("searchTerm", () => String, { nullable: true }) searchTerm: string
  ) {
    // Set loadEagerRelations by default to load rates
    let options = {
      loadEagerRelations: true,
      where: {},
    };

    if (searchTerm) {
      options = {
        ...options,
        where: {
          ...options.where,
          name: ILike(`%${searchTerm}%`),
        }
      }
    }

    const recipes = await Recipe.find({
      ...options,
    });

    if (orderBy) {
      const sortedRecipes = recipes.map(recipe => ({
        ...recipe,
        averageRating: calculateAverage(recipe),
      })).sort((a, b) =>
        orderBy === "ASC"
          ? a.averageRating - b.averageRating
          : b.averageRating - a.averageRating
      );

      return sortedRecipes.slice(skip, take);
    }

    return recipes;
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
    return calculateAverage(recipe);
  }

}
