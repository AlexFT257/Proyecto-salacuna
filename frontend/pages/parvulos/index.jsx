import { LeftBar } from "../../components/LeftBar";
import {Perfil} from "../../components/Perfil"
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import { checkToken } from "../../data/user";
import ListarParvulos from "../../components/Parvulos/ListarParvulos";


export const Parvulos = () => {
    const router = useRouter();
    useEffect(() => {
        const token = cookie.get("token");
        console.log(token);
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
            <ListarParvulos/>
            <Perfil/>
        </div>
    );

};

export default Parvulos;