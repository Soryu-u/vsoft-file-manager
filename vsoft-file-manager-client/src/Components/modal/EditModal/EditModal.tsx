import React from "react";
import styles from "./EditModal.module.css";
import buttons from "../../../App.module.css";

function EditModal({setEditModal, fileId}:any) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Edit
            </div>
            <div className={styles.content}>
                <div className={styles.input_bar}>
                    Rename
                    <input type={"text"}/>
                </div>
                <div className={styles.buttons}>
                    <button className={[buttons.common_btn, buttons.accept_btn].join(' ')}>Save changes</button>
                    <button className={buttons.common_btn} onClick={() => setEditModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditModal;
