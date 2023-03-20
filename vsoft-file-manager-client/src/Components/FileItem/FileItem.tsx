import React from "react";
import styles from "./FileItem.module.css";

function FileItem({item}:any) {
    return (
        <div className={styles.container}>
            {item}
        </div>
    )
}

export default FileItem;