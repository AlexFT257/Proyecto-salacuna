import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import {useEffect, useState } from "react";
import Swal from "sweetalert2";



export const ModalUpdateParvulo = ({setShowModalEditParvulo,rut,setParvulos,parvulos}) => {
    const [parvulo] = useState(
        parvulos.find((parvulo) => parvulo.rut === rut)
    );
    const [selectedFile, setSelectedFile] = useState(null);
    const[putParvulo,setPutParvulo] = useState({
        nombre:parvulo.nombre,
        apoderado:parvulo.apoderado,
        rut:parvulo.rut,
        fechaNacimiento:parvulo.fechaNacimiento,
        direccion:parvulo.direccion,
        telefonoEmergencia:parvulo.telefonoEmergencia,
        condicionesMedicas:parvulo.condicionesMedicas,
        foto:parvulo.foto,
    });
    const oldFoto = ((parvulo.foto) ? parvulo.foto : null);
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const updateParvulo = async (e) => {
        e.preventDefault();
        const token = Cookies.get("token");
        const decoded = jwt.decode(token, process.env.SECRET_KEY,true);
        console.log(putParvulo);
        try{
            const formData = new FormData();
            if(selectedFile){
                formData.append("archivos",selectedFile);
                const response = await axios.post(
                    `${process.env.API_URL}/file/${selectedFile.name}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if(response.status !== 201){
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal!",
                        timer: 2000,
                      });
                }else{
                    console.log("response foto nueva");
                    console.log(response.data[0]._id);
                    console.log("old foto");
                    console.log(oldFoto);
                    const res = await axios.put(
                        `${process.env.API_URL}/parvulo/update/${parvulo.rut}`,
                        {
                            nombre:putParvulo.nombre,
                            apoderado:putParvulo.apoderado,
                            rut:putParvulo.rut,
                            fechaNacimiento:putParvulo.fechaNacimiento,
                            direccion:putParvulo.direccion,
                            telefonoEmergencia:putParvulo.telefonoEmergencia,
                            condicionesMedicas:putParvulo.condicionesMedicas,
                            foto:response.data[0]._id,
                        },
                        {
                            headers: {
                                "X-Caller-Id": decoded.sub,
                            },
                        }
                    );
                    if(res.status === 200){
                        if(oldFoto !== null){
                            const deleteFoto = await axios.delete(
                                `${process.env.API_URL}/file/delete/${oldFoto}`,
                                {
                                    headers: {
                                        "X-Caller-Id": decoded.sub,
                                    },
                                }
                            );
                            if(deleteFoto.status === 200){
                                console.log("Foto antigua  eliminada");
                            }else{
                                console.log("Error al eliminar foto antigua");
                            }
                        }
                        else{
                            Swal.fire({
                                title: "Parvulo actualizado",
                                icon: "success",
                                position: "center",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }

                    }
                    setShowModalEditParvulo(false);
                    setParvulos(parvulos.map((parvulo) => parvulo.rut === rut ? putParvulo : parvulo));
                }
            

            }else{
                const res = await axios.put(
                    `${process.env.API_URL}/parvulo/update/${parvulo.rut}`,
                    putParvulo,
                    {
                        headers: {
                            "X-Caller-Id": decoded.sub,
                        },
                    }
                );
           
                if(res.status === 200){
                    Swal.fire({
                        title: "Parvulo actualizado",
                        icon: "success",
                        position: "center",
                        showConfirmButton: false,
                        timer: 1500
                      });
                }
                setShowModalEditParvulo(false);
                setParvulos(parvulos.map((parvulo) => parvulo.rut === rut ? putParvulo : parvulo));

            }
            
        }catch(err){
            Swal.fire({
                title: "Error al actualizar parvulo",
                icon: "error",
                position: "center",
                showConfirmButton: false,
                timer: 1500
                });
                
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
                                value={putParvulo.nombre}
                                onChange={(e) => setPutParvulo({...putParvulo,nombre:e.target.value})}
                                />

                                <label htmlFor="apoderado" className="form-label">Apoderado</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                id="apoderado" 
                                value={putParvulo.apoderado}
                                onChange={(e) => setPutParvulo({...putParvulo,apoderado:e.target.value})}
                                />

                                <label htmlFor="rut" className="form-label">Rut</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                id="rut"
                                value={putParvulo.rut}
                                onChange={(e) => setPutParvulo({...putParvulo,rut:e.target.value})}
                                /> 
                                <label htmlFor="direccion" className="form-label">Direccion</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                id="direccion"
                               value={putParvulo.direccion}
                               onChange={(e) => setPutParvulo({...putParvulo,direccion:e.target.value})}
                                />
                                <label htmlFor="telefonoEmergencia" className="form-label">Telefono Emergencia</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                id="telefonoEmergencia"
                               value={putParvulo.telefonoEmergencia}
                               onChange={(e) => setPutParvulo({...putParvulo,telefonoEmergencia:e.target.value})}
                                />
                                <label htmlFor="condiciones medicas">Condiciones Medicas</label>
                                <input type="text"
                                className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                id="condicionesMedicas"
                                value={putParvulo.condicionesMedicas}
                                onChange={(e) => setPutParvulo({...putParvulo,condicionesMedicas:e.target.value})}
                                />
                                 <label htmlFor="foto" className="form-label">Foto</label>
                                <input type="file"
                                 className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                 id="foto" onChange={handleFileChange} />


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

