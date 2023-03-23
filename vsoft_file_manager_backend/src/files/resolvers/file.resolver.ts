import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { join } from 'path';
import {FilesService} from "../services/file.service";
import {Folder} from "../entities/folder.entity";
import {File} from "../entities/file.entity";

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

    @Mutation(() => File)
    async uploadFile(
        @Args({ name: 'file', type: () => GraphQLUpload })
            { createReadStream, filename }: FileUpload,
        @Args('folderId', { nullable: true }) folderId?: number,
        @Args('public') isPublic: boolean = true,
    ): Promise<File> {
        const stream = createReadStream();
        const path = join(__dirname, '..', 'uploads', filename);
        return new Promise((resolve, reject) =>
            stream
                .pipe(createWriteStream(path))
                .on('finish', () => {
                    const file = new File();
                    file.name = filename;
                    file.type = 'image/jpeg';
                    file.public = isPublic;
                    file.path = path;
                    if (folderId) {
                        file.folder = { id: folderId } as Folder;
                    }
                    resolve(this.filesService.createFile(file));
                })
                .on('error', reject),
        );
    }

    @Mutation(() => Folder)
    async createFolder(
        @Args('name') name: string,
        @Args('parentId', { nullable: true }) parentId?: number,
    ): Promise<Folder> {
        const folder = new Folder();
        folder.name = name;
        if (parentId) {
            folder.parent = { id: parentId } as Folder;
        }
        return this.filesService.createFolder(folder);
    }
}
