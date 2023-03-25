import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Folder } from './folder.entity';
import {Field, ID, ObjectType} from "@nestjs/graphql";

@Entity()
@ObjectType()
export class File {
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
    public: boolean;

    @Field()
    @Column()
    parent: number;
}
