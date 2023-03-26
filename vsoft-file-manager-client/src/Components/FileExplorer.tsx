import React, { useState, useEffect } from "react";
import styles from "./FileExplorer.module.css";
import FileItem from "./FileItem/FileItem";
import DeleteModal from "./modal/DeleteModal/DeleteModal";
import EditModal from "./modal/EditModal/EditModal";
import { useQuery } from '@apollo/client';
import UploadModal from "./modal/UploadModal/UploadModal";
import {GET_ALL_FILES, GET_FOLDERS_ID} from "../utils/apollo";
import CreateFolder from "./modal/CreateItem/CreateFolder";
// @ts-ignore
import plus from "../Images/plus.png";

export interface File {
    name: string;
    type: string;
    id: string,
}

function FileExplorer({profile}:any) {
    const mainId = `0${profile.id}`
    const [files, setFiles] = useState<File[]>([]);
    const [folders, setFolders] = useState<File[]>([]);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const [editModal, setEditModal] = useState<boolean>(false);
    const [uploadModal, setUploadModal] = useState<boolean>(false);
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [fileId, setFileId] = useState<string>('');
    const [parentId, setParentId] = useState(mainId)
    const [path, setPath] = useState([{id: mainId, name: "Home"}]);

    const getFolders = useQuery(GET_FOLDERS_ID, {
        variables: { parent: parentId},
    });
    const getFiles = useQuery(GET_ALL_FILES);

    useEffect(() => {
        if(getFolders.data) {
            setFolders(getFolders.data.foldersId);
        }
        if (getFiles.data) {
            setFiles(getFiles.data.files)
        }
    }, [getFolders, getFiles])

    function deleteFile(e: any) {
        setFileId(e.target.parentElement.id);
        setDeleteModal(true);
    }

    function editFile(e: any) {
        setFileId(e.target.parentElement.id);
        setEditModal(true);
    }

    function handleFolderClick(item:any) {
        setPath([...path, {id: item.id, name: item.name}]);
        setParentId(item.id);
    }
    function handleFileClick(item:any) {
        console.log(item)
    }
    function handlePathClick(id:string) {
        const index = path.findIndex(item => item.id === id);
        if (index !== -1) {
            setPath(path.slice(0, index + 1));
        }
        setParentId(id);
    }

    const getCurrentFolderContent = () => {
        return (
            <>
                <div className={styles.path}>
                    {path.map((item, index) => {
                        return (
                            <div key={index} className={styles.pathItem} onClick={() => handlePathClick(item.id)}>
                                {item.name}/
                            </div>
                        );
                    })}
                </div>
                <div>
                    Folders
                    <div className={styles.items}>
                        {folders.map((item:any, index:number) => {
                            return (
                                <FileItem key={index} item={item} profile={profile} openItem={handleFolderClick} deleteFile={deleteFile} editFile={editFile}/>
                            );
                        })}
                        <img className={styles.addBtn} src={plus} alt={'add new'} onClick={() => setCreateModal(true)}/>
                    </div>
                </div>
                <div>
                    Files
                    <div className={styles.items}>
                        {files.map((item:any, index:number) => {
                            return (
                                    <FileItem key={index} item={item} profile={profile}  openItem={handleFileClick} deleteFile={deleteFile} editFile={editFile}/>
                            );
                        })}
                        <img className={styles.addBtn} src={plus} alt={'add new'} onClick={() => setUploadModal(true)}/>
                    </div>
                </div>


                {
                    deleteModal && <DeleteModal setDeleteModal={setDeleteModal} fileId={fileId} parent={parentId}/>
                }
                {
                    editModal && <EditModal setEditModal={setEditModal} fileId={fileId}/>
                }
                {
                    uploadModal && <UploadModal setUploadModal={setUploadModal} profile={profile}/>
                }
                {
                    createModal && <CreateFolder setCreateModal={setCreateModal} parentId={parentId} profile={profile}/>
                }
            </>
        );
    };

    return getCurrentFolderContent();
}

export default FileExplorer;
