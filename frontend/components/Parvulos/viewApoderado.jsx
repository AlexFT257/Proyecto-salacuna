import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export const ModalViewApoderado = ({ dataParvulo ,setShowModalViewApoderado }) => {
    const[dataApoderado,setDataApoderado]=useState({});

    useEffect(() => {
        getApoderadoByParvulo();
    }, []);



    const getApoderadoByParvulo = async () => {
        const response = await axios.get(`${process.env.API_URL}/user/search/${dataParvulo.apoderado}`);
        const data = await response.data;
        if (response.status === 200) {
            setDataApoderado(data);
        }else{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salio mal!",
            });
            

        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50" >
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
                    <div className="modal-content flex flex-col justify-center items-center m-5 space-y-3">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel justify-center font-bold">Apoderado : {dataApoderado.nombre}</h5>
                        </div>
                        <div className=" w-full flex flex-col space-y-3">
                        <table className="formAsistente m-2 mt-0  flex flex-col " >
                                <label className="">Nombre</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataApoderado.nombre}</td>
                                <label className="form-label">Apellido</label>
                                <td type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                >{dataApoderado.apellido}</td>
                                <label className="form-label">Rut</label>
                                <td type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                >{dataApoderado.rut}</td>

                                <label className="form-label">Telefono</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataApoderado.telefono}</td>
                                <label className="form-label">Direccion</label>
                                <td type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                > {dataApoderado.domicilio}</td>

                                <label className="form-label">Email</label>
                                <td type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                >{dataApoderado.mail}</td>
                            </table>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="bg-slate-900 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalViewApoderado(false)}>Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
        )

}