import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import axios from "axios";

export const ModalAddActividad = ({setShowModalAdd, actividades, setActividades}) => {
    const [newActividad, setNewActividad] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        responsable: "",
        parvulos: [],
        foto: "",
    });
    
    const [parvulos, setParvulos] = useState([]);
    const [asistentes, setAsistentes] = useState([]);

    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || token === "undefined") {
            router.push("/login");
        }
    }, []);

    const addActividad = async (e) => {
      e.preventDefault();
      try {
        const token = Cookies.get("token");
        const decoded = jwt.decode(token, process.env.SECRET_KEY, true);
        const formData = new FormData();
        if(selectedFile){
          formData.append("archivos", selectedFile);
          const response = await axios.post(
            `${process.env.API_URL}/file/${selectedFile.name}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              }
            }
          );
          if (response.status !== 201){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al subir foto",
              timer: 1500,
            });
          }else{
            const res = await axios.post(
              `${process.env.API_URL}/actividad`,
              {
                titulo: newActividad.titulo,
                descripcion: newActividad.descripcion,
                fecha: newActividad.fecha,
                responsable: newActividad.responsable,
                parvulos: newActividad.parvulos,
                foto: response.data[0]._id,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "X-Caller-Id": decoded.sub,
                },
              }
            );
            if (res.status !== 201) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error al crear la actividad",
                timer: 1500,
              });
            }else{
              const responsable = asistentes.find((asistente) => asistente._id === newActividad.responsable);
              const parvulosActividad = newActividad.parvulos.map((parvulo) => {
                return asistentes.find((asistente) => asistente._id === parvulo);
              });
              const actividad = {
                _id: res.data._id,
                titulo: res.data.titulo,
                descripcion: res.data.descripcion,
                fecha: res.data.fecha,
                responsable: responsable,
                parvulos: parvulosActividad,
                foto: res.data.foto,
              };
              setActividades([...actividades, actividad]);
              setShowModalAdd(false);
              Swal.fire({
                icon: "success",
                title: "Actividad creada",
                text: "La actividad ha sido creada exitosamente",
                timer: 1500,
              });
            }
          }
        }else{
          const res = await axios.post(
            `${process.env.API_URL}/actividad`,
            {
              titulo: newActividad.titulo,
              descripcion: newActividad.descripcion,
              fecha: newActividad.fecha,
              responsable: newActividad.responsable,
              parvulos: newActividad.parvulos,
            },
            {
              headers: {
                "Content-Type": "application/json",
                "X-Caller-Id": decoded.sub,
              },
            }
          );
          if (res.status !== 201) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Error al crear la actividad",
              timer: 1500,
            });
          }else{
            const responsable = asistentes.find((asistente) => asistente._id === newActividad.responsable);
            const parvulosActividad = parvulos.filter((parvulo) => newActividad.parvulos.includes(parvulo._id));
            setActividades([...actividades, 
              {
                _id: res.data._id,
                titulo: res.data.titulo,
                descripcion: res.data.descripcion,
                fecha: res.data.fecha,
                responsable: responsable,
                parvulos: parvulosActividad,
                foto: res.data.foto,
              }
            ]);
            setShowModalAdd(false);
            Swal.fire({
              icon: "success",
              title: "Actividad creada",
              text: "La actividad ha sido creada exitosamente",
              timer: 1500,
            });
          }
        }
      } catch (error) {        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al crear la actividad",
          timer: 1500,
        });        
      }
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const getAsistentes = async () => {
        const token = Cookies.get("token");
        const decoded = jwt.decode(token, process.env.SECRET_KEY, true);
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
        const decoded = jwt.decode(token, process.env.SECRET_KEY, true);
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
          <div className="absolute inset-0 mx-auto my-auto w-1/2 max-md:w-11/12 h-5/6  max-md:h-full overflow-y-auto bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
            <div className="flex flex-col justify-center items-center m-5 space-y-3">
              <h1 className="text-2xl font-bold">Añadir Actividad</h1>
              <form className=" w-full flex flex-col space-y-3" onSubmit={addActividad}>
                <span className="font-semibold">Titulo</span>
                <input
                  type="text"
                  placeholder="Titulo"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                  onChange={(e) =>
                    setNewActividad({
                      ...newActividad,
                      titulo: e.target.value,
                    })
                  }
                />
                <span className="font-semibold">Descripcion</span>                
                <input
                  type="text"
                  placeholder="Descripcion"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setNewActividad({
                      ...newActividad,
                      descripcion: e.target.value,
                    })
                  }
                />
                <span className="font-semibold">Fecha</span>
                <input
                  type="date"
                  placeholder="Fecha"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setNewActividad({
                      ...newActividad,
                      fecha: e.target.value,
                    })
                  }
                />
                <span className="font-semibold">Responsable</span>
                <select
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setNewActividad({
                      ...newActividad,
                      responsable: e.target.value,
                    })
                  }
                >
                  <option value="" disabled selected>Responsable</option>
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
                            if(e.target.checked)
                            {
                                setNewActividad({
                                    ...newActividad,
                                    parvulos: [...newActividad.parvulos, parvulo._id]
                                })
                            } else {
                                setNewActividad({
                                    ...newActividad,
                                    parvulos: newActividad.parvulos.filter(parvuloId => parvuloId !== parvulo._id)
                                })
                            }
                        }}
                        />
                        <p>{parvulo.nombre}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <span className="font-semibold">Foto</span>
                <input
                  type="file"
                  placeholder="Foto"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={handleFileChange}
                />
                <div className="flex flex-row justify-end items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-2"
                    onClick={addActividad}
                  >
                    Añadir
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
                    onClick={() => setShowModalAdd(false)}
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


        


