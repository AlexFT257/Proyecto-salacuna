import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import axios from "axios";

export const ModalUpdateActividad = ({setShowModalUpdate, actividades, setActividades, actividad}) => {
  const [putActividad, setPutActividad] = useState({
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

  const updateActividad = async (e) => {
    e.preventDefault();
    try{
      const token = Cookies.get("token");
      const decoded = jwt.decode(token, process.env.SECRET, true);

      if(selectedFile){
        const formData = new FormData();
        formData.append("file", selectedFile);

        const res = await axios.post(
          `${process.env.API_URL}/file/${selectedFile.name}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-Caller-Id": decoded.sub
            },
          }
        );
        if(res.status === 201){
          setPutActividad({
            ...putActividad,
            foto: res.data[0]._id,
          });
        }
      }

      const emptyValues = Object.values(putActividad).some((x) => (x === null || x === ""));

      if(emptyValues){
        const filteredPutActividad = Object.fromEntries(
          Object.entries(putActividad).filter(([key, value]) => value !== null && value !== "")
        )

        const res = await axios.put(
          `${process.env.API_URL}/actividad/update/${actividad._id}`,
          filteredPutActividad,
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
            timer: 1500,
          });
          setShowModalAdd(false);
          setActividades(actividades.map((actividad) => {
            if(actividad._id === res.data._id){
              return res.data;
            }else{
              return actividad;
            }
          }));
        }
      }else{
        const res = await axios.put(
          `${process.env.API_URL}/actividad/update/${actividad._id}`,
          putActividad,
          {
            headers: {
              "X-Caller-Id": decoded.sub,
              "Content-Type": "application/json"
            },
          }
        );
        if(res.status === 200){
          Swal.fire({
            title: "Actividad actualizada",
            icon: "success",
            position: "center",
            showConfirmButton: false,
            timer: 1500,
          });
          setShowModalAdd(false);
          setActividades(actividades.map((actividad) => {
            if(actividad._id === res.data._id){
              return res.data;
            }else{
              return actividad;
            }
          }));
        }
      }
    }catch(err){
      console.log(err);
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
                <input
                  type="text"
                  placeholder="Titulo"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                  value={actividad.titulo}
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      titulo: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Descripcion"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  value={actividad.descripcion}
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      descripcion: e.target.value,
                    })
                  }
                />
                <input
                  type="date"
                  placeholder="Fecha"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  value={actividad.fecha}
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
                      fecha: e.target.value,
                    })
                  }
                />
                
                <select
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setPutActividad({
                      ...putActividad,
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
                  <h1 className="text-xl font-bold">Parvulos</h1>
                  <div className="flex flex-col space-y-3">
                    {parvulos.map((parvulo) => (
                      <div className="flex flex-row items-center space-x-3">
                        <input 
                        className="w-5 h-5 default:ring-2"
                        type="checkbox" 
                        onChange={(e) => {
                            if(e.target.checked)
                            {
                                setPutActividad({
                                    ...putActividad,
                                    parvulos: [...putActividad.parvulos, parvulo._id]
                                })
                            } else {
                                setPutActividad({
                                    ...putActividad,
                                    parvulos: putActividad.parvulos.filter(parvuloId => parvuloId !== parvulo._id)
                                })
                            }
                        }}
                        />
                        <p>{parvulo.nombre}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <input
                  type="file"
                  placeholder="Foto"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={handleFileChange}
                />
                <div className="flex flex-row justify-end items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 text-white rounded-lg p-2"
                    onClick={updateActividad}
                  >
                    Añadir
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