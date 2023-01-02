import { useRouter } from "next/router";
import { LeftBar } from "../../components/LeftBar";
import { useState, useEffect } from "react";
import { Perfil } from "../../components/Perfil";
import Link from "next/link";
import axios from "axios";
import { ModalUpdateInfo } from "../../components/Actividades/ModalUpdateInfo";
import { ModalUpdateParvulos } from "../../components/Actividades/ModalUpdateParvulos";
import { ModalUpdateResponsable } from "../../components/Actividades/ModalUpdateResponsable";
import { UploadFotoSection } from "../../components/Actividades/UploadFotoSection";
import Head from "next/head";
import { UserContext } from "../../contexts/userContext";
import { useContext } from "react";

export default function Actividad() {
  const router = useRouter();
  const [actividad, setActividad] = useState("");
  const [actividadData, setActividadData] = useState({});
  const [seccion, setSeccion] = useState("info");

  const [showModalUpdateInfo, setShowModalUpdateInfo] = useState(false);
  const [showModalUpdateParvulos, setShowModalUpdateParvulos] = useState(false);
  const [showModalUpdateResponsable, setShowModalUpdateResponsable] =
    useState(false);
  const [showUploadFotoSection, setShowUploadFotoSection] = useState(false);

  const { user } = useContext(UserContext);

  useEffect(() => {
    setActividad(router.query.actividad);
  }, [router.query.actividad]);

  useEffect(() => {
    const getActividad = async () => {
      const res = await axios.get(
        `${process.env.API_URL}/actividad/search/${actividad}`
      );
      const data = await res.data;
      if (res.status === 200) {
        setActividadData(data);
      }
    };
    if (actividad) {
      getActividad();
    }
  }, [actividad]);

  const picture = (id, type) => {
    const pic = id ? `${process.env.API_URL}/file/download/${id}` : "";
    if (type === "parvulo") {
      return (
        <img
          src={pic}
          alt="Foto Parvulo"
          className="text-xs w-10 h-10 rounded-full border-2 border-black"
        />
      );
    } else if (type === "actividad") {
      return (
        <img
          src={pic}
          alt="
                Foto Actividad"
          className="text-xs rounded-2xl border-2 border-black shadow-md shadow-slate-900 max-h-max w-auto"
        />
      );
    } else if (type === "responsable") {
      return (
        <img
          src={pic}
          alt="
                Foto Responsable"
          className="text-xs h-36 w-36 rounded-2xl border-2 border-black justify-self-center"
        />
      );
    }
  };

  const switchRender = (value) => {
    const fecha = new Date(actividadData.fecha).toLocaleDateString();
    switch (value) {
      case "info":
        return (
          <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-bold">Informacion</h1>
              {user.role !== "apoderado" && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModalUpdateInfo(true)}
                >
                  Editar
                </button>
              )}
            </div>
            <div className="flex flex-row">
              <p className="text-xl">Titulo: {actividadData.titulo}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-xl">Fecha: {fecha}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-xl">
                Descripcion: {actividadData.descripcion}
              </p>
            </div>
          </div>
        );
      case "parvulos":
        if (!actividadData.parvulos || actividadData.parvulos.length === 0) {
          return (
            <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
              <div className="flex flex-col">
                <div className="flex flex-row justify-between">
                  <h1 className="text-3xl font-bold">Parvulos</h1>
                  {user.role !== "apoderado" && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setShowModalUpdateParvulos(true)}
                    >
                      Editar
                    </button>
                  )}
                </div>
                <div className="flex flex-row">
                  <p className="text-xl">No hay parvulos inscritos</p>
                </div>
              </div>
            </div>
          );
        }

        return (
          <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Parvulos</h1>
                {user.role !== "apoderado" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowModalUpdateParvulos(true)}
                  >
                    Editar
                  </button>
                )}
              </div>
              <table className="w-full table-auto">
                <thead>
                  <tr className="text-left">
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Rut</th>
                    <th>Edad</th>
                  </tr>
                </thead>
                <tbody>
                  {actividadData.parvulos.map((parvulo) => {
                    const edad =
                      new Date().getFullYear() -
                      new Date(parvulo.fechaNacimiento).getFullYear();
                    return (
                      <tr>
                        <td> {picture(parvulo.foto, "parvulo")} </td>
                        <td>{parvulo.nombre}</td>
                        <td>{parvulo.rut}</td>
                        <td>{edad}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "responsable":
        if (!actividadData.responsable) {
          return (
            <div className="flex flex-col">
              <div className="flex flex-row justify-between">
                <h1 className="text-3xl font-bold">Responsable</h1>
                {user.role !== "apoderado" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowModalUpdateResponsable(true)}
                  >
                    Editar
                  </button>
                )}
              </div>
              <div className="flex flex-row">
                <p className="text-xl">No hay responsable asignado</p>
              </div>
            </div>
          );
        }

        return (
          <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
            <div className="flex flex-row justify-between">
              <h1 className="text-3xl font-bold">Responsable</h1>
              {user.role !== "apoderado" && (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setShowModalUpdateResponsable(true)}
                >
                  Editar
                </button>
              )}
            </div>
            <div className="flex flex-row max-md:flex-col">
              <div className="flex-1">
                <div className="flex flex-row">
                  <div className="flex flex-col">
                    <p className="text-xl">
                      Nombre:{" "}
                      {actividadData.responsable.nombre +
                        " " +
                        actividadData.responsable.apellido}
                    </p>
                    <p className="text-xl">
                      Rut: {actividadData.responsable.rut}
                    </p>
                    <p className="text-xl">
                      Telefono: {actividadData.responsable.telefono}
                    </p>
                    <p className="text-xl">
                      Correo: {actividadData.responsable.mail}
                    </p>
                    <p className="text-xl">
                      Rol:{" "}
                      {actividadData.responsable.role === "asistente"
                        ? "Asistente de Parvulo"
                        : "Parvularia"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 justify-items-center">
                {picture(actividadData.responsable.foto, "responsable")}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-white border-black border-2 rounded-2xl p-4 shadow-md shadow-slate-900 h-full">
            <div className="flex flex-row">
              <h1 className="text-3xl font-bold">Informacion</h1>
            </div>
            <div className="flex flex-row">
              <p className="text-xl">Fecha: {fecha}</p>
            </div>
            <div className="flex flex-row">
              <p className="text-xl">
                Descripcion: {actividadData.descripcion}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      <div className="flex max-sm:flex-col h-screen w-screen ">
        <Head>
          <title>{actividadData.titulo} </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <LeftBar />
        <div className="w-full">
          {/* title */}
          <div className="flex justify-center">
            <div className="bg-white lg:w-1/2 justify-center flex border-black border-2 rounded-2xl p-2 mx-4 mt-4 shadow shadow-black">
              <h1 className="text-5xl font-bold my-4">
                Actividad: {actividadData.titulo}
              </h1>
            </div>
          </div>
          {/*Left tab bar with thre buttons(Info, Parvulos, Responsable) and the right side is the content of the button selected use the switchRender function to render the content*/}
          <div className="w-full xl:w-3/4 xl:mx-auto">
            <Link href="/actividades">
              <div className="flex justify-end mx-4 mt-6">
                <button className="bg-white border-black border-2 rounded-xl p-3 shadow shadow-black hover:bg-teal-200 hover:shadow-md hover:shadow-black">
                  Regresar Actividades
                </button>
              </div>
            </Link>
            <div className="flex flex-row max-md:flex-col space-x-4 max-md:space-y-4 max-md:space-x-0 mx-4 max-md:my-4">
              <div className="flex flex-col max-md:flex-row w-1/4 max-md:w-full space-y-4 max-md:space-y-0 max-md:space-x-4 max-md:justify-center my-4 max-md:my-0">
                <button
                  className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-teal-200 hover:shadow-md hover:shadow-black"
                  onClick={() => setSeccion("info")}
                >
                  Informacion
                </button>
                <button
                  className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-teal-200 hover:shadow-md hover:shadow-black"
                  onClick={() => setSeccion("parvulos")}
                >
                  Parvulos
                </button>
                <button
                  className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-teal-200 hover:shadow-md hover:shadow-black"
                  onClick={() => setSeccion("responsable")}
                >
                  Responsable
                </button>
              </div>
              <div className="flex flex-col w-3/4 max-md:w-full my-4">
                {switchRender(seccion)}
              </div>
            </div>
            <div className="flex flex-row mx-4 h-auto">
              {actividadData.foto ? (
                <div className="w-full space-y-4 mb-4">
                  {user.role !== "apoderado" && (
                    <div className="bg-white border-black border-2 rounded-2xl shadow-md shadow-slate-900 w-full">
                      <div className="flex flex-row justify-center space-x-6 py-4">
                        <button
                          className="text-black hover:text-blue-600"
                          onClick={() => setShowUploadFotoSection(true)}
                        >
                          Cambiar foto
                        </button>
                      </div>
                      {showUploadFotoSection && (
                        <UploadFotoSection
                          setShowUploadFotoSection={setShowUploadFotoSection}
                          setActividadData={setActividadData}
                          actividad={actividadData}
                        />
                      )}
                    </div>
                  )}
                  <div className="flex flex-row justify-center">
                    {picture(actividadData.foto, "actividad")}
                  </div>
                </div>
              ) : (
                <div className="bg-white border-black border-2 rounded-2xl shadow-md shadow-slate-900 w-full">
                  <div className="flex flex-row justify-center space-x-6 py-4">
                    <p>No se ha añadido foto de esta actividad :(</p>
                    {user.role !== "apoderado" && (
                      <button
                        className="text-black hover:text-blue-600"
                        onClick={() => setShowUploadFotoSection(true)}
                      >
                        Agregar foto :)
                      </button>
                    )}
                  </div>
                  {showUploadFotoSection && (
                    <UploadFotoSection
                      setShowUploadFotoSection={setShowUploadFotoSection}
                      setActividadData={setActividadData}
                      actividad={actividadData}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <Perfil />
      </div>
      {showModalUpdateInfo && (
        <ModalUpdateInfo
          actividad={actividadData}
          setShowModalUpdateInfo={setShowModalUpdateInfo}
          setActividadData={setActividadData}
        />
      )}
      {showModalUpdateParvulos && (
        <ModalUpdateParvulos
          actividad={actividadData}
          setShowModalUpdateParvulos={setShowModalUpdateParvulos}
          setActividadData={setActividadData}
        />
      )}
      {showModalUpdateResponsable && (
        <ModalUpdateResponsable
          actividad={actividadData}
          setShowModalUpdateResponsable={setShowModalUpdateResponsable}
          setActividadData={setActividadData}
        />
      )}
    </>
  );
}
