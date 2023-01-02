import Cookies from "js-cookie";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import axios from "axios";
const jwt = require("jwt-simple");

export const ModalUpdateInfo = ({ actividad, setShowModalUpdateInfo, setActividadData}) => {
    const [putActividad, setPutActividad] = useState({
        titulo: actividad.titulo,
        descripcion: actividad.descripcion,
        fecha: actividad.fecha,
    });

    const [aux, setAux] = useState({
        titulo: actividad.titulo,
        descripcion: actividad.descripcion,
        fecha: actividad.fecha,
    });

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || token === "undefined") {
            router.push("/");
        }
    }, []);

    const updateInfo = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY, true);

            const changeInfo = Object.values(putActividad).some(
                (value, index) => value !== Object.values(aux)[index]
            );
            console.log(changeInfo);
            if (changeInfo) {
                // const filteredActividad, objeto que tiene los datos que se van a actualizar, datos que estan en put actividad y no en aux
                const filteredActividad = Object.keys(putActividad).reduce(
                    (obj, key) => {
                        if (putActividad[key] !== aux[key]) {
                            obj[key] = putActividad[key];
                        }
                        return obj;
                    },
                    {}
                );
                console.log(filteredActividad);
                console.log(actividad._id);
                const res = await axios.put(
                    `${process.env.API_URL}/actividad/update/${actividad._id}`,
                    filteredActividad,
                    {
                        headers: {
                            "X-Caller-Id": decoded.sub,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const data = await res.data;

                if (res.status === 200) {
                    Swal.fire({
                        title: "Actividad actualizada",
                        icon: "success",
                        confirmButtonText: "Aceptar",
                    });
                    setActividadData({
                        ...actividad,
                        ...filteredActividad,
                    });
                    setShowModalUpdateInfo(false);
                }
            } else {
                Swal.fire({
                    title: "No hay cambios",
                    icon: "info",
                    confirmButtonText: "Aceptar",
                });
            }
        } catch (error) {
            Swal.fire({
                title: error,
                icon: "error",
                confirmButtonText: "Aceptar",
            });
        }
    };

    return (
        <> 
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 max-md:w-11/12 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
            <div className="flex flex-col justify-center items-center m-5 space-y-3">
              <h1 className="text-2xl font-bold">Modificar Actividad</h1>
              <form className=" w-full flex flex-col space-y-3" onSubmit={updateInfo}>
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
                
                <div className="flex flex-row justify-end items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-2"
                    onClick={updateInfo}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
                    onClick={() => setShowModalUpdateInfo(false)}
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







