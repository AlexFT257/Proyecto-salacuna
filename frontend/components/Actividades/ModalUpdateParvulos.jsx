import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import axios from "axios";

export const ModalUpdateParvulos = ({ actividad, setActividadData, setShowModalUpdateParvulos }) => {
    const [putParvulos, setPutParvulos] = useState(actividad.parvulos.map((parvulo) => parvulo._id));
    const aux = actividad.parvulos.map((parvulo) => parvulo.id);
    const [parvulos, setParvulos] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || token === "undefined") {
            router.push("/");
        }
    }, []);

    const updateParvulos = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY, true);

            let changeParvulos = putParvulos.some((parvulo, index) => parvulo !== aux[index]);
            if(putParvulos.length !== aux.length){
                changeParvulos = true;
            }
            if (changeParvulos) {
                
                console.log(actividad._id);
                const res = await axios.put(
                    `${process.env.API_URL}/actividad/update/${actividad._id}`,
                    {
                        parvulos: putParvulos,
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
                        title: "Parvulos actualizados",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    const parvulosObjects = parvulos.map((parvulo) => {
                        if (putParvulos.includes(parvulo._id)) {
                            return parvulo;
                        }
                    });

                    setActividadData((prev) => ({
                        ...prev,
                        parvulos: parvulosObjects,
                    }));
                    setShowModalUpdateParvulos(false);
                }else{
                    Swal.fire({
                        icon: "error",
                        title: "Error al actualizar parvulos",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "No se han realizado cambios",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Error al actualizar parvulos",
                showConfirmButton: false,
                timer: 1500,
            });
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
        getParvulos();
    }
    , []);

    return (
        <> 
      <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
            <div className="flex flex-col justify-center items-center m-5 space-y-3">
              <h1 className="text-2xl font-bold">Modificar Actividad</h1>
              <form className=" w-full flex flex-col space-y-3" onSubmit={updateParvulos}>
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
                            setPutParvulos([...putParvulos, parvulo._id]);
                          } else {
                            setPutParvulos(putParvulos.filter((parvuloId) => parvuloId !== parvulo._id));
                          }
                        }}
                        checked=
                        {
                            putParvulos.includes(parvulo._id)
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
                    onClick={updateParvulos}
                  >
                    Modificar
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white rounded-lg p-2"
                    onClick={() => setShowModalUpdateParvulos(false)}
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



