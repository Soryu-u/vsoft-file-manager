import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import {Field, ID, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class File {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    filename: string;

    @Field()
    @Column()
    mimetype: string;

    @Field()
    @Column()
    encoding: string;

    @Field()
    @Column()
    url: string;

    @Field()
    @Column()
    author: string;

    @Field()
    @Column()
    isPublic: boolean;

    @Field()
    @Column()
    parent: string;

    @Field()
    @Column()
    path: string;

    @Field(() => [String], { nullable: true })
    @Column('text', { array: true, nullable: true })
    users?: string[] | null;

}
