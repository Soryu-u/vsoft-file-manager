import * as React from "react";
import {useEffect, useState} from "react";
import styles from "./AuthPage.module.css";
import {useGoogleLogin} from "@react-oauth/google";
import axios from "axios";

export interface IUser {
    email?: string,
    family_name?: string,
    given_name?: string,
    id?: string,
    locale?: string,
    name?: string,
    picture?: string,
    verified_email?: boolean,
    access_token?: string
}

function AuthPage({setProfile}:any) {
    const [user, setUser] = useState<IUser>();

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
            id
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
                        createUser(res.data.email)
                            .then((res) =>
                                setProfile(res)
                            )
                            .catch((e) => console.log(e));
                    })
                    .catch((err) => console.log(err));
            }
        },
        [setProfile, user]
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                    <div>
                        <h1>Login with Google</h1>
                        <button onClick={() => login()}>login</button>
                    </div>
            </div>
        </div>
    );
}

export default AuthPage;