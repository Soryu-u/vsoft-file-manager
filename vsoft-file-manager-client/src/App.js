import React, {useState} from "react";
import AuthPage from "./Pages/AuthPage/AuthPage.tsx";
import MainPage from "./Pages/MainPage/MainPage.tsx";
import styles from "./App.module.css";

function App() {
    const [profile, setProfile] = useState();
    const isAuth = !!profile;

    return (
        <div className={styles.main}>
            {
                isAuth ? <MainPage props={{profile, setProfile}}/> : <AuthPage setProfile={setProfile}/>
            }
        </div>
    );
}

export default App;
