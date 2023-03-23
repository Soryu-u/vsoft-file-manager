import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Folder } from './entities/folder.entity';
import {FilesResolver} from "./resolvers/file.resolver";
import {FilesService} from "./services/file.service";

@Module({
    imports: [TypeOrmModule.forFeature([File, Folder])],
    providers: [FilesResolver, FilesService],
})
export class FilesModule {}
