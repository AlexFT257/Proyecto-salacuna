import { LeftBar } from "../../components/LeftBar";
import {Perfil} from "../../components/Perfil"
import {Footer} from "../../components/Footer"
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import { checkToken } from "../../data/user";
import {ActividadesTable} from "../../components/Actividades/ActividadesTable"
import axios from "axios";
import Head from "next/head";

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
        <div className="flex max-sm:flex-col h-full w-full ">
            <Head>
                <title>Actividades</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <LeftBar/>
            <div className="w-full">
                {/* title */}
                <div className="bg-white border-black border-b-2 p-4 shadow shadow-slate-900">
                    <h1 className="text-5xl font-bold my-4">Actividades</h1>
                </div>
                <ActividadesTable props={props}/>
            </div>
            <Perfil/>
            
        </div>
    );
}

export async function getServerSideProps(context) {
    const res = await axios.get(`${process.env.API_URL}/actividades`);
    const data = await res.data;
    return {
        props: {
            props: data
        },
    };
}

export default Actividades;