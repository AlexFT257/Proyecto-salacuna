import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import { useState } from "react";


export const ModalUpdateParvulo = ({showModalEditParvulo,setShowModalEditParvulo,rut,seRut,setParvulos,parvulos}) => {
    const [parvulo, setParvulo] = useState(
        parvulos.find((parvulo) => parvulo.rut === rut)
    );

    return (
        <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
                <div className="flex flex-col justify-center items-center m-5 space-y-3">
                        <h5 className="justify-center font-bold">Editar Parvulo</h5>
                    <div className=" w-full  space-y-3">
                        <form action="">
                            <div className="justify-center">
                               <label className="form-label mt-10">Rut</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600  " 
                                placeholder={parvulo.rut} />
                                <label className="form-label mt-10">Nombre</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                placeholder={parvulo.nombre} />
                                <label className="form-label">Apoderado</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                placeholder={parvulo.apoderado} />
                                <label className="form-label">Fecha de nacimiento</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                placeholder={parvulo.fechaNacimiento} />
                                <label className="form-label">Direccion</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                placeholder={parvulo.direccion} />
                                <label className="form-label">Telefono Emergencia</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                placeholder={parvulo.telefonoEmergencia} />
                                <label className="form-label">Foto</label>
                                <input type="text" className="mb-5 form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                placeholder={parvulo.foto} />

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
