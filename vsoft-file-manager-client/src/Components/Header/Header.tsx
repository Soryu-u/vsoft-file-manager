import * as React from "react";
// @ts-ignore
import styles from "./Header.module.css";
// @ts-ignore
import logo from "../../Images/logo.png";

function Header() {
    return (
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
    )
}

export default Header;