import { useRouter } from "next/router";
import { LeftBar } from "../../components/LeftBar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import { Perfil } from "../../components/Perfil";
import Link from "next/link";
import axios from "axios";
import { ModalViewActividad } from "../../components/Parvulos/viewActividad";
import { ModalViewApoderado } from "../../components/Parvulos/viewApoderado";

export default function Parvulo() {
  const router = useRouter();
  const [parvulo, setParvulo] = useState("");
  const [dataParvulo, setDataParvulo] = useState({});
  const [showModalViewActividad, setShowModalViewActividad] = useState(false);
  const [showModalViewApoderado, setShowModalViewApoderado] = useState(false);

  useEffect(() => {
    setParvulo(router.query.parvulo);
  }, [router.query.parvulo]);

  useEffect(() => {
    const getParvulo = async () => {
      const token = Cookies.get("token");
      const payload = jwt.decode(token, process.env.SECRET_KEY, true);
      const response = await axios.get(
        `${process.env.API_URL}/parvulo/search/${parvulo}`,
        {
          headers: { "X-Caller-Id": payload.sub },
        }
      );
      const data = await response.data;
      if (response.status === 200) {
        setDataParvulo(data);
      } else {
        router.push("/parvulos");
      }
    };
    if (parvulo) {
      getParvulo();
    }
  }, [parvulo]);

  const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString("es-ES");
    };

  return (
    <>
      <div className="flex max-sm:flex-col  h-screen w-screen ">
        <LeftBar />
        <Perfil />
        <div className=" w-full">
          <div className="flex justify-center">
            <div className="bg-white lg:w-1/2 justify-center flex border-black border-2 rounded-2xl p-2 mx-4 mt-4 shadow shadow-black">
              <h1 className="text-5xl font-bold my-4 ">Parvulos</h1>
            </div>
          </div>
          <div className="m-4 flex justify-center">
            <div className="flex  justify-center md:w-1/2 h-fit bg-white rounded-2xl border-2 border-slate-900 shadow-lg shadow-slate-900">
              <div className="modal-content flex flex-col flex-grow    m-5 space-y-3">
                <div className="modal-header flex justify-center">
                  <h5
                    className="modal-title justify-center font-bold text-2xl"
                    id="exampleModalLabel "
                  >
                    Parvulo : {dataParvulo.nombre}
                  </h5>
                </div>
                <div className=" w-full flex flex-col space-y-3">
                  <table className="formAsistente m-2 mt-0  flex flex-col ">
                    <label className="">Nombre</label>
                    <td
                      type="text"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {" "}
                      {dataParvulo.nombre}
                    </td>
                    <label className="form-label">Apoderado</label>
                    <td
                      type="text"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {dataParvulo.apoderado}
                    </td>

                    <label className="form-label">Rut</label>
                    <td
                      type="text"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {" "}
                      {dataParvulo.rut}
                    </td>
                    <label className="form-label">Fecha de Nacimiento</label>
                    <tb
                      type="date"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {" "}
                      {formatDate(dataParvulo.fechaNacimiento)}
                    </tb>
                    <label className="form-label">Direccion</label>
                    <td
                      type="text"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {" "}
                      {dataParvulo.direccion}
                    </td>

                    <label className="form-label">Telefono Emergencia</label>
                    <td
                      type="text"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {" "}
                      {dataParvulo.telefonoEmergencia}
                    </td>

                    <label>Condiciones Medicas</label>
                    <td
                      type="text"
                      className="form-control bg-inherit border-b-2 border-slate-900 rounded-lg p-2 focus:outline-emerald-600"
                    >
                      {" "}
                      {dataParvulo.condicionesMedicas}
                    </td>
                  </table>
                  <div className="modal-footer">
                    <Link href="/parvulos">
                      <button
                        type="button"
                        className="btn btn-secondary bg-red-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900"
                        data-bs-dismiss="modal"
                      >
                        Volver
                      </button>
                    </Link>

                    <button
                      onClick={() => setShowModalViewActividad(true)}
                      className="btn btn-primary bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900"
                    >
                      Ver acticvidades
                    </button>

                    <button
                      className="btn btn-primary bg-green-500 rounded-2xl p-3 text-white border-2 border-white hover:text-slate-900 hover:border-slate-900"
                      onClick={() => setShowModalViewApoderado(true)}
                    >
                      Ver apoderado
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {showModalViewActividad && (
              <ModalViewActividad
                parvulo={parvulo}
                setShowModalViewActividad={setShowModalViewActividad}
                dataParvulo={dataParvulo}
              />
            )}
            {showModalViewApoderado && (
              <ModalViewApoderado
                dataParvulo={dataParvulo}
                setShowModalViewApoderado={setShowModalViewApoderado}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
