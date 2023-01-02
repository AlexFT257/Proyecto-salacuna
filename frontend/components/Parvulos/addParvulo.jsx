import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import { checkToken } from "../../data/user";

export const ModalAddParvulo= ({setShowModalAddParvulo, parvulos, setParvulos}) => {
    // modal para crear parvulo
    const [newParvulo, setNewParvulo] = useState({
        nombre:"",
        apoderado:"",
        rut:"",
        fechaNacimiento:"",
        direccion:"",
        telefonoEmergencia:"",
        condicionesMedicas:"",
        foto:"",
    });
    
    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || token === "undefined") {
            router.push("/login");
        }
    }, []);
    if(checkToken() === false){
        router.push("/login");
    }
    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const addParvulo = async (e) => {
        e.preventDefault();
        
        const token = Cookies.get("token");
        const decoded = jwt.decode(token, process.env.SECRET_KEY,true);
       
        try{

            if(selectedFile){
                const formData = new FormData();
                formData.append("archivos", selectedFile);
                const res = await axios.post(
                    `${process.env.API_URL}/file/${selectedFile.name}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                console.log(res);
                if(res.status !== 201){
                    Swal.fire({
                        title: "Error al subir imagen",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }else{
                    setNewParvulo({
                        ...newParvulo,
                        foto: res.data[0]._id,
                    });
                    const response = await axios.post(
                        `${process.env.API_URL}/parvulo`,
                        newParvulo,
                        {
                            headers: {
                                "Content-Type": "application/json",
                                "X-Caller-Id": decoded.sub,
                            },
                        }
                    );
                    console.log(response);
                    if(response.status !== 201){
                        Swal.fire({
                            title: "Error al crear parvulo if",
                            icon: "error",
                            confirmButtonText: "Ok",
                        });
                    }else{
                        setParvulos([...parvulo, response.data]);
                        setShowModalAddParvulo(false);
                    }
                   
                }
            }else{
                const response = await axios.post(
                    `${process.env.API_URL}/parvulo`,
                    newParvulo,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "X-Caller-Id": decoded.sub,
                        },
                    }
                );
                console.log(response);
                if(response.status !== 201){
                    Swal.fire({
                        title: "Error al crear parvulo else",
                        icon: "error",
                        confirmButtonText: "Ok",
                    });
                }else{
                    setParvulos([...parvulos, response.data]);
                    setShowModalAddParvulo(false);
                }

            }
        

        }catch(err){
            console.log(err);
            Swal.fire({
                title: "Error al crear parvulo catch",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
    };
  

    return(
        <>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50" >
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
                    <div className="modal-content flex flex-col justify-center items-center m-5 space-y-3">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel justify-center font-bold">Agregar Parvulo</h5>
                        </div>
                        <div className=" w-full flex flex-col space-y-3">
                            <form className="formAsistente m-2 mt-0  flex flex-col" onSubmit={addParvulo}>
                                
                                    <label htmlFor="" className="">Nombre</label>
                                    <input type="text" 
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                    id="nombre" 
                                    onChange={(e) => setNewParvulo({...newParvulo, nombre: e.target.value})} required/>
                               
                                
                                    <label htmlFor="apoderado" className="form-label">Apoderado</label>
                                    <input type="text"
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                    id="apoderado" onChange={(e) => setNewParvulo({...newParvulo, apoderado: e.target.value})} required/>
                                
                                
                                    <label htmlFor="rut" className="form-label">Rut</label>
                                    <input type="text" 
                                    placeholder="xx.xxx.xxx-x"
                                    pattern="^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$"
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                    id="rut" onChange={(e) => setNewParvulo({...newParvulo, rut: e.target.value})} required/>
                               
                               
                                    <label htmlFor="fechaNacimiento" className="form-label">Fecha de Nacimiento</label>
                                    <input type="date"
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                    id="fechaNacimiento" onChange={(e) => setNewParvulo({...newParvulo, fechaNacimiento: e.target.value})} required/>
                                
                             
                                    <label htmlFor="direccion" className="form-label">Direccion</label>
                                    <input type="text" 
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                    id="direccion" onChange={(e) => setNewParvulo({...newParvulo, direccion: e.target.value})} required/>
                              

                                    <label htmlFor="telefonoEmergencia" className="form-label">Telefono Emergencia</label>
                                    <input type="text" 
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                    id="telefonoEmergencia" onChange={(e) => setNewParvulo({...newParvulo, telefonoEmergencia: e.target.value})} required/>

                                    <label htmlFor="condiciones medicas">Condiciones Medicas</label>
                                    <input type="text"
                                    className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                                    id="condicionesMedicas" onChange={(e) => setNewParvulo({...newParvulo, condicionesMedicas: e.target.value})} required/>

                              
                                    <label htmlFor="foto" className="form-label">Foto</label>
                                    <input type="file"
                                     className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600" 
                                     id="foto" onChange={handleFileChange} />


                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary bg-red-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900" 
                                    data-bs-dismiss="modal" onClick={()=> setShowModalAddParvulo(false)} >Cerrar</button>
                                    <button type="submit" 
                                    className="btn btn-primary bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900"
                                    onClick={addParvulo}>
                                        Agregar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}