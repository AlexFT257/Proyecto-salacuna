
import { useState } from "react";
import { useRouter } from "next/router";
import { ModalDeleteActividad } from "./ModalDeleteActividad";
import { ModalAddActividad } from "./ModalAddActividad";
export const ActividadesTable = ({props}) => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [id, setId] = useState("");
  const [actividades, setActividades] = useState(props);
  
  const deleteModal = (id) => {
    setShowModalDelete(true);
    setId(id);
  }

  return (
  <>
    <div className="w-screen">
      {/* title */}
      <div className="bg-white border-black border-b-2 p-6 shadow shadow-slate-900">
        <div className="flex m-4 p-2 ">
          <h1 className="text-5xl font-bold">Actividades</h1>
        </div>
        <div className="flex justify-end">
          <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300" onClick={() => setShowModalAdd(true)}>Agregar Actividad</button>
        </div>
      </div>
      
      <div className="m-4 h-fit">
          <div className="bg-white border-black border-2 rounded-2xl p-6 shadow mr-2 shadow-slate-900">
            <table className="w-full table-auto">
              <thead className="">
                <tr className="text-left">
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody className="">
                {
                  actividades.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.titulo}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.fecha}</td> {/*cambiar formato fecha*/}
                        
                        <td className="flex justify-evenly space-x-1">
                          <button className="" onClick={() => deleteModal(item._id)}>Eliminar</button>
                          <button className="" onClick={() => props.editActividad(item._id)}>Editar</button>
                          <button className="" onClick={() => props.showActividad(item._id)}>Ver</button>
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
  { showModalDelete && 
    <ModalDeleteActividad showModalDelete={showModalDelete} setShowModalDelete={setShowModalDelete} actividades={actividades} setActividades={setActividades} id={id} />
  }

  {
    showModalAdd &&
    <ModalAddActividad showModalAdd={showModalAdd} setShowModalAdd={setShowModalAdd} actividades={actividades} setActividades={setActividades} />
  }
  </>
)  
}

export default ActividadesTable;
