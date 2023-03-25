import React, {useEffect, useState} from "react";
import styles from "./DeleteModal.module.css";
import buttons from "../../../App.module.css";
import {useMutation} from "@apollo/client";
import {DELETE_FOLDER, GET_FOLDERS_ID} from "../../../utils/apollo";

function DeleteModal({setDeleteModal, fileId, parent}:any) {
    const [deleteText, setDeleteText] = useState<string>('');
    const fileType = fileId.split('*')[1];
    const id = Number(fileId.split('*')[0]);
    const [deleteFile] = useMutation(DELETE_FOLDER);

    useEffect(() => {
        return () => {
            setDeleteText(fileType !== 'dir' ? 'delete' : 'delete folder (with all files)');
        };
    }, [fileType]);

    function deleteItem() {
        deleteFile({
            variables: {
                id: id
            },
            refetchQueries: [{ query: GET_FOLDERS_ID, variables: { parent: parent } }],
        })
        setDeleteModal(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Are you sure?
            </div>
            <div className={styles.content}>
                <div>
                    Are you sure you want to <span style={{color:"red"}}>{deleteText}</span> <i>{fileId.split('*')[2]}</i>?
                </div>
                <div className={styles.buttons}>
                    <button className={[buttons.common_btn, buttons.red_btn].join(' ')} onClick={deleteItem}>Yes</button>
                    <button className={buttons.common_btn} onClick={() => setDeleteModal(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
