import { useRouter } from 'next/router';
import { LeftBar } from '../../components/LeftBar';
import { useState, useEffect } from 'react';
import { Perfil } from '../../components/Perfil';
import Link from 'next/link';
import axios from 'axios';

export default function Actividad() {
    const router = useRouter();

    const [actividadData, setActividadData] = useState({});
    const [seccion, setSeccion] = useState('');
      
    const getActividad = async () => {        
        const res = await axios.get(`${process.env.API_URL}/actividad/search/${router.query.actividad}`);
        const data = res.data;
        if(res.status === 200)
        {
        setActividadData(data);
        }
    }

    useEffect(() => {
        getActividad();
    }, []);

    const picture = (id, type) => {
        const pic = id ? `${process.env.API_URL}/file/download/${id}` : "";
        if(type==='parvulo')
        {
            return (
                <img src={pic} alt=
                "Sin Foto" className='text-xs w-10 h-10 rounded-full border-2 border-black' />
            );
        }
        else if(type==='actividad')
        {
            return (
                <img src={pic} alt="
                Sin Foto" className='text-xs' />
            );
        }else if(type==='responsable')
        {
            return (
                <img src={pic} alt="
                Sin Foto" className='text-xs h-36 w-36 rounded-2xl border-2 border-black justify-self-center' />
            );
        }
        
    }


    const switchRender = (value) => {
        switch (value) {
            case 'info':
                const fecha = new Date(actividadData.fecha).toLocaleDateString();
                //content for info section 
                return (
                    <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
                        <div className="flex flex-row">
                            <h1 className="text-3xl font-bold">Informacion</h1>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-xl">Fecha: {fecha}</p>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-xl">Descripcion: {actividadData.descripcion}</p>
                        </div>
                    </div>
                );
            case 'parvulos':
                //content for parvulos section use the same table as in actividades page and add a button to add parvulos
                if (!actividadData.parvulos || actividadData.parvulos.length === 0) {
                    return (
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h1 className="text-3xl font-bold">Parvulos</h1>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-xl">No hay parvulos registrados en esta actividad</p>
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h1 className="text-3xl font-bold">Parvulos</h1>
                            </div>
                            <table className="w-full table-auto">
                                <thead>
                                    <tr className='text-left'>
                                        <th>Foto</th>
                                        <th>Nombre</th>
                                        <th>Rut</th>
                                        <th>Edad</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        actividadData.parvulos.map((parvulo) => {
                                        
                                        const edad = new Date().getFullYear() - new Date(parvulo.fechaNacimiento).getFullYear();
                                        return (
                                        <tr>
                                            <td> {picture(parvulo.foto, 'parvulo')} </td>
                                            <td>{parvulo.nombre}</td>
                                            <td>{parvulo.rut}</td>
                                            <td>{edad}</td>
                                        </tr>
                                        )
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>

                );
            case 'responsable':	
                if(!actividadData.responsable){
                    return (
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <h1 className="text-3xl font-bold">Responsable</h1>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-xl">No hay responsable asignado</p>
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
                        <div className="flex flex-row">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold">Responsable</h1>
                                <div className="flex flex-row">
                                <div className="flex flex-col">                                
                                    <p className="text-xl">Nombre: {actividadData.responsable.nombre}</p>
                                    <p className="text-xl">Rut: {actividadData.responsable.rut}</p>
                                </div>
                                </div>
                            </div>
                            <div className="flex-1 justify-items-center">
                                {picture(actividadData.responsable.foto, 'responsable')}
                            </div>
                        </div>

                    </div>
                );
            default:
                return (
                    <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
                        <div className="flex flex-row">
                            <h1 className="text-3xl font-bold">Informacion</h1>
                        </div>
                        <div className="flex flex-row">
                            <p className="text-xl">Fecha: {actividadData.fecha}</p>
                        </div>  
                        <div className="flex flex-row">
                            <p className="text-xl">Descripcion: {actividadData.descripcion}</p>
                        </div>
                    </div>

                );
        }
    }



    return (
        <div className="flex max-sm:flex-col h-screen w-screen ">
            
            <LeftBar/>
            <div className="w-screen">
                {/* title */}
                <div className="bg-white border-black border-b-2 p-6 shadow shadow-slate-900">
                    <div className="flex m-4 p-2 ">
                        <h1 className="text-5xl font-bold">Actividad: {actividadData.titulo}</h1>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/actividades">
                            <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300">Regresar Actividades</button>
                        </Link>
                    </div>
                </div>
               {/*Left tab bar with thre buttons(Info, Parvulos, Responsable) and the right side is the content of the button selected use the switchRender function to render the content*/}
                <div className="w-full h-full xl:w-3/4 xl:mx-auto">
                    <div className="flex flex-row space-x-4 mx-4">
                        <div className="flex flex-col w-1/4 space-y-4 my-4">
                            <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300" onClick={() => setSeccion('info')}>Informacion</button>
                            <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300" onClick={() => setSeccion('parvulos')}>Parvulos</button>
                            <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300" onClick={() => setSeccion('responsable')}>Responsable</button>
                        </div>                        
                        <div className="flex flex-col w-3/4 my-4">
                            {switchRender(seccion)}
                        </div>
                    </div>
                    <div className="flex flex-row mx-4 h-auto">
                        <div  className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full w-full">
                            {picture(actividadData.foto, 'actividad')}
                        </div>
                    </div>
                </div>

               
            </div>
            

            <Perfil/>
            
        </div>
    );
}




