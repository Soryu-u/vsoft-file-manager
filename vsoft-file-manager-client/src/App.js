import AuthPage from "./Pages/AuthPage/AuthPage.tsx";
import MainPage from "./Pages/MainPage/MainPage.tsx";
import styles from "./App.module.css";

function App() {
    const isAuth = true;

    return (
        <div className={styles.main}>
            {
                isAuth ? <MainPage/> : <AuthPage/>
            }
        </div>
    );
}

export default App;
