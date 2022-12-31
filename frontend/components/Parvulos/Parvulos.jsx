import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
const jwt = require("jwt-simple");
import Swal from "sweetalert2";
import { useState } from "react";

export const parvulos = ({setShowModalAddParvulo,parvulos,setParvulos}) => {
    //MOELO PARVULO PARA EL FORMULARIO
    const [values, setValues] = useState({
        nombre: "",
        apoderado: "",
        rut: "",
        fechaNacimiento: "",
        direccion: "",
        telefonoEmergencia: "",
        condicionesMedicas: "",
        foto: "639ea1b3a638230afce91add",
      });

       const onSubmit = (e) => {
        e.preventDefault();
        console.log(values);
        const token = Cookies.get("token");
        const payload = jwt.decode(token, process.env.SECRET_KEY, true);
        const response = axios.post(
            `${process.env.API_URL}/parvulo`,
            values,
            {
                headers: { "X-Caller-Id": payload.sub},
            }
        );
        console.log(response);
        if(response.status === 200) {
          setParvulos([...parvulos, response.data]);
          setShowModalAddParvulo(false);
            Swal.fire({
                title: "Parvulo creado",
                icon: "success",
                confirmButtonText: "Ok",
            });
        }else {
            Swal.fire({
                title: "Error al crear parvulo",
                icon: "error",
                confirmButtonText: "Ok",
            });
        }
       };

       const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
       };

    return (
      <>
        <div className="modalContainer flex flex-col flex-1 max-md:mt-4 max-md:ml-0">
        <div className="formContainer flex flex-col flex-1   ml-2 mr-2 max-md:mt-4 max-md:ml-0">
          <div className="formBody p rounded-2xl shadow shadow-slate-900 bg-white">
            {/* titulo */}
            <div className="formHeader p-2 pb-0 flex flex-row ml-2">
              <h2 className="formTitle font-bold ">Crear Parvulo</h2>
            </div>

            {/* body */}
            <div className="formItems flex flex-col ">
              <form
                action=""
                id="parvuloForm"
                onSubmit={onSubmit}
                className="formParvulo m-2 mt-0  flex flex-col "
                autoComplete="on"
              >
                <label htmlFor="">Nombre Completo</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  onChange={onChange}
                  placeholder="Nombre"
                />
                  <label htmlFor="">Apoderado</label>
                <input
                  type="text"
                  id="apoderado"
                  name="apoderado"
                  onChange={onChange}
                />
                <label htmlFor="">Rut</label>
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  placeholder="xx.xxx.xxx-x"
                  pattern="^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$"
                  onChange={onChange}
                />
                <label htmlFor="">Fecha de nacimiento</label>
                <input
                  type="date"
                  name="fechaNacimiento"
                  id="fechaNacimiento"
                  onChange={onChange}
                />
                <label htmlFor="">Direccion</label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  onChange={onChange}
                />
                <label htmlFor="">Telefono</label>
                <input
                  type="number"
                  id="telefonoEmergencia"
                  name="telefonoEmergencia"
                  onChange={onChange}
                />
                 <label htmlFor="">Condiciones Medicas</label>
                <input
                  type="text"
                  id="condicionesMedicas"
                  name="condicionesMedicas"
                  onChange={onChange}
                />
                <label htmlFor="">Foto de perfil</label>
                <input
                    type="file"
                    name="foto"
                    id="foto"
                    onChange={onFileChange}
                  />
                <input
                  type="submit"
                  value="Enviar"
                  className="formBtnEnviar  m-2 p-2 pl-4 pr-4  justify-center content-center rounded-full shadow-md shadow-slate-900 "
                />
              </form>
            </div>
          </div>
        </div>

      </div>
      </>

    );
}

