import { LeftBar } from "../components/LeftBar";
import {Perfil} from "../components/Perfil"
import {Footer} from "../components/Footer"
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import { checkToken } from "../data/user";
import axios from "axios";
import ListarParvulos from "../components/listarparvulos";
import { parvulos } from "../components/parvulos";

export const Parvulos = ({props}) => {
    const router = useRouter();
    useEffect(() => {
        const token = cookie.get("token");
        if (!token || token === "undefined") {
        router.push("/login");
        }
    }, []);

    if(checkToken() === false){
        router.push("/login");
    }
    
    return (
        <div className="flex max-sm:flex-col  h-screen w-screen ">
        
            <LeftBar/>
            <ListarParvulos props={props}/>
            <Perfil/>
        </div>
    );
}


export default Parvulos;