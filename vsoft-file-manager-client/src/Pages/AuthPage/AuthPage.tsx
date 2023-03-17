import * as React from "react";
import {useEffect, useState} from "react";
// @ts-ignore
import styles from "./AuthPage.module.css";
import {googleLogout, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import instance from "../../utils/axios";

interface IUser {
    name: string,
    email: string,
    picture: string
}

function AuthPage() {
    const [user, setUser] = useState<any>();
    const [profile, setProfile] = useState<any>();

    const login = useGoogleLogin({
        onSuccess: (codeResponse: object) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error)
    });

    const createUser = async (email:string) => {
        try {
            const response = await axios.post('http://localhost:5000/graphql', {
                query: `
        mutation {
          createUser(createUser: {email: "${email}"}) {
            email
          }
        }
      `,
            });

            if (response.data.data.token) {
                window.localStorage.setItem('token', response.data.data.token)
            }
            return response.data.data.createUser;
        } catch (error) {
            console.error(error);
        }
    };

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
                        createUser(res.data.email)
                            .then(r => console.log(r))
                            .catch((e) => console.log(e));
                    })
                    .catch((err) => console.log(err));
            }
        },
        [user]
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
                        <img src={profile.picture} alt="user image"/>
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br/>
                        <br/>
                        <button onClick={logOut}>Log out</button>
                    </div> :
                    <div>
                        <h1>Login with Google</h1>
                        <button onClick={() => login()}>login</button>
                    </div>}
            </div>
        </div>
    );
}

export default AuthPage;