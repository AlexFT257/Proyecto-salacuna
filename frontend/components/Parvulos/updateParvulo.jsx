import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import { use, useState } from "react";


export const ModalUpdateParvulo = ({showModalEditParvulo,setShowModalEditParvulo,rut,seRut,setParvulos,parvulos}) => {
    const [parvulo] = useState(
        parvulos.find((parvulo) => parvulo.rut === rut)
    );
    const[putParvulo,setPutParvulo] = useState({
        nombre:"",
        apoderado:"",
        rut:"",
        fechaNacimiento:"",
        direccion:"",
        telefonoEmergencia:"",
        foto:"",

      
    });
    function getModifiedFields(original, current) {
        return Object.keys(current).reduce((modified, key) => {
          if (current[key] !== original[key]) {
            modified[key] = current[key];
          }
          return modified;
        }, {});
      }

    
    const updateParvulo = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");
        const decoded = jwt.decode(token, process.env.SECRET_KEY,true);
        const modifiedFields = getModifiedFields(parvulo, putParvulo);
        console.log(modifiedFields);
        try{
            const res = await axios.put(
                `${process.env.API_URL}/parvulos/update/${parvulo.rut}`,
                modifiedFields,
                {
                    headers: {
                        "X-Caller-Id": decoded.sub,
                    },
                }
            );
            if(res.status === 200){
                const newParvulos = parvulos.map((parvulo) => {
                    if(parvulo._id === res.data._id){
                        return res.data;
                    }else{
                        return parvulo;
                    }
                });
                setParvulos(newParvulos);
                setShowModalEditParvulo(false);
            }
        }catch(err){
            console.log(err);
        }
    };
   
    
    return (
        <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50" >
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
                <div className="modal-content flex flex-col justify-center items-center m-5 space-y-3">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel justify-center font-bold">Editar parvulo</h5>
                    </div>
                    <div className=" w-full flex flex-col space-y-3">
                        <form className="formAsistente m-2 mt-0  flex flex-col" onSubmit={updateParvulo}>

                                <label htmlFor="" className="">Nombre</label>
                                <input type="text" 
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                id="nombre" 
                                placeholder={parvulo.nombre}
                              

                                />

                                <label htmlFor="apoderado" className="form-label">Apoderado</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                id="apoderado" 
                                placeholder={parvulo.apoderado}
                                />

                                <label htmlFor="rut" className="form-label">Rut</label>
                                <tb type="text" 
                                disabled>{parvulo.rut} </tb>
                                
                                <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento :{new Date(parvulo.fechaNacimiento).toLocaleDateString("es-ES")}</label>
                                <input type="date"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                id="fechaNacimiento"
                                placeholder={parvulo.fechaNacimiento}
                                />

                                <label htmlFor="direccion" className="form-label">Direccion</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                id="direccion"
                               placeholder={parvulo.direccion}
                                />


                                <label htmlFor="telefonoEmergencia" className="form-label">Telefono Emergencia</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                id="telefonoEmergencia"
                               placeholder={parvulo.telefonoEmergencia}
                                />

                                <label htmlFor="condiciones medicas">Condiciones Medicas</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                id="condicionesMedicas"
                                placeholder={parvulo.condicionesMedicas}
                               
                                />

                                <label htmlFor="foto" className="form-label">Foto</label>
                                <input type="file"
                                 className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                 id="foto" />


                            <div className="modal footer">
                                <button type="button" className="btn btn-secondary bg-red-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" 
                                data-bs-dismiss="modal" onClick={()=> setShowModalEditParvulo(false)} >Cerrar
                                </button>
                                <button type="submit" 
                                className="btn btn-primary bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900"
                                onClick={updateParvulo}>
                                    Enviar
                                    </button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
    )  
}

