import * as React from "react";
// @ts-ignore
import styles from "./AuthPage.module.css";
import {GoogleLogin, googleLogout, useGoogleLogin} from "@react-oauth/google";
import {useEffect, useState} from "react";
import axios from "axios";

function AuthPage(){
    const [ user, setUser ] = useState<any>();
    const [ profile, setProfile ] = useState<any>();

    const login = useGoogleLogin({
        onSuccess: (codeResponse: any) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    useEffect(
        () => {
            if (user) {
                axios
                    .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);
                    })
                    .catch((err) => console.log(err));
            }
        },
        [ user ]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                {profile ?
                <div>
                    <img src={profile.picture} alt="user image" />
                    <h3>User Logged in</h3>
                    <p>Name: {profile.name}</p>
                    <p>Email Address: {profile.email}</p>
                    <br />
                    <br />
                    <button onClick={logOut}>Log out</button>
                </div> :
                <div>
                    <h1>Login with Google</h1>
                    <GoogleLogin onSuccess={(codeResponse: any) => setUser(codeResponse)}/>
                </div>}
            </div>
        </div>
    );
};

export default AuthPage;