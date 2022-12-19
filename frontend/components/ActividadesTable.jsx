
export const ActividadesTable = ({props}) => {
  return (
    <div className="w-screen ">
      {/* title */}
      <div className="flex m-4 p-2 ">
        <h1 className="text-5xl font-bold">Actividades</h1>
      </div>
      {/* body */}
      <div className="m-4 flex h-fit">
        <div className="flex">
          <div className="bg-white border-black border-2 rounded-2xl p-6 shadow mr-2 shadow-slate-900">
            <table className="table-auto border-separate border-spacing-x-1 border-spacing-y-1 ">
              {/* atributos de la tabla */}
              <thead className="">
                <tr className="">
                  <th>Titulo</th>
                  <th>Descripcion</th>
                  <th>Fecha</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              {/* valores de la tabla */}
              <tbody className="tableBody">
                {
                  props.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>{item.titulo}</td>
                        <td>{item.descripcion}</td>
                        <td>{item.fecha}</td>
                        
                        <td className="flex justify-evenly">
                          <button className="delButton" onClick={() => props.deleteActividad(item._id)}>Eliminar</button>
                          <button className="editButton" onClick={() => props.editActividad(item._id)}>Editar</button>
                          <button className="showButton" onClick={() => props.showActividad(item._id)}>Ver</button>
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
  </div>
)  
}

    export default ActividadesTable;
