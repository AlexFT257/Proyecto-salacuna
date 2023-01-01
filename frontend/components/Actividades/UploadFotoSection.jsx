import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import axios from "axios";

export const UploadFotoSection = ({ setShowUploadFotoSection, actividad, setActividadData}) => {
    
    const router = useRouter();
    const oldFoto = actividad.foto;

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        if (!Cookies.get("token")) {
            router.push("/login");
        }
    }, []);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    const upload = async (e) => {
        if(actividad.foto) {
            changeFoto(e);
        } else {
            addFoto(e);
        }
    }

    const changeFoto = async () => {
        e.preventDefault();
        try {
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY, TRUE);
            const formData = new FormData();
            if (selectedFile) {
                formData.append("foto", selectedFile);
                const response = await axios.post(
                    `${process.env.API_URL}/file/${selectedFile.name}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if(response.status !== 200) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal!",
                        timer: 2000,
                    });
                } else {
                    const res = await axios.put(
                        `${process.env.API_URL}/actividad/update/${actividad.id}`,
                        {
                            foto: response.data[0]._id,
                        },
                        {
                            headers: {
                                "X-Caller-Id": decoded.sub,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if(res.status !== 200) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Algo salió mal!",
                            timer: 2000,
                        });
                    } else {
                        const resDel = await axios.delete(
                            `${process.env.API_URL}/file/delete/${oldFoto}`,
                            {
                                headers: {
                                    "X-Caller-Id": decoded.sub,
                                    "Content-Type": "application/json",
                                },
                            }
                        );
                        Swal.fire({
                            icon: "success",
                            title: "Foto actualizada",
                            timer: 2000,
                        });
                        set
                        setShowUploadFotoSection(false);
                        setActividadData({
                            ...actividad,
                            foto: response.data[0]._id,
                        });
                    }
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "No se seleccionó ninguna foto",
                    timer: 2000,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                timer: 2000,
            });
        }
    }

    const addFoto = async () => {
        e.preventDefault();
        try {
            const token = Cookies.get("token");
            const decoded = jwt.decode(token, process.env.SECRET_KEY, TRUE);
            const formData = new FormData();
            if (selectedFile) {
                formData.append("foto", selectedFile);
                const response = await axios.post(
                    `${process.env.API_URL}/file/${selectedFile.name}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if(response.status !== 200) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Algo salió mal!",
                        timer: 2000,
                    });
                } else {
                    const res = await axios.put(
                        `${process.env.API_URL}/actividad/update/${actividad.id}`,
                        {
                            foto: response.data[0]._id,
                        },
                        {
                            headers: {
                                "X-Caller-Id": decoded.sub,
                                "Content-Type": "application/json",
                            },
                        }
                    );
                    if(res.status !== 200) {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Algo salió mal!",
                            timer: 2000,
                        });
                    } else {
                        Swal.fire({
                            icon: "success",
                            title: "Foto actualizada",
                            timer: 2000,
                        });
                        setShowUploadFotoSection(false);
                        setActividadData({
                            ...actividad,
                            foto: response.data[0]._id,
                        });
                    }
                }
            } else {
                Swal.fire({
                    icon: "info",
                    title: "Oops...",
                    text: "No se seleccionó ninguna foto",
                    timer: 2000,
                });
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo salió mal!",
                timer: 2000,
            });
        }
    }

    return (
        <>
            <div className="flex flex-row items-center justify-center space-x-5 mb-5">
                <span className="font-bold">Foto</span>
                <input
                    type="file"
                    placeholder="Foto"
                    className="bg-inherit border-b-2 border-slate-900 rounded-lg p-2"
                    onChange={handleFileChange}
                />
                <button
                    className="bg-slate-900 text-white rounded-lg p-2"
                    onClick={upload}
                >
                    Guardar
                </button>
            </div>
        </>
    );
}





