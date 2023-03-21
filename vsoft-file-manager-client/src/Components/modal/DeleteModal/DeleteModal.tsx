import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import styles from "./DeleteModal.module.css";
import buttons from "../../../App.module.css";

function DeleteModal({setDeleteModal, fileId}:any) {
    const [deleteText, setDeleteText] = useState<string>('');
    const fileType = fileId.split('*')[1];
    useEffect(() => {
        return () => {
            setDeleteText(fileType !== 'dir' ? 'delete' : 'delete folder (with all files)');
        };
    }, [fileType]);

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
                    <button className={[buttons.common_btn, buttons.red_btn].join(' ')}>Yes</button>
                    <button className={buttons.common_btn} onClick={() => setDeleteModal(false)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal;
