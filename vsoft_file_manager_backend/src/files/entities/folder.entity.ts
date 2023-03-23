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
    path: string;

    @Field(() => Folder)
    @ManyToOne(() => Folder, (folder) => folder.children)
    parent: Folder;

    @Field(() => Folder)
    @OneToMany(() => Folder, (folder) => folder.parent)
    children: Folder[];

    @Field(() => File)
    @OneToMany(() => File, (file) => file.folder)
    files: File[];
}
