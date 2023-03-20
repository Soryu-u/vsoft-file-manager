import * as React from "react";
import styles from "./MainPage.module.css";
// @ts-ignore
import Header from "../../Components/Header/Header.tsx";
import {useState} from "react";
// @ts-ignore
import FileItem from "../../Components/FileItem/FileItem.tsx";

function MainPage() {
    const [inputText, setInputText] = useState<string>('');

    const list:any = [
        'zxc', 'cxz', 'wer', 'lol', 'sfsdfsdfdsfs', 'dfd', 'sfddf', 'wrwerw',
        'erterter', 'lortr', 'bvss', 'jgjgjg', '[[p[p[p', 'eers',
        'ereqqqq', 'qqweqew', 'weqweqwe', 'qweqweqweqwe', 'yryryryryry'
    ];

    const displayedList = list.filter((el:string) => {
        if (inputText === '') {
            return el;
        } else {
            return el.toLowerCase().includes(inputText);
        }
    })

    return (
        <div>
            <Header setInputText={setInputText} />
            <div className={styles.container}>
                {
                    displayedList.map((li:any, index:number) => (
                        <FileItem key={index} item={li}/>
                    ))
                }
            </div>
        </div>
    )

}

export default MainPage;