import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import { ModalAddParvulo } from "./addParvulo";
import { ModalDeleteParvulo } from "./deleteParvulo";
import { ModalUpdateParvulo } from "./updateParvulo";
import { useState, useEffect } from "react";

//Listar los parvulos en una tabla

export const ListarParvulos = () => {
    const [showModalAddParvulo, setShowModalAddParvulo] = useState(false);
    const [showModalEditParvulo, setShowModalEditParvulo] = useState(false);
    const [ShowModalDeleteParvulo,setShowModalDeleteParvulo] = useState(false);
    const [parvulos, setParvulos] = useState([]);

    const [rut, setRut] = useState("");
    
    const getParvulos = async () => {
        const token = Cookies.get("token");
        const payload = jwt.decode(token, process.env.SECRET_KEY,true);
        const response = await axios.get(`${process.env.API_URL}/parvulos`, {
            headers: { "X-Caller-Id": payload.sub},
        });
        console.log(response);
        setParvulos(response.data);
    };
    useEffect(() => {
        getParvulos();
    }, []);

    const modalDelete = (rut) => {
        setShowModalDeleteParvulo(true);
        setRut(rut);
    };

    const modalEdit = (rut) => {
        setShowModalEditParvulo(true);
        setRut(rut);
    };

    return (
        // retornar la tabla con los parvulos y el boton para agregar parvulos 
        <>
            <div className="flex flex-col w-full h-full ">
                <div className="bg-white border-black border-b-2 p-6 shadow shadow-slate-900">
                    <div className="">
                        <h1 className="flex m-4 p-2 text-5xl font-bold " onClick={() => setShowModalAddParvulo(true)} >Parvulos</h1>
                    </div >
                </div>

                <div className="m-4 h-fit">
                    <div className="flex justify-center my-2">
                        <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300" onClick={() => setShowModalAddParvulo(true)}>
                            Añadir Parvulo
                        </button>
                    </div>
                <div className="Parvulotable bg-white border-black border-2 rounded-2xl p-6 shadow mr-2 shadow-slate-900 ">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th>Foto</th>
                                <th>Nombre</th>
                                <th>Rut </th>
                                <th>Fec. Nac</th>
                                <th>Telefono</th>
                                <th>Direccion</th>
                                <th>Condiciones Medicas</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody">
                            {
                            parvulos.map((parvulo) =>{
                            console.log(parvulos) 
                                return(
                                <tr key={parvulo.rut}>
                                    <td><img src={parvulo.foto} alt="foto" width="100" height="100"/></td>
                                    <td>{parvulo.nombre}</td>
                                    <td>{parvulo.rut}</td>
                                    <td>{new Date(parvulo.fechaNacimiento).toLocaleDateString("es-ES")}</td>
                                    <td>{parvulo.telefonoEmergencia}</td>
                                    <td>{parvulo.direccion}</td>
                                    <td>{parvulo.condicionesMedicas}</td>
                                    <td>
                                        <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300"
                                        onClick={()=>modalEdit(parvulo.rut)}>
                                            Editar
                                        </button>
                                        <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300"
                                        onClick={() => modalDelete(parvulo.rut)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            {showModalAddParvulo && (
                <ModalAddParvulo
                    showModalAddParvulo={showModalAddParvulo}
                    setShowModalAddParvulo={setShowModalAddParvulo}
                />
            )}
            {ShowModalDeleteParvulo && (
                <ModalDeleteParvulo
                    ShowModalDeleteParvulo={ShowModalDeleteParvulo}
                    setShowModalDeleteParvulo={setShowModalDeleteParvulo}
                    setRut={setRut}
                    setParvulos={setParvulos}
                    parvulos={parvulos}
                    rut={rut}

                />
            )}
            {showModalEditParvulo && (
                <ModalUpdateParvulo
                    showModalEditParvulo={showModalEditParvulo}
                    setShowModalEditParvulo={setShowModalEditParvulo}
                    rut={rut}
                    setRut={setRut}
                    setParvulos={setParvulos}
                    parvulos={parvulos}

                />
            )}


        </>
    );
};


export default ListarParvulos;
