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

    // const displayedList = list.filter((el: string) => {
    //     if (inputText === "") {
    //         return el;
    //     } else {
    //         return el.toLowerCase().includes(inputText);
    //     }
    // });

    return (
        <div>
            <Header setInputText={setInputText} props={props}/>
            <div className={styles.container}>
                <FileExplorer profile={props.profile}/>
            </div>
        </div>
    );
}

export default MainPage;