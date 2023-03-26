import {gql} from "@apollo/client";

export const UPLOAD_FILE = gql`
    mutation uploadFile($author: String!, $isPublic: Boolean!, $file: Upload!) {
        uploadFile(author: $author, isPublic: $isPublic, file: $file) {
            id
            filename
            mimetype
            author
            isPublic
            url
        }
    }
`;

export const DELETE_FOLDER = gql`
    mutation deleteFolder($id: Float!) {
        deleteFolder(id: $id)
    }
`;

export const GET_ALL_FILES = gql`
    query GetAllFiles {
        files {
            id
            author
            filename
            mimetype
            isPublic
            parent
        }
    }
`;

export const GET_FOLDERS = gql`
    query findAllFolders {
        folders {
            id
            author
            name
            type
            parent
        }
    }
`;

export const GET_FOLDERS_ID = gql`
    query findAllFoldersID($parent: String!) {
        foldersId(parent: $parent){
            id
            author
            name
            type
            parent
        }
    }
`;

export const CREATE_FOLDER = gql`
    mutation CreateFolder($name: String!, $author: String!, $parentId: String, $isPublic: Boolean!) {
        createFolder(name: $name, author: $author, parentId: $parentId, isPublic: $isPublic) {
            id
            author
            name
            isPublic
        }
    }
`;
