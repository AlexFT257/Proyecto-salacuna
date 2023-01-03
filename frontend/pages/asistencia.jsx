import React from "react";
import { LeftBar } from "../components/LeftBar";
import { Perfil } from "../components/Perfil";
import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import jwt from "jwt-simple";
import Link from "next/link";


export const asistencia = () => {
  const [showModalAddParvulo, setShowModalAddParvulo] = useState(false);
  const [showModalEditParvulo, setShowModalEditParvulo] = useState(false);
  const [ShowModalDeleteParvulo,setShowModalDeleteParvulo] = useState(false);
  const [parvulos, setParvulos] = useState([]);

  const [rut, setRut] = useState("");
  
  const getParvulos = async () => {
      const token = Cookies.get("token");
      const payload = jwt.decode(token, process.env.SECRET_KEY,true);
      const response = await axios.get(`${process.env.API_URL}/parvulos`, {
          headers: { "X-Caller-Id": payload.sub},
      });
      console.log(response);
      setParvulos(response.data);
  };
  useEffect(() => {
      getParvulos();

  }, []);

  const modalDelete = (rut) => {
      setShowModalDeleteParvulo(true);
      setRut(rut);
  };

  const modalEdit = (rut) => {
      setShowModalEditParvulo(true);
      setRut(rut);
  };

  return (
    <div className="flex max-sm:flex-col  h-screen w-screen ">
      <LeftBar />
      <Perfil />
      <div className=" w-screen ">
        {/* title */}
        <div className="flex justify-center">
          <div className="bg-white lg:w-1/2 justify-center flex border-black border-2 rounded-2xl p-2 mx-4 mt-4 shadow shadow-black">
            <h1 className="text-5xl font-bold my-4">Asistencia</h1>
          </div>
        </div>
        {/* body */}
        <div className=" m-4 flex flex-row max-md:flex-col h-fit">
        <div className="flex flex-col w-full h-full ">
                

                <div className="m-4 h-fit">
                    <div className="flex justify-center my-2">
                        <button className="bg-white border-black border-2 rounded-2xl p-3 shadow shadow-slate-900 hover:bg-emerald-300" onClick={() => setShowModalAddParvulo(true)}>
                            Registrar asistencia
                        </button>
                    </div>
                <div className="Parvulotable overflow-auto bg-white border-black border-2 rounded-2xl p-6 shadow mr-2 shadow-slate-900 ">
                    <table className="w-full table-auto">
                        <thead>
                            <tr className="text-left">
                                <th>foto pupilo</th>
                                <th>Nombre pupilo</th>
                                <th>Apellido pupilo</th>
                                <th>Porcentaje de asistencia</th>
                                <th>Lista de clases asistidas</th>
                            </tr>
                        </thead>
                        <tbody className="tableBody">
                            {
                            parvulos.map((parvulo) =>{
                            console.log(parvulos) 
                                return(
                                <tr>
                                    <td><img src="" alt="foto" className="h-20 w-20 max-md:w-10 max-md:h-10 border-2 border-black overflow-hidden rounded-full"/></td>
                                    <td>Nombre Pupilo</td>
                                    <td>Apellido</td>
                                    <td>85%</td>
                                    <td><button><img src="/asterisct_key.png" alt="" /></button></td>
                                    
                                    <td className="flex flex-row mt-2 justify-evenly">
                                    </td>
                                </tr>
                                )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};
export default asistencia;
