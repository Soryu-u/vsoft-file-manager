import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Any, ILike, Repository} from 'typeorm';
import {File} from "../entities/file.entity";
import {Folder} from "../entities/folder.entity";

@Injectable()
export class FilesService {
    constructor(
        @InjectRepository(File)
        private readonly fileRepository: Repository<File>,
        @InjectRepository(Folder)
        private readonly folderRepository: Repository<Folder>,
    ) {}

    async createFile(file: File): Promise<File> {
        return await this.fileRepository.save(file);
    }

    async createFolder(folder: Folder): Promise<Folder> {
        return await this.folderRepository.save(folder);
    }

    async findAllFiles(): Promise<File[]> {
        return await this.fileRepository.find();
    }

    async findAllFolders(): Promise<Folder[]> {
        return await this.folderRepository.find();
    }
    async findAllFoldersID(parent:string): Promise<Folder[]> {
        return await this.folderRepository.find({where: { parent }});
    }

    async deleteFolder(id: number): Promise<void> {
        const folder = await this.folderRepository.findOne({where: {id}});
        const folderChildren = await this.folderRepository.find({where: {parent: id.toString()}})
        const fileChildren = await this.fileRepository.find({where: {parent: id.toString()}})
        if (!folder) {
            throw new Error(`Folder with id ${id} not found`);
        }
        await Promise.all([
            this.folderRepository.remove(folderChildren),
            this.fileRepository.remove(fileChildren),
        ]);
        await this.folderRepository.remove(folder);
    }
}
