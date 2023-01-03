import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import axios from "axios";

export const ModalUpdateResponsable = ({ actividad, setActividadData, setShowModalUpdateResponsable }) => {
    const [putResponsable, setPutResponsable] = useState((actividad.responsable) ? actividad.responsable._id : "");
    const aux = (actividad.responsable) ? actividad.responsable._id : "";
    const [responsables, setResponsables] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || token === "undefined") {
            router.push("/");
        }
    }, []);

    const updateResponsable = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY, true);

            let changeResponsable = putResponsable !== aux;
            if (changeResponsable) {
                const res = await axios.put(
                    `${process.env.API_URL}/actividad/update/${actividad._id}`,
                    {
                        responsable: putResponsable,
                    },
                    {
                        headers: {
                            "X-Caller-Id": decoded.sub,
                            "Content-Type": "application/json",
                        },
                    }
                );

                if (res.status === 200) {
                    Swal.fire({
                        icon: "success",
                        title: "Responsable actualizado",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const responsableObject = responsables.find((responsable) => responsable._id === putResponsable);
                    console.log(responsableObject);
                    const newActividad = {
                        ...actividad,
                        responsable: responsableObject,
                    };
                    setActividadData(newActividad);
                    setShowModalUpdateResponsable(false);
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Error al actualizar responsable",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No se ha realizado ningún cambio",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar responsable",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const getAsistentes = async () => {
        const token = Cookies.get("token");
        const decoded = jwt.decode(token, process.env.SECRET_KEY, true);
        const res = await axios.get(`${process.env.API_URL}/asistentes`, {
            headers: {
                "X-Caller-Id": decoded.sub,
            },
        });
        if (res.status === 200) {
            setResponsables(res.data);
        }
      };

    useEffect(() => {
        getAsistentes();
    }, []);

    return (
        <> 
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 max-md:w-11/12 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
            <div className="flex flex-col justify-center items-center m-5 space-y-3">
              <h1 className="text-2xl font-bold">Modificar responsable de la Actividad</h1>
              <form className=" w-full flex flex-col space-y-3" onSubmit={updateResponsable}>
                <span className="font-semibold">Responsable</span>
                <select
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setPutResponsable(e.target.value)
                    }
                >
                  <option value={(actividad.responsable) ? actividad.responsable._id : null} selected>{(actividad.responsable) ? actividad.responsable.nombre : 'Responsable'}</option>
                  {
                    responsables.map((responsable) => {
                        return (
                            <option 
                                value={responsable._id}
                                hidden={((actividad.responsable) && actividad.responsable._id === responsable._id ) ? true : false}
                            >{responsable.nombre}</option>
                        )
                    })
                  }
                </select>
                
                <div className="flex flex-row justify-end items-center space-x-3">
                  <button
                    type="submit"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg p-2"
                    onClick={updateResponsable}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-2"
                    onClick={() => setShowModalUpdateResponsable(false)}
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
