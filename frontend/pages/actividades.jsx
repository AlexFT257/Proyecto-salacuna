import { LeftBar } from "../components/LeftBar";
import {Perfil} from "../components/Perfil"
import {Footer} from "../components/Footer"
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import { checkToken } from "../data/user";
import {ActividadesTable} from "../components/Actividades/ActividadesTable"
import axios from "axios";

export const Actividades = ({props}) => {
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
        <div className="flex max-sm:flex-col h-screen w-screen ">
        
            <LeftBar/>
            <ActividadesTable props={props}/>
            <Perfil/>
            
        </div>
    );
}

export async function getServerSideProps(context) {
    const res = await axios.get(`${process.env.API_URL}/actividades`);
    const data = await res.data;
    return {
        props: {
            props: data,
        },
    };
}

export default Actividades;