import * as React from "react";
import styles from "./Header.module.css";
// @ts-ignore
import logo from "../../Images/logo.png";
// @ts-ignore
import SearchBar from "../SearchBar/SearchBar.tsx";
import {Dispatch, SetStateAction} from "react";

interface ISearch {
    setInputText: Dispatch<SetStateAction<string>>
}

function Header({setInputText}:ISearch) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}>
                    <img className={styles.logo_image} src={logo} alt="File Manager"/>
                    <div className={styles.logo_text}>
                        File manager
                    </div>
                </div>
                <div className={styles.user_bar}>
                    zxc@gmail.com
                    <button className={styles.log_out}>Log Out</button>
                </div>
            </div>
            <SearchBar setInputText={setInputText}/>
        </div>
    )
}

export default Header;