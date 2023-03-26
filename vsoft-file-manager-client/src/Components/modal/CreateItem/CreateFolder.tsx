import React, {useState} from "react";
import styles from "./CreateFolder.module.css";
import buttons from "../../../App.module.css";
import {CREATE_FOLDER, GET_FOLDERS_ID} from "../../../utils/apollo";
import {useMutation} from "@apollo/client";

function CreateFolder({setCreateModal, parentId, profile}:any) {
    const [folderName, setFolderName] = useState<string>('');
    const [publicFile, setPublicFile] = useState(false);
    const [createFolder] = useMutation(CREATE_FOLDER);

    function newFolder() {
        createFolder({
            variables: {
                author: profile.email,
                name: folderName,
                parentId: parentId,
                isPublic: publicFile,
            },
            refetchQueries: [{ query: GET_FOLDERS_ID, variables: { parent: parentId } }],
        }).then(()=> {
            setCreateModal(false);
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                Edit
            </div>
            <div className={styles.content}>
                <div className={styles.input_bar}>
                    Name
                    <input type={"text"} onChange={(e) => setFolderName(e.target.value)}/>
                </div>
                <div className={styles.public}>
                    <input
                        id={"public"}
                        type={"checkbox"}
                        checked={publicFile}
                        onChange={(e) => setPublicFile(e.target.checked)}
                    />
                    <label htmlFor={"public"}>is public</label>
                </div>
                <div className={styles.buttons}>
                    <button className={[buttons.common_btn, buttons.accept_btn].join(' ')} onClick={newFolder   }>Create</button>
                    <button className={buttons.common_btn} onClick={() => setCreateModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default CreateFolder;
