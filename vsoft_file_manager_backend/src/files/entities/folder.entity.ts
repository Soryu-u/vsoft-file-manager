import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { File } from './file.entity';
import {Field, ID, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class Folder {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column()
    type: string;

    @Field()
    @Column()
    parent: string;
}
