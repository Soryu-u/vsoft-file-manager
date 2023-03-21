import * as React from "react";
import styles from "./Header.module.css";
// @ts-ignore
import logo from "../../Images/logo.png";
// @ts-ignore
import logout from "../../Images/logout.png";
import SearchBar from "../SearchBar/SearchBar";
import {Dispatch, SetStateAction, useState} from "react";
import {googleLogout} from "@react-oauth/google";
import {IUser} from "../../Pages/AuthPage/AuthPage";

interface ISearch {
    setInputText: Dispatch<SetStateAction<string>>,
    props: {
        profile: IUser,
        setProfile: Dispatch<SetStateAction<object | null>>
    },
}

function Header({setInputText, props}:ISearch) {
    const [isOpen, setIsOpen] = useState(false);
    const logOut = () => {
        googleLogout();
        props.setProfile(null);
    };

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
                    <div className={styles.log_out} onClick={ ()=> setIsOpen(!isOpen) }>
                        {props.profile.email}
                        <img className={styles.log_outImage} style={isOpen ? {rotate: '180deg'} : {}} src={logout} alt='logout'/>
                    </div>
                    {
                        isOpen && <div className={styles.modal} onClick={logOut}>
                            Log Out
                        </div>
                    }
                </div>
            </div>
            <SearchBar setInputText={setInputText}/>
        </div>
    )
}

export default Header;
