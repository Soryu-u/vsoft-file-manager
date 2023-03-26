import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {Field, ID, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Folder {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    isPublic: boolean;

    @Field()
    @Column()
    parent: string;

    @Field(() => [String], { nullable: true })
    @Column('text', { array: true, nullable: true })
    users?: string[] | null;
}
