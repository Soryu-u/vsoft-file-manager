import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { join } from 'path';
import {FilesService} from "../services/file.service";
import {Folder} from "../entities/folder.entity";
import {File} from "../entities/file.entity";
import * as mime from 'mime-types';


@Resolver()
export class FilesResolver {
    constructor(private readonly filesService: FilesService) {}

    @Query(() => [File])
    async files(): Promise<File[]> {
        return this.filesService.findAllFiles();
    }

    @Query(() => [Folder])
    async folders(): Promise<Folder[]> {
        return this.filesService.findAllFolders();
    }
    @Query(() => [Folder])
    async foldersId(
        @Args('parent') parent:string,
    ): Promise<Folder[]> {
        return this.filesService.findAllFoldersID(parent);
    }
    @Mutation(() => File)
    async uploadFile(
        @Args('author') author: string,
        @Args('isPublic') isPublic: boolean,
        @Args({ name: 'file', type: () => GraphQLUpload })
            { createReadStream, filename }: FileUpload,
    ): Promise<File> {
        console.log('zxc')
        const writeStream = createWriteStream(join(__dirname, '..', 'uploads', filename));

        createReadStream()
            .pipe(writeStream)
            .on('finish', () => console.log(`Файл ${filename} успішно завантажено`))
            .on('error', () => console.log(`Сталася помилка при завантаженні файлу ${filename}`));

        const file = new File();
        file.author = author;
        file.isPublic = isPublic;
        file.filename = filename;
        file.mimetype = mime.lookup(filename);
        file.path = join(__dirname, '..', 'uploads', filename);

        return this.filesService.createFile(file);
    }


    @Mutation(() => Folder)
    async createFolder(
        @Args('name') name: string,
        @Args('author') author: string,
        @Args('isPublic') isPublic: boolean,
        @Args('parentId', { nullable: true }) parentId?: string,
    ): Promise<Folder> {
        const folder = new Folder();
        folder.name = name;
        folder.author = author;
        folder.type = "dir";
        folder.isPublic = isPublic;
        folder.parent = parentId;
        return this.filesService.createFolder(folder);
    }

    @Mutation(() => Boolean)
    async deleteFolder(@Args('id') id: number): Promise<boolean> {
        await this.filesService.deleteFolder(id);
        return true;
    }

}
