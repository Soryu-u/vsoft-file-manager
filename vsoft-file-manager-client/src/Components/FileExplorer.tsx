import React, { useState, useEffect } from "react";
import styles from "./FileExplorer.module.css";
import FileItem from "./FileItem/FileItem";
import DeleteModal from "./modal/DeleteModal/DeleteModal";
import EditModal from "./modal/EditModal/EditModal";

export interface File {
    name: string;
    type: string;
    id: string,
}

interface FileExplorerProps {
    data: File[];
}

function FileExplorer({data}:FileExplorerProps) {
    const [files, setFiles] = useState<File[]>([]);
    const [folders, setFolders] = useState<File[]>([]);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [fileId, setFileId] = useState<string>('');

    useEffect(() => {
        return () => {
            let a:any[] = []
            let b:any[] =[]
            data.filter(el => {
                if (el.type === 'dir') {
                    a.push(el)
                } else {
                    b.push(el)
                }
            })
            setFiles(b)
            setFolders(a)
        };
    }, [data]);

    function deleteFile(e: any) {
        setFileId(e.target.id);
        setDeleteModal(true);
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
                                    <FileItem item={item} deleteFile={deleteFile}/>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div>
                    Files
                    <div className={styles.items}>
                        {files.map((item:any, index:number) => {
                            return (
                                <div key={index}>
                                    <FileItem item={item} deleteFile={deleteFile}/>
                                </div>
                            );
                        })}
                    </div>
                </div>


                {
                    deleteModal && <DeleteModal setDeleteModal={setDeleteModal} fileId={fileId}/>
                }
            </>
        );
    };

    return getCurrentFolderContent();
}

export default FileExplorer;