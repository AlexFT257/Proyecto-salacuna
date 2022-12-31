import { useRouter } from 'next/router';
import { LeftBar } from '../../components/LeftBar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const jwt = require('jwt-simple');
import { Perfil } from '../../components/Perfil';
import Link from 'next/link';
import axios from 'axios';

export default function Parvulo() {
    const router = useRouter();
    const [parvulo, setParvulo] = useState("");
    const[dataParvulo,setDataParvulo] = useState({})
    
    useEffect(() => {
            setParvulo(router.query.parvulo);
    }, [router.query.parvulo]);

    useEffect(()=>{
            const getParvulo = async () => {
                const token = Cookies.get("token");
                const payload = jwt.decode(token, process.env.SECRET_KEY,true);
                const response = await axios.get(`${process.env.API_URL}/parvulo/search/${parvulo}`,
                {
                    headers: { "X-Caller-Id": payload.sub},
                });
                const data= await response.data;
                if (response.status === 200) {
                    setDataParvulo(data);
                }else{
                    router.push("/parvulos");
                }
            };
            if(parvulo){
                getParvulo();
            }
    
    },[parvulo]);

    return (
        <>
            <div className="flex max-sm:flex-col h-screen w-screen">
                <LeftBar />
                {/* header*/ }
                <div className="w-screen">
                    <div className="bg-white border-black border-b-2 p-6 shadow shadow-slate-900">
                        <div className="flex m-4 p-2 ">
                         <h1 className='text-5xl font-bold'>{dataParvulo.nombre}</h1>
                        </div>
                        <div>
                            <Link href="/parvulos">
                            <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300">Volver</button>
                            </Link>
                        </div>
                    </div>
                      {/* body*/ }
                      <div className='w-full h-full '>
                            <div className='flex flex-col w-full h-full p-8 bg-black rounded-lg shadow-xl'>
                            
                            </div>

                        </div>
                </div>
                <Perfil/>
            </div>
        </>
    )


}