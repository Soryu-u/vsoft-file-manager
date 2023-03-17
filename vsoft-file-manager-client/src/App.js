import styles from './App.module.css';
import AuthPage from "./Pages/AuthPage/AuthPage.tsx";

function App() {
    const isAuth = false;

    return (
        <>
            {
                isAuth ?
                    <div>
                        zxc
                    </div> :
                    <AuthPage/>
            }
        </>
    );
}

export default App;
