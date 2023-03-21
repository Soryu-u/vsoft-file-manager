import React from "react";
import styles from "./FileItem.module.css";
// @ts-ignore
import video from "../../Images/video.png";
// @ts-ignore
import file from "../../Images/file.png";
// @ts-ignore
import image from "../../Images/image.png";
// @ts-ignore
import folder from "../../Images/folder.png";
// @ts-ignore
import dots from "../../Images/dots.png";

function FileItem({item}:any) {
    function imageType() {
        if (item.type === 'dir') {
            return folder;
        } else if (item.type === 'file') {
            return file;
        } else if (item.type === 'image') {
            return image;
        } else if (item.type === 'video') {
            return video;
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img className={styles.image} src={imageType()} alt={item.type}/>
                <div>
                    {item.name}
                </div>
                <img className={styles.menu} src={dots} alt={'more'}/>
            </div>
        </div>
    )
}

export default FileItem;