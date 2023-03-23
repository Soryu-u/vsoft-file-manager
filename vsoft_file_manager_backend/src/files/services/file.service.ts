import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

    async getFilesInPath(path: string): Promise<[File[], Folder[]]> {
        const files = await this.fileRepository.find({where: {path}});
        const folders = await this.folderRepository.find({where: {path}});
        const res:any = []
        res.push(files);
        res.push(folders);
        return res;
    }

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
}
