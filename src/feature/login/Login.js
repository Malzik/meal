import React from "react";
import {Input} from "./Input";
import {FaLock, FaUser} from "react-icons/fa";
import { useHistory } from "react-router-dom";

export const Login = () => {
    let history = useHistory()


    const submit = () => {
        history.push('/mobile')
    }

    return (
        <div className={"flex flex-col align-middle justify-center h-[80vh]"}>
            <div className={"mx-4 mb-6"}>
                <img src={"meal-exis.png"} alt={"Logo"} className={"rounded-full"}/>
            </div>
            <div className={"mx-2"}>
                <Input type={"text"} name={"username"} placeholder={"Nom d'utilisateur"} icon={(<FaUser />)}/>
                <Input type={"password"} name={"password"} placeholder={"Mot de passe"} icon={(<FaLock />)}/>
                <button className={"text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 " +
                    "font-medium rounded-lg px-5 py-2.5 text-center mr-2 mb-2 w-full"} onClick={() => submit()} >Connexion</button>
            </div>
        </div>
    )
}