import React from "react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Auth } from "../../middleware/auth";
import jwt from "jwt-simple";
import axios from "axios";
import Swal from "sweetalert2";

export const CrearAsistentes = () => {
  useEffect(() => {
    Auth;
  }, []);

  // valores para guardar la foto del asistente que se va a crear
  const [selectFileCreateAsistente, setSelectFileCreateAsistente] =
    useState(null);

  // funcion que se ejecuta al seleccionar una foto y guarda la foto en el state (formulario crear asistente)
  const onFileChangeCreateAsistente = (e) => {
    console.log("onFileChangeCreateAsistente");
    console.log(e.target.files[0]);
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
    foto: "",
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
      // se desencripta el token para obtener el id del usuario que esta creando el asistente
      const token = Cookies.get("token");
      const decoded = jwt.decode(token, process.env.SECRET_KEY);

      // primero se sube la foto al servidor
      const formData = new FormData();
      formData.append("archivos", selectFileCreateAsistente);
      const response = await axios.post(
        `${process.env.API_URL}/file/${selectFileCreateAsistente.name}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // si hay error al subir la foto se muestra un mensaje de error
      if (response.status!==200) {
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al subir foto",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 3000);
      }
      // se agrega el id de la foto al formulario de crear asistente
      setValues({
        ...values,
        foto: response.data[0]._id,
      });
      // si la foto se sube correctamente se crea el asistente
      const userRes = await axios.post(
        `${process.env.API_URL}/asistente`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            "X-Caller-Id": decoded.sub,
          },
        }
      );
      // si hay error al crear el asistente se muestra un mensaje de error
      if (userRes.status!==200) {
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al crear asistente",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 3000);
      }
      // si se crea el asistente correctamente se actualiza la foto del asistente
      const fotoRes = await axios.put(
        `${process.env.API_URL}/asistente/update/${userRes.data.rut}`,
        {
          foto: response.data[0]._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Caller-Id": decoded.sub,
          },
        }
      );
      // si hay error al actualizar la foto se muestra un mensaje de error
      if (fotoRes.status!==200) {
        setTimeout(() => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "Error al actualizar foto",
            showConfirmButton: false,
            timer: 1500,
          });
        }, 3000);
      }
      // si se actualiza la foto correctamente se muestra un mensaje de exito
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Asistente creado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
      // se actualiza la pagina para mostrar el nuevo asistente
      setTimeout(() => {
        window.location.reload();
      }, 1500);


      // si la foto se sube correctamente, se crea el asistente
    } catch (error) {
      console.log("linea 142");
      console.log(error);
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
