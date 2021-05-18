import { Field, Float, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  RelationId,
  BaseEntity,
} from "typeorm";

import { Recipe } from "./Recipe";

@Entity()
@ObjectType()
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column("text")
  name: string;

  @Field(() => Float)
  @Column("float")
  amount: number;

  // Relations
  @ManyToOne(() => Recipe)
  recipe: Recipe;
  @RelationId((ingredient: Ingredient) => ingredient.recipe)
  recipeId: number;
}
