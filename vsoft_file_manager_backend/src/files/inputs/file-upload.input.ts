import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class FileUploadInput {
    @Field(() => String)
    folderName: string;

    @Field(() => Upload)
    file: FileUpload;
}

@ObjectType()
export class File {
    @Field(() => String)
    url: string;
}
