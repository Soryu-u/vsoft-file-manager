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

    async createFile(file: File): Promise<File> {
        return this.fileRepository.save(file);
    }

    async createFolder(folder: Folder): Promise<Folder> {
        return this.folderRepository.save(folder);
    }

    async findAllFiles(): Promise<File[]> {
        return this.fileRepository.find();
    }

    async findAllFolders(): Promise<Folder[]> {
        return this.folderRepository.find();
    }
}
