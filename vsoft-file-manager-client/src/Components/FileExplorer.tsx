import React, { useState, useEffect } from "react";
import styles from "./FileExplorer.module.css";
import FileItem from "./FileItem/FileItem";
import DeleteModal from "./modal/DeleteModal/DeleteModal";
import EditModal from "./modal/EditModal/EditModal";
import { useQuery, gql } from '@apollo/client';
import UploadModal from "./modal/UploadModal/UploadModal";


const GET_ALL_FILES = gql`
    query GetAllFiles {
        files {
            id
            name
            type
            public
            path
            folder {
                id
                name
            }
        }
    }
`;

export interface File {
    name: string;
    type: string;
    id: string,
}

interface FileExplorerProps {
    datas: File[];
}

function FileExplorer({datas}:FileExplorerProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [folders, setFolders] = useState<File[]>([]);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [uploadModal, setUploadModal] = useState<boolean>(true);
    const [fileId, setFileId] = useState<string>('');

    useEffect(() => {
        return () => {
            let a:any[] = []
            let b:any[] =[]
            datas.filter(el => {
                if (el.type === 'dir') {
                    a.push(el)
                } else {
                    b.push(el)
                }
            })
            setFiles(b)
            setFolders(a)
        };
    }, [datas]);

    function deleteFile(e: any) {
        setFileId(e.target.parentElement.id);
        setDeleteModal(true);
    }

    function editFile(e: any) {
        setFileId(e.target.parentElement.id);
        setEditModal(true);
    }

    function handleFolderClick(item:any) {

    }

    const getCurrentFolderContent = () => {
        return (
            <>
                <div className={styles.path}>
                    <div className={styles.pathItem}>
                        Home
                    </div>
                </div>
                <div>
                    Folders
                    <div className={styles.items}>
                        {folders.map((item:any, index:number) => {
                            return (
                                <div key={index} onClick={() => handleFolderClick(item)}>
                                    <FileItem item={item} deleteFile={deleteFile} editFile={editFile}/>
                                </div>
                            );
                        })}
                        <button>Create</button>
                    </div>
                </div>
                <div>
                    Files
                    <div className={styles.items}>
                        {files.map((item:any, index:number) => {
                            return (
                                <div key={index}>
                                    <FileItem item={item} deleteFile={deleteFile} editFile={editFile}/>
                                </div>
                            );
                        })}
                        <button onClick={() => setUploadModal(true)}>Upload</button>
                    </div>
                </div>


                {
                    deleteModal && <DeleteModal setDeleteModal={setDeleteModal} fileId={fileId}/>
                }
                {
                    editModal && <EditModal setEditModal={setEditModal} fileId={fileId}/>
                }
                {
                    uploadModal && <UploadModal setUploadModal={setUploadModal}/>
                }
            </>
        );
    };

    return getCurrentFolderContent();
}

export default FileExplorer;
