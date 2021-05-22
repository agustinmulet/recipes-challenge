import { Field, ID, ObjectType } from "type-graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
} from "typeorm";

import { Ingredient } from "./Ingredient";
import { Rate } from "./Rate";

@Entity()
@ObjectType()
export class Recipe extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => String)
  @Column("text")
  name: string;

  @Field(() => String)
  @Column("text")
  steps: string;

  @Field({ nullable: false })
  averageRating: number;

  // Relations
  @Field(() => [Ingredient])
  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe, {
    eager: true,
    cascade: ["insert"],
  })
  ingredients: Ingredient[];

  @Field(() => [Rate])
  @OneToMany(() => Rate, (rate) => rate.recipe, {
    eager: true,
    cascade: ["insert"],
  })
  ratings: Rate[];
}
