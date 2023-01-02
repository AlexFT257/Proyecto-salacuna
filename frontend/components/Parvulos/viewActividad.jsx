import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";




   export const  ModalViewActividad = ({setShowModalViewActividad, parvulo, dataParvulo}) => {
        const [actividades, setActividades] = useState();
        useEffect(() => {
            getActividadesByParvulo();
          
            
        }, []);

        const getActividadesByParvulo = async () => {
            console.log(parvulo);
            const response =await axios.get(`${process.env.API_URL}/actividad/parvulo/${parvulo}`);
            const data= await response.data;
            if (response.status === 200) {
                setActividades(data);
                console.log(data[0].descripcion);
            }else{
              console.log(response.status);
                Swal.fire({
                    icon: "error",
                    title: "Error",
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
                            <h5 className="modal-title text-2xl font-bold my-4" id="exampleModalLabel">Parvulo : {dataParvulo.nombre}</h5>
                        </div>
                        <div className=" w-full flex flex-col space-y-3">
                            <table className="w-full -table-fixed">
                                <thead className="">
                                    <tr className="text-left">
                                        <th>Titulo</th>
                                        <th>Descripcion</th>    
                                        <th>Fecha</th>
                                        <th>Responsable</th>
                                    </tr>
                                </thead>
                                <tbody className="">
                                    {
                                        actividades?.map((item) => {
                                            const fecha = new Date(item.fecha).toLocaleDateString();
                                            return (
                                                <tr className="text-left" key={item._id}>
                                                    <td>{item.titulo}</td>
                                                    <td>{item.descripcion}</td>
                                                    <td>{fecha}</td>
                                                    <td>{
                                                        (item.responsable != null) ? item.responsable.nombre : "Sin responsable"
                                                    }</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div> 
                        <div className="modal-body">
                            <div className="flex flex-col space-y-3">
                                <div>
                                <button className="bg-slate-900 text-white font-bold py-2 px-4 rounded" onClick={() => setShowModalViewActividad(false)}>Cerrar</button>
                                </div>
                            </div>
                       </div>
                    </div>
                </div>
            </div>
           
           </>
          
        
        );

    }
{/*
dqnjdnlw   
 <table className="w-full table-fixed">
              <thead className="">
                <tr className="text-left">
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Fecha</th>
                  <th>Resposable</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="">
                {
                  actividades.map((item) => {
                    const fecha = new Date(item.fecha).toLocaleDateString();
                    return (
                      <tr className="text-left" key={item._id}>
                        <td>{item.titulo}</td>
                        <td>{item.descripcion}</td>
                        <td>{fecha}</td>
                        <td>{
                          (item.responsable != null) ? item.responsable.nombre : "Sin responsable"
                        }</td>
                        <td className="flex justify-start space-x-2">
                          <button className="hover:text-red-600" onClick={() => deleteModal(item._id)}>Eliminar</button>
                          <button className="hover:text-emerald-600" onClick={() => updateModal(item)}>Editar</button>
                          <Link href={`/actividades/${item._id}`}>
                            <button className="hover:text-blue-600">Ver</button>
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>




*/
}