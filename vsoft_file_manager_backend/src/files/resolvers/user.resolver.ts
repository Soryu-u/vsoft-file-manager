import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs-extra';
import { join } from 'path';
import {FileUploadInput, File} from "../inputs/file-upload.input";

@Resolver()
export class FileUploadResolver {
    @Mutation(() => File)
    async uploadFile(
        @Args({ name: 'file', type: () => FileUploadInput })
            { folderName, file }: FileUploadInput,
    ): Promise<File> {
        const { createReadStream, filename } = await file.file;

        const stream = createReadStream();
        const id = uuidv4();
        const folderPath = join(__dirname, '..', '..', 'uploads', folderName);
        const filePath = join(folderPath, `${id}-${filename}`);

        await fs.ensureDir(folderPath);
        await stream.pipe(fs.createWriteStream(filePath));

        const fileUrl = `http://localhost:5000/uploads/${folderName}/${id}-${filename}`;

        return { url: fileUrl };
    }
}
