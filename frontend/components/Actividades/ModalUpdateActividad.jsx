import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import axios from "axios";

export const ModalUpdateActividad = ({setShowModalUpdate, actividades, setActividades, actividad}) => {
  const [putActividad, setPutActividad] = useState({
    titulo: actividad.titulo,
    descripcion: actividad.descripcion,
    fecha: actividad.fecha,
    responsable: (actividad.responsable) ? actividad.responsable._id : '',
    parvulos: (actividad.parvulos.length > 0) ? actividad.parvulos.map((parvulo) => parvulo._id) : [],
  });
  
  const [auxActividad, setAuxActividad] = useState({
    titulo: actividad.titulo,
    descripcion: actividad.descripcion,
    fecha: actividad.fecha,
    responsable: (actividad.responsable) ? actividad.responsable._id : '',
    parvulos: (actividad.parvulos.length > 0) ? actividad.parvulos.map((parvulo) => parvulo._id) : [],
  });

  const [parvulos, setParvulos] = useState([]);
  const [asistentes, setAsistentes] = useState([]);

  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token || token === "undefined") {
      router.push("/login");
    }
  }, []);

  function objetosIguales(obj1, obj2) {
    // Si los objetos no tienen la misma cantidad de propiedades, entonces son diferentes
    if (Object.keys(obj1).length !== Object.keys(obj2).length) {
      return false;
    }
  
    // Iteramos sobre cada propiedad del objeto
    for (const prop in obj1) {
      // Si el valor de la propiedad en obj1 es diferente al valor de la propiedad en obj2, entonces los objetos son diferentes
      if (obj1[prop] !== obj2[prop]) {
        // Si la propiedad es un arreglo, entonces verificamos si cada elemento del arreglo es igual en ambos objetos
        if (Array.isArray(obj1[prop])) {
          if (obj1[prop].length !== obj2[prop].length) {
            return false;
          }
          for (let i = 0; i < obj1[prop].length; i++) {
            if (obj1[prop][i] !== obj2[prop][i]) {
              return false;
            }
          }
        } else {
          // Si la propiedad no es un arreglo, entonces los objetos son diferentes
          return false;
        }
      }
    }
  
    // Si llegamos hasta aquí, entonces todas las propiedades son iguales en ambos objetos
    return true;
  }
  
  function obtenerDiferencias(obj1, obj2) {
    // Creamos un objeto para almacenar las propiedades diferentes
    const diferencias = {};
  
    // Iteramos sobre cada propiedad del objeto
    for (const prop in obj1) {
      // Si el valor de la propiedad en obj1 es diferente al valor de la propiedad en obj2, entonces agregamos la propiedad al objeto de diferencias
      if (obj1[prop] !== obj2[prop]) {
        // Si la propiedad es un arreglo, entonces verificamos si cada elemento del arreglo es igual en ambos objetos
        if (Array.isArray(obj1[prop])) {
          if (obj1[prop].length !== obj2[prop].length) {
            diferencias[prop] = obj1[prop];
          } else {
            for (let i = 0; i < obj1[prop].length; i++) {
              if (obj1[prop][i] !== obj2[prop][i]) {
                diferencias[prop] = obj1[prop];
                break;
              }
            }
          }
        } else {
          // Si la propiedad no es un arreglo, entonces agregamos la propiedad al objeto de diferencias
          diferencias[prop] = obj1[prop];
        }
      }
    }
  
    // Retornamos el objeto de diferencias
    return diferencias;
  }
  
  const updateActividad = async (e) => {
    e.preventDefault();
    try{
      const token = Cookies.get("token");
      const decoded = jwt.decode(token, process.env.SECRET_KEY, true);
      
      const change = !(objetosIguales(putActividad, auxActividad));
      console.log(change);
      if(change){
        const changeActividad = obtenerDiferencias(putActividad, auxActividad);
        const res = await axios.put(
          `${process.env.API_URL}/actividad/update/${actividad._id}`,
          changeActividad,
          {
            headers: {
              "X-Caller-Id": decoded.sub,
              "Content-Type": "application/json"
            }
          }
        );
        if(res.status === 200){
          Swal.fire({
            title: "Actividad actualizada",
            icon: "success",
            position: "center",
            showConfirmButton: false,
            timer: 1500
          });
          setShowModalUpdate(false);
          setActividades(
            actividades.map((actividad) => {
              if(actividad._id === res.data._id){
                if(changeActividad.responsable)
                {
                  changeActividad.responsable = asistentes.find((asistente) => changeActividad.responsable === asistente._id);
                }
                if(changeActividad.parvulos)
                {
                  changeActividad.parvulos = parvulos.filter((parvulo) => changeActividad.parvulos.includes(parvulo._id));
                }
                return {...actividad, ...changeActividad};
              }else{
                return actividad;
              }
            })
          );
        }
      }else{
        Swal.fire({
          title: "No se han realizado cambios, no se actualizó la actividad",
          icon: "info",
          position: "center",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }catch(err){
      Swal.fire({
        title: err,
        icon: "error",
        position: "center",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const getAsistentes = async () => {
    const token = Cookies.get("token");
    const decoded = jwt.decode(token, process.env.SECRET, true);
    const res = await axios.get(`${process.env.API_URL}/asistentes`, {
        headers: {
            "X-Caller-Id": decoded.sub,
        },
    });
    if (res.status === 200) {
        setAsistentes(res.data);
    }
  };

  const getParvulos = async () => {
    const token = Cookies.get("token");
    const decoded = jwt.decode(token, process.env.SECRET, true);
    const res = await axios.get(`${process.env.API_URL}/parvulos`, {
        headers: {
            "X-Caller-Id": decoded.sub,
        },
    });
    if (res.status === 200) {
        setParvulos(res.data);
    }
  };

  useEffect(() => {
    getAsistentes();
    getParvulos();
  }, []);

  return (
    <> 
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
            <div className="flex flex-col justify-center items-center m-5 space-y-3">
              <h1 className="text-2xl font-bold">Modificar Actividad</h1>
              <form className=" w-full flex flex-col space-y-3" onSubmit={updateActividad}>
                <span className="font-semibold">Titulo</span>
                <input
                  type="text"
                  placeholder="Titulo"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                  value={putActividad.titulo}
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      titulo: e.target.value,
                    })
                  }
                />
                <span className="font-semibold">Descripcion</span>                
                <input
                  type="text"
                  placeholder="Descripcion"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  value={putActividad.descripcion}
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      descripcion: e.target.value,
                    })
                  }
                />
                <span className="font-semibold">Fecha</span>
                <input
                  type="date"
                  placeholder="Fecha"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  value={putActividad.fecha.toString().substring(0, 10)}
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      fecha: e.target.value,
                    })
                  }
                />
                <span className="font-semibold">Responsable</span>
                <select
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      responsable: e.target.value,
                    })
                  }
                >
                  
                  <option value={(actividad.responsable) ? actividad.responsable._id : null} selected>{(actividad.responsable) ? actividad.responsable.nombre : 'Responsable'}</option>
                  {asistentes.map((asistente) => (
                    <option value={asistente._id}>{asistente.nombre}</option>
                  ))}

                </select>
                
                <div className="flex flex-col space-y-3">
                  <span className="font-semibold">Parvulos</span>
                  <div className="flex flex-col space-y-3">
                    
                    {parvulos.map((parvulo) => (
                      <div className="flex flex-row items-center space-x-3">
                        <input 
                        className="w-5 h-5 default:ring-2"
                        type="checkbox" 
                        onChange={(e) => {
                          
                          if (e.target.checked) {
                            setPutActividad({
                              ...putActividad,
                              parvulos: [...putActividad.parvulos, parvulo._id],
                              });
                          } else {
                            setPutActividad({
                              ...putActividad,
                              parvulos: putActividad.parvulos.filter((parvuloActividad) => parvuloActividad !== parvulo._id),
                            });
                          }
                        }}

                        checked=
                        {
                          putActividad.parvulos.some((parvuloActividad) => parvuloActividad === parvulo._id)
                        }
                        />
                        <p>{parvulo.nombre}</p>
                      </div>
                    ))}                
                  </div>
                </div>
                <div className="flex flex-row justify-end items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white rounded-lg p-2"
                    onClick={updateActividad}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white rounded-lg p-2"
                    onClick={() => setShowModalUpdate(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
    </>
  );
};

export default ModalUpdateActividad;