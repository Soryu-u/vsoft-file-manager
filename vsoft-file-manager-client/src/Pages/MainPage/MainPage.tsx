import React, {Dispatch, SetStateAction} from "react";
import styles from "./MainPage.module.css";
import Header from "../../Components/Header/Header";
import {useState} from "react";
import FileExplorer from "../../Components/FileExplorer";
import {IUser} from "../AuthPage/AuthPage";

interface IProfile {
    profile: IUser,
    setProfile: Dispatch<SetStateAction<object | null>>
}

function MainPage({props}:any) {
    const [inputText, setInputText] = useState<string>("");

    const list: any = [
        "zxc",
        "cxz",
        "wer",
    ];

    const displayedList = list.filter((el: string) => {
        if (inputText === "") {
            return el;
        } else {
            return el.toLowerCase().includes(inputText);
        }
    });


    const files = [
        {
            name: "documents",
            type: "dir",
            id: '1'
        },
        {
            name: "file1.pdf",
            type: "file",
            id: '2'
        },
        {
            name: "file2.doc",
            type: "file",
            id: '2'
        },
        {
            name: "photos",
            type: "dir",
            id: '3'
        },
        {
            name: "zxc.mp4",
            type: "video",
            id: '4'
        },
        {
            name: "asuka.jpg",
            type: "image",
            id: '5'
        },
    ];

    return (
        <div>
            <Header setInputText={setInputText} props={props}/>
            <div className={styles.container}>
                <FileExplorer data={files}/>
            </div>
        </div>
    );
}

export default MainPage;