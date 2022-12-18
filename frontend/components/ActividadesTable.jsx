export const ActividadesTable = () => {
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
                  <th className="">Foto</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Rut</th>
                  <th>Mail</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              {/* valores de la tabla */}
              <tbody className="tableBody">
                //tabla de actividades 

              </tbody>
            </table>
          </div>
        </div>
    </div>
    </div>
    )  
    }

    export default ActividadesTable;
