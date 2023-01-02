import { useRouter } from 'next/router';
import { LeftBar } from '../../components/LeftBar';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
const jwt = require('jwt-simple');
import { Perfil } from '../../components/Perfil';
import Link from 'next/link';
import axios from 'axios';
import {ModalViewActividad} from '../../components/Parvulos/viewActividad';
import{ModalViewApoderado} from '../../components/Parvulos/viewApoderado';



export default function Parvulo() {
    const router = useRouter();
    const [parvulo, setParvulo] = useState("");
    const[dataParvulo,setDataParvulo] = useState({})
    const [showModalViewActividad,setShowModalViewActividad] = useState(false);
    const [showModalViewApoderado,setShowModalViewApoderado] = useState(false);


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
    
    const getFoto =(id) => {
        const pic = id ? `${process.env.API_URL}/file/download/${id}` : "";
        return (
            <img
                src={pic}
                alt="foto"
                className="rounded-circle"
                width="50"
                height="50"
            />

        );
    };


    return (
        <>
          <div className="fixed top-0 left-0 w-screen h-screen" >
          <div className="bg-white border-black border-b-2 p-6 shadow shadow-slate-900">
                    <div className="">
                        <h1 className="flex m-4 p-2 text-5xl font-bold ">Parvulos</h1>
                    </div >
                </div>
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
                    <div className="modal-content flex flex-col justify-center items-center m-5 space-y-3">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel justify-center font-bold">Parvulo : {dataParvulo.nombre}</h5>
                        </div>
                        <div className=" w-full flex flex-col space-y-3">
                            <div className="flex flex-row justify-center items-center space-x-3">
                                <td>{getFoto(dataParvulo.foto)}</td>
                            </div>

                            <table className="formAsistente m-2 mt-0  flex flex-col " >
                                <label className="">Nombre</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataParvulo.nombre}</td>
                                <label className="form-label">Apoderado</label>
                                <td type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                >{dataParvulo.apoderado}</td>

                                <label className="form-label">Rut</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataParvulo.rut}</td>
                                <label className="form-label">Fecha de Nacimiento</label>
                                <tb type="date"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataParvulo.fechaNacimiento}</tb> 
                                <label className="form-label">Direccion</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataParvulo.direccion}</td>

                                <label  className="form-label">Telefono Emergencia</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataParvulo.telefonoEmergencia}</td>

                                <label >Condiciones Medicas</label>
                                <td type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                > {dataParvulo.condicionesMedicas}</td>
                            </table>
                                <div className="modal-footer">
                                    <Link href="/parvulos">
                                    <button type="button" className="btn btn-secondary bg-red-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" 
                                    data-bs-dismiss="modal">Volver</button>
                                    </Link>
                                    
                                    <button  onClick={()=>setShowModalViewActividad(true)}
                                    className="btn btn-primary bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900">
                                    Ver acticvidades</button>

                                    <button 
                                    className="btn btn-primary bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900"
                                    onClick={()=>setShowModalViewApoderado(true) }>
                                    Ver apoderado
                                    </button>
                                </div>
                          
                        </div>
                    </div>
                </div>
                <LeftBar/>
                <Perfil/>
            </div>
            {showModalViewActividad && <ModalViewActividad parvulo={parvulo} setShowModalViewActividad={setShowModalViewActividad} dataParvulo={dataParvulo}/>}
            {showModalViewApoderado && <ModalViewApoderado dataParvulo={dataParvulo} setShowModalViewApoderado={setShowModalViewApoderado}/>}
        </>
    )


}