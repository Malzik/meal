import React, {useState, useEffect} from "react";
import {Input} from "./Input";
import {FaLock, FaUser} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import {authApi} from "../../service/auth";
import jwt_decode from 'jwt-decode'
import { useCookies }               from "react-cookie";

export const Login = () => {
    let history = useHistory()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [cookie, setCookie, removeCookie] = useCookies(['user'])
    const [error, setError] = useState(null)


    useEffect(() => {
        if(cookie.token !== undefined){
            const decodedToken = jwt_decode(cookie.token)
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                logout();
                return
            }
            history.push('/mobile')
        }
    }, [])

    const logout = () => {
        removeCookie("refreshToken", {path: "/"})
        removeCookie("token", {path: "/"})
        removeCookie("user", {path: "/"})
    }

    const submit = () => {
        if (username.length < 3) {
            setError("Username is required")
            return;
        }
        if (password.length === 0) {
            setError("Password is required")
            return;
        }
        authApi
            .login(username, password)
            .then(user => {
                setTimeout(() => {
                    setCookie("refreshToken", user.refreshToken, {path: "/"})
                    setCookie("token", user.accessToken, {path: "/"})
                    setCookie("user", user, {path: "/"})
                }, 150)
                history.push('/mobile')
            })
            .catch(err => {
                setError(err.message)
            })
    }

    return (
        <div className={"flex flex-col align-middle justify-center h-[80vh]"}>
            <div className={"mx-4 mb-6"}>
                <img src={"meal-exis.png"} alt={"Logo"} className={"rounded-full"}/>
            </div>
            <div className={"mx-2"}>
                {error !== null ? (<div><span className={"text-red-700"}>{error}</span></div>) : null}
                <Input type={"text"} name={"username"} value={username} onChange={setUsername} placeholder={"Nom d'utilisateur"} icon={(<FaUser />)}/>
                <Input type={"password"} name={"password"} value={password} onChange={setPassword} placeholder={"Mot de passe"} icon={(<FaLock />)}/>
                <button className={"text-white bg-[#58a4b0] hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 " +
                    "font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 w-full"} onClick={() => submit()} >Connexion</button>
            </div>
        </div>
    )
}
