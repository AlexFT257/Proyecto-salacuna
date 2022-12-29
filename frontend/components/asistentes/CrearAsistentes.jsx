import React from "react";
import { useEffect,useState } from "react";
import Cookies from "js-cookie";
import {Auth} from "../../middleware/auth"
import jwt from "jwt-simple";
import axios from "axios";

export const CrearAsistentes = () => {
  useEffect(() => {
    Auth;
  }, []);

  // valores para guardar la foto del asistente que se va a crear
  const [selectFileCreateAsistente, setSelectFileCreateAsistente] =
    useState(null);

  // funcion que se ejecuta al seleccionar una foto y guarda la foto en el state (formulario crear asistente)
  const onFileChangeCreateAsistente = (e) => {
    setSelectFileCreateAsistente(e.target.files[0]);
  };

  // valores para el formulario de crear asistente se fuerza el valor de asistente para que no se pueda cambiar y se agrega el id de la foto por defecto
  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    mail: "",
    role: "asistente",
    fechaNa: "",
    domicilio: "",
    telefono: "",
    foto: "639ea1b3a638230afce91add",
  });

  // funcion que se ejecuta al escribir en el input y guarda el valor en el state
  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // funcion que se ejecuta al presionar el boton crear asistente y crea el asistente en la base de datos
  const sendForm = async (e) => {
    e.preventDefault();
    try {
      // la siguiente seccion de codigo decodifica el token para obtener el id del usuario que esta creando el asistente
      const token = Cookies.get("token");
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      // comprobar de que se selecciono una foto para el asistente
      if (selectFileCreateAsistente) {
        // si existe una foto, se sube la foto y se guarda el id de la foto en la base de datos
        const formData = new FormData();
        formData.append("archivos", selectFileCreateAsistente);
        const response = await axios.post(
          `${process.env.API_URL}/file/upload/${selectFileCreateAsistente.name}`,
          formData,
          {
            headers: {
              // se envia el id del usuario que esta creando el asistente (decoded.sub)
              "X-Caller-Id": decoded.sub,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);
        if (response.status === 201) {
          // se guarda el id de la foto en la base de datos
          setValues({
            ...values,
            foto: response.data[0]._id,
          });
        }
      }
      // se crea el asistente en la base de datos con los datos del formulario
      const response = await axios.post(
        `${process.env.API_URL}/asistente`,
        values,
        {
          headers: {
            "X-Caller-Id": decoded.sub,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      // si el asistente se crea correctamente, se muestra un mensaje de exito y se recarga la pagina
      if (response.status === 200) {
        useEffect();
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Asistente creado con exito",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        // si el asistente no se crea correctamente, se muestra un mensaje de error
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Error al crear asistente",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      // si el asistente no se crea correctamente, se muestra un mensaje de error
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Error al crear asistente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <>
      {/* formulario para crear un asistentente de parvulo */}
      <div className="formContainer flex flex-col flex-1   ml-2 mr-2 max-md:mt-4 max-md:ml-0">
        <div className="formBody p rounded-2xl shadow shadow-slate-900 bg-white">
          {/* titulo */}
          <div className="formHeader p-2 pb-0 flex flex-row ml-2">
            <h2 className="formTitle font-bold ">Crear asistente</h2>
          </div>

          {/* body */}
          <div className="formItems flex flex-col ">
            <form
              action=""
              id="asistente"
              onSubmit={sendForm}
              className="formAsistente m-2 mt-0  flex flex-col "
              autoComplete="on"
            >
              <label htmlFor="">Nombre</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                onChange={onChange}
                placeholder="Nombre"
              />
              <label htmlFor="">Apellido</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                onChange={onChange}
                placeholder="Apellido"
              />
              <label htmlFor="">Rut</label>
              <input
                type="text"
                id="rut"
                name="rut"
                onChange={onChange}
                placeholder="xx.xxx.xxx-x"
                pattern="^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$"
              />
              <label htmlFor="">Mail</label>
              <input
                type="text"
                id="mail"
                name="mail"
                onChange={onChange}
                placeholder="correo@mail.com"
                pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
              />
              <label htmlFor="">Fecha de nacimiento</label>
              <input
                type="date"
                name="fechaNa"
                id="fechaNa"
                onChange={onChange}
              />
              <label htmlFor="">Direccion</label>
              <input
                type="text"
                id="domicilio"
                name="domicilio"
                onChange={onChange}
              />
              <label htmlFor="">Telefono</label>
              <input
                type="number"
                id="telefono"
                name="telefono"
                onChange={onChange}
              />
              <label htmlFor="">Foto de perfil</label>
              <input
                type="file"
                name="foto"
                id="foto"
                onChange={onFileChangeCreateAsistente}
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
    </>
  );
};
export default CrearAsistentes;
