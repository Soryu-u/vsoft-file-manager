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
        },
        {
            name: "file1.pdf",
            type: "file"
        },
        {
            name: "file2.doc",
            type: "file"
        },
        {
            name: "photos",
            type: "dir",
        },
        {
            name: "zxc.mp4",
            type: "video",
        },
        {
            name: "asuka.jpg",
            type: "image",
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