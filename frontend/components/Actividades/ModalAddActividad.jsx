import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";

export const ModalAddActividad = ({setShowModalAdd, actividades, setActividades}) => {
    const [newActividad, setNewActividad] = useState({
        titulo: "",
        descripcion: "",
        fecha: "",
        responsable: "",
        parvulos: [],
        foto: "",
    });

    const router = useRouter();
    const [selectedFile, setSelectedFile] = useState(null);
    {/*cambiar aufera de la funcion*/}
    useEffect(() => {
        const token = Cookies.get("token");
        if (!token || token === "undefined") {
            router.push("/login");
        }
    }, []);

    const addActividad = async (e) => {
        e.preventDefault();
        try{
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET);
            if(selectedFile){
                const formData = new FormData();
                formData.append("file", selectedFile);
                formData.append("upload_preset", "actividades");
                const res = await axios.post(
                    `${process.env.API_URL}/file/upload/${selectedFile.name}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            "X-Caller-Id": decoded.sub
                        },
                    }
                );
                if(res.status === 201){
                    setNewActividad({
                        ...newActividad,
                        foto: res.data[0]._id,
                    });
                }
            }
            const res = await axios.post(
                `${process.env.API_URL}/actividad`,
                newActividad,
                {
                    headers: {
                        "X-Caller-Id": decoded.sub,
                        "Content-Type": "application/json",	
                    },
                }
            );
            if(res.status === 200){
                setActividades([...actividades, res.data]);
                setShowModalAdd(false);
                Swal.fire({
                    title: "Actividad creada",
                    icon: "success",
                    position: "center",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: "Error al crear actividad",
                    icon: "error",
                    position: "center",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            Swal.fire({
                title: "Error al crear actividad",
                icon: "error",
                position: "center",
                showConfirmButton: false,
                timer: 1500,
            });
        } 
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
      <>
        <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50">
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
            <div className="flex flex-col justify-center items-center m-5 space-y-3">
              <h1 className="text-2xl font-bold">Añadir Actividad</h1>
              <form className=" w-full flex flex-col space-y-3" onSubmit={addActividad}>
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
                <input
                  type="text"
                  placeholder="Responsable"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setNewActividad({
                      ...newActividad,
                      responsable: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Parvulos"
                  className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                  onChange={(e) =>
                    setNewActividad({
                      ...newActividad,
                      parvulos: e.target.value,
                    })
                  }
                />
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
                    onClick={addActividad}
                  >
                    Añadir
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white rounded-lg p-2"
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


        


