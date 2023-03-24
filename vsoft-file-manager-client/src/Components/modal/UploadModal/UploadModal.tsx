import React, { useState, useCallback } from "react";
import styles from "./UploadModal.module.css";
import buttons from "../../../App.module.css";
import { useDropzone } from "react-dropzone";
import { GraphQLClient } from 'graphql-request';

interface SelectedFile {
    file: File;
    public: boolean;
}

function UploadModal({setUploadModal}:any) {
    const [selectedFiles, setSelectedFiles] = useState<SelectedFile[]>([]);
    const [publicFile, setPublicFile] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const newFiles = acceptedFiles.map((file) => ({
                file,
                public: publicFile,
            }));
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
        const endpoint = 'http://localhost:5000/graphql'; // ваша адреса сервера GraphQL
        const client = new GraphQLClient(endpoint, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // ваш токен авторизації
            },
        });

        // Створюємо масив об'єктів з вибраними файлами та їх публічністю
        const files = selectedFiles.map((file) => ({
            author: 'email',
            file: file.file,
            public: file.public,
        }));

        // Створюємо GraphQL запит, який відправляє файли на сервер
        const query = `
    mutation UploadFiles($files: [UploadFile!]!) {
      uploadFiles(files: $files) {
        author
        id
        public
      }
    }
  `;

        // Відправляємо запит на сервер
        try {
            const data = await client.request(query, { files });

            // Очищаємо вибрані файли
            setSelectedFiles([]);
        } catch (error) {
            console.error(error);
        }
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
