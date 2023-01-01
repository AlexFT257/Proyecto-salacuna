
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ModalDeleteActividad } from "./ModalDeleteActividad";
import { ModalAddActividad } from "./ModalAddActividad";
import { ModalUpdateActividad } from "./ModalUpdateActividad";
import axios from "axios";
import Link from "next/link";

export const ActividadesTable = () => {
  const [showModalAdd, setShowModalAdd] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);
  

  const [id, setId] = useState("");
  const [actividades, setActividades] = useState([]);
  const [actividad, setActividad] = useState({});

  const getActividades = async () => {
    const res = await axios.get(`${process.env.API_URL}/actividades`);
    const data = await res.data;
    setActividades(data);
  }

  useEffect(() => {
    getActividades();
  }, []);

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
    <div className="w-full xl:w-3/4 xl:mx-auto">
        <div className="flex justify-end mx-4 mt-6">
          <button 
              className="rounded-xl p-3 bg-white border-2 border-black shadow shadow-black hover:bg-teal-200 hover:shadow-md hover:shadow-black" 
              onClick={() => setShowModalAdd(true)}>
                  Agregar Actividad
          </button>
        </div>
        
        <div className="bg-white border-black border-2 rounded-2xl p-6 mx-4 mt-4 shadow shadow-black"> 
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
