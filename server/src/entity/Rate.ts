import { ObjectType, Field, Int } from "type-graphql";
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  RelationId,
  BaseEntity,
} from "typeorm";

import { Recipe } from "./Recipe";

@Entity()
@ObjectType()
export class Rate extends BaseEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Int)
  @Column("int")
  value: number;

  @Field()
  @CreateDateColumn()
  date: Date;

  // Relations
  @ManyToOne(() => Recipe)
  recipe: Recipe;
  @RelationId((rate: Rate) => rate.recipe)
  recipeId: number;
}
