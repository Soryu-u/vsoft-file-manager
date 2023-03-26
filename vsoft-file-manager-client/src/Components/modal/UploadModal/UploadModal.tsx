import React, { useState, useCallback } from "react";
import styles from "./UploadModal.module.css";
import buttons from "../../../App.module.css";
import { useDropzone } from "react-dropzone";
import {UPLOAD_FILE} from "../../../utils/apollo";
import {useMutation} from "@apollo/client";

interface SelectedFile {
    file: File;
}

function UploadModal({setUploadModal, profile}:any) {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [publicFile, setPublicFile] = useState(false);
    const [uploadFile] = useMutation(UPLOAD_FILE);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const newFiles = acceptedFiles.map((file) => (
                {file}
            ));
            setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
        }
    }, [publicFile]);

    const handleRemoveFile = (fileToRemove: File) => {
        setSelectedFiles((prevFiles) =>
            prevFiles.filter((file) => file.file !== fileToRemove)
        );
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    const handleSaveChanges = async () => {
        const formData = new FormData();
        const file = selectedFiles[0].file;
        const author = profile.email;
        const isPublic = publicFile;
        formData.append('file', selectedFiles[0].file);
        formData.append('author', author);
        formData.append('isPublic', isPublic.toString());

        console.log(formData);

        uploadFile({ variables: { file: { value: formData, filename: file.name }, author, isPublic } })
            .then((result) => {
                console.log('File uploaded:', result.data.uploadFile);
            })
            .catch((error) => {
                console.error('File upload failed:', error);
            });
        setSelectedFiles([]);
        setUploadModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>File upload</div>
            <div className={styles.content}>
                <div {...getRootProps()} className={styles.dropzone}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the file here ...</p>
                    ) : (
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    )}
                </div>
                <div className={styles.selectedFiles}>
                    {selectedFiles.map((file, index) => (
                        <div className={styles.selectedFile} key={file.file.name + index}>
                            <span>{file.file.name}</span>
                            <div
                                className={styles.remove}
                                onClick={() => handleRemoveFile(file.file)}
                            >
                                X
                            </div>
                        </div>
                    ))}
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
                    <button className={[buttons.common_btn, buttons.accept_btn].join(' ')} onClick={handleSaveChanges}>Save changes</button>
                    <button className={buttons.common_btn} onClick={() => setUploadModal(false)}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UploadModal;
