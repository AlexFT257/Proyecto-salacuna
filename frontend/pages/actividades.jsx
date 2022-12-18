import { LeftBar } from "../components/LeftBar";
import {Perfil} from "../components/Perfil"
import {Footer} from "../components/Footer"
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import { checkToken } from "../data/user";
import {ActividadesTable} from "../components/ActividadesTable"

export const Actividades = ({ props }) => {
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
            <ActividadesTable props={props}/>
            <Perfil/>
            
            <Footer/>  
        </div>
    );
}

const getServerSideProps = async () => {
    try {
        const res = await fetch(`${process.env.API_URL}/actividades`);
        const data = await res.json();
        return {
            props: {
                data: data,
            },
        };
    } catch (error) {
        return {
            props: {
                data: [],
            },
        };
    }
};

export default Actividades;