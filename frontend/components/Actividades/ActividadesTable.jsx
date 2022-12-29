
import { useState } from "react";
import { useRouter } from "next/router";
import { ModalDeleteActividad } from "./ModalDeleteActividad";
import { ModalAddActividad } from "./ModalAddActividad";
import { ModalUpdateActividad } from "./ModalUpdateActividad";
export const ActividadesTable = ({props}) => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [showModalView, setShowModalView] = useState(false);

  const [id, setId] = useState("");
  const [actividades, setActividades] = useState(props);
  const [actividad, setActividad] = useState({});

  const deleteModal = (id) => {
    setShowModalDelete(true);
    setId(id);
  }

  const updateModal = (actividad) => {
    setShowModalUpdate(true);
    setActividad(actividad);
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
            <table className="w-full table-fix">
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
                    console.log(actividades)
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
                          <button className="hover:text-emerald-600" onClick={() => props.showActividad(item._id)}>Ver</button>
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
    <ModalDeleteActividad id={id} setId={setId} setShowModalDelete={setShowModalDelete} actividades={actividades} setActividades={setActividades}/>
  }

  {
    showModalAdd &&
    <ModalAddActividad setShowModalAdd={setShowModalAdd} actividades={actividades} setActividades={setActividades} />
  }

  {
    showModalUpdate &&
    <ModalUpdateActividad setShowModalUpdate={setShowModalUpdate} actividades={actividades} setActividades={setActividades} actividad={actividad} />
  }
  </>
)  
}

export default ActividadesTable;
