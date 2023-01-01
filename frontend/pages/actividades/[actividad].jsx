import { useRouter } from 'next/router';
import { LeftBar } from '../../components/LeftBar';
import { useState, useEffect } from 'react';
import { Perfil } from '../../components/Perfil';
import Link from 'next/link';
import axios from 'axios';
import { ModalUpdateInfo } from '../../components/Actividades/ModalUpdateInfo';	
import { ModalUpdateParvulos } from '../../components/Actividades/ModalUpdateParvulos';
import { ModalUpdateResponsable } from '../../components/Actividades/ModalUpdateResponsable';
import { UploadFotoSection } from '../../components/Actividades/UploadFotoSection';

export default function Actividad() {
    const router = useRouter();
    const [actividad, setActividad] = useState('');
    const [actividadData, setActividadData] = useState({});
    const [seccion, setSeccion] = useState('');
    
    const [showModalUpdateInfo, setShowModalUpdateInfo] = useState(false);
    const [showModalUpdateParvulos, setShowModalUpdateParvulos] = useState(false);
    const [showModalUpdateResponsable, setShowModalUpdateResponsable] = useState(false);
    const [showUploadFotoSection, setShowUploadFotoSection] = useState(false);

    useEffect(() => {
        setActividad(router.query.actividad);
    }, [router.query.actividad]);

    useEffect(() => {
        const getActividad = async () => {
            const res = await axios.get(`${process.env.API_URL}/actividad/search/${actividad}`);
            const data = await res.data;
            if(res.status === 200){
                setActividadData(data);
            }
        };
        if(actividad){
            getActividad();
        }
    }, [actividad]);

    const picture = (id, type) => {
        const pic = id ? `${process.env.API_URL}/file/download/${id}` : "";
        if(type==='parvulo')
        {
            return (
                <img src={pic} alt=
                "Foto Parvulo" className='text-xs w-10 h-10 rounded-full border-2 border-black' />
            );
        }
        else if(type==='actividad')
        {
            return (
                <img src={pic} alt="
                Foto Actividad" className='text-xs rounded-2xl border-2 border-black shadow-md shadow-slate-900 max-w-xl h-auto' />
            );
        }else if(type==='responsable')
        {
            return (
                <img src={pic} alt="
                Foto Responsable" className='text-xs h-36 w-36 rounded-2xl border-2 border-black justify-self-center' />
            );
        }
        
    }


    const switchRender = (value) => {
        const fecha = new Date(actividadData.fecha).toLocaleDateString();
        switch (value) {
            case 'info':
                return (
                    <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-3xl font-bold">Informacion</h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalUpdateInfo(true)}>
                            Editar
                            </button>  
                        </div>
                        <div className="flex flex-row">
                            <p className="text-xl">Titulo: {actividadData.titulo}</p>
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
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalUpdateParvulos(true)}>
                                    Editar
                                </button>
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
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalUpdateResponsable(true)}>
                                    Editar
                                </button>
                            </div>
                            <div className="flex flex-row">
                                <p className="text-xl">No hay responsable asignado</p>
                            </div>
                        </div>
                    );
                }

                return (
                    <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
                        <div className="flex flex-row justify-between">
                            <h1 className="text-3xl font-bold">Responsable</h1>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalUpdateResponsable(true)}>
                                Editar
                            </button>
                        </div>
                        <div className="flex flex-row">
                            <div className="flex-1">
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
                            <p className="text-xl">Fecha: {fecha}</p>
                        </div>  
                        <div className="flex flex-row">
                            <p className="text-xl">Descripcion: {actividadData.descripcion}</p>
                        </div>
                    </div>

                );
        }
    }

    useEffect(() => {
        setActividadData(actividadData);
    }, [actividadData]);


    return (
        <>
        <div className="flex max-sm:flex-col h-full w-full ">
            
            <LeftBar/>
            <div className="w-full">
                {/* title */}
                <div className="bg-white border-black border-b-2 p-6 shadow shadow-slate-900">
                    <div className="flex p-2 ">
                        <h1 className="text-5xl font-bold">Actividad: {actividadData.titulo}</h1>
                    </div>
                    <div className="flex justify-end">
                        <Link href="/actividades">
                            <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300">Regresar Actividades</button>
                        </Link>
                    </div>
                </div>
               {/*Left tab bar with thre buttons(Info, Parvulos, Responsable) and the right side is the content of the button selected use the switchRender function to render the content*/}
                <div className="w-full xl:w-3/4 xl:mx-auto">
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
                        {(actividadData.foto) 
                            ? 
                            <div className="w-full space-y-4">         
                                <div className="flex flex-row justify-center">                                    
                                    {picture(actividadData.foto, 'actividad')}
                                </div>
                                <div  className="bg-white border-black border-2 rounded-2xl shadow-md shadow-slate-900 w-full">
                                    <div className="flex flex-row justify-center space-x-6 py-4"> 
                                        <p> Fotografia de la Actividad: </p>
                                        <button className="text-black hover:text-blue-600" onClick={() => setShowUploadFotoSection(true)}>Cambiar foto</button>
                                    </div>
                                    {
                                        showUploadFotoSection &&
                                        <UploadFotoSection setShowUploadFotoSection={setShowUploadFotoSection} setActividadData={setActividadData} actividad={actividadData}/>
                                    }
                                </div>
                            </div> 
                            :
                            <div  className="bg-white border-black border-2 rounded-2xl shadow-md shadow-slate-900 w-full">
                                <div className="flex flex-row justify-center space-x-6 py-4"> 
                                    <p >No se ha añadido foto de esta actividad :(</p>
                                    <button className="text-black hover:text-blue-600" onClick={() => setShowUploadFotoSection(true)}>Agregar foto :)</button>
                                </div>
                                {
                                    showUploadFotoSection &&
                                    <UploadFotoSection setShowUploadFotoSection={setShowUploadFotoSection} setActividadData={setActividadData} actividad={actividadData}/>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Perfil/>    
        </div>
        { 
            showModalUpdateInfo &&
            <ModalUpdateInfo actividad={actividadData} setShowModalUpdateInfo={setShowModalUpdateInfo} setActividadData={setActividadData}/>
        }
        {
            showModalUpdateParvulos &&
            <ModalUpdateParvulos actividad={actividadData} setShowModalUpdateParvulos={setShowModalUpdateParvulos} setActividadData={setActividadData}/>
        }
        {
            showModalUpdateResponsable &&
            <ModalUpdateResponsable actividad={actividadData} setShowModalUpdateResponsable={setShowModalUpdateResponsable} setActividadData={setActividadData}/>
        }
        </>
        
    );
}




