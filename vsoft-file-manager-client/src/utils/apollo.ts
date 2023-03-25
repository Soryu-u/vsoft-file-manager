import {gql} from "@apollo/client";

export const DELETE_FOLDER = gql`
    mutation deleteFolder($id: Float!) {
        deleteFolder(id: $id)
    }
`;

export const GET_ALL_FILES = gql`
    query GetAllFiles {
        files {
            id
            name
            type
            public
            parent
        }
    }
`;

export const GET_FOLDERS = gql`
    query findAllFolders {
        folders {
            id
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
            name
            type
            parent
        }
    }
`;

export const CREATE_FOLDER = gql`
    mutation CreateFolder($name: String!, $parentId: String) {
        createFolder(name: $name, parentId: $parentId) {
            id
            name
        }
    }
`;
