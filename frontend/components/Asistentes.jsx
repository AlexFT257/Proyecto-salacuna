import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkToken } from "../data/user";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const jwt = require("jwt-simple");

export const Asistentes = () => {
  const [asistentes, setAsistentes] = useState([]);

  // funcion que se ejecuta al cargar la pagina, para obtener los asistentes de la base de datos
  const getAsistentes = async () => {
    const token = Cookies.get("token");
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    const response = await axios.get(`${process.env.API_URL}/asistentes`, {
      headers: { "X-Caller-Id": decoded.sub },
    });
    console.log(response);
    setAsistentes(response.data);
  };

  // se ejecuta la funcion getAsistentes al cargar la pagina
  useEffect(() => {
    getAsistentes();
  }, []);

  // funcion que se ejecuta al presionar el boton eliminar y elimina el asistente de la base de datos
  const deleteAsistente = async (rut) => {
    try {
      const token = Cookies.get("token");
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      const response = await axios.delete(
        `${process.env.API_URL}/asistente/delete/${rut}`,
        { headers: { "X-Caller-Id": decoded.sub } }
      );
      console.log(response);
      if (response.status == 200) {
        useEffect();
        alert("Asistente eliminado");
      } else {
        alert("Error al eliminar el usuario");
      }
    } catch (error) {
      alert(" error en al eliminar");
    }
  };

  // funcion que se ejecuta al presionar el boton editar y edita el asistente de la base de datos
  const showAsistentes = () => {
    return asistentes.map((asistente) => {

      // si el asistente tiene foto, se muestra la foto, si no, se muestra la foto por defecto
      const profilePic = asistente.foto
        ? `${process.env.API_URL}/file/download/${asistente.foto}`
        : "/user.png";

      return (
        <tr key={asistente._id}>
          <td>
            <img
              src={profilePic}
              alt="foto"
              className="asistenteFoto h-10 w-10 max-md:w-6 max-md:h-6 overflow-hidden rounded-full "
            />
          </td>
          <td>{asistente.nombre}</td>
          <td>{asistente.apellido}</td>
          <td>{asistente.rut}</td>
          <td>{asistente.mail}</td>
          <td className=" flex justify-evenly ">
            <button
              className="delButton"
              onClick={() => {
                deleteAsistente(asistente.rut);
              }}
            >
              <img src="/minus_key.png" alt="" className=" h-6 w-6" />
            </button>
            <button
              className="editButton"
              onClick={() => togglePopUp(asistente.rut)}
            >
              <img src="/asterisct_key.png" alt="" className="h-6 w-6" />
            </button>
          </td>
        </tr>
      );
    });
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
          });
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

  // valores para mostrar el formulario de editar asistente
  const [showForm, setShowForm] = useState(false);

  // funcion que se ejecuta al presionar el boton editar asistente y muestra el formulario de editar asistente
  const togglePopUp = (editRut) => {
    console.log(editRut);
    setEditValues({
      ...editValues,
      rut: editRut,
    });
    setShowForm(!showForm);
  };

  // funcion que se ejecuta al presionar el boton editar asistente y muestra el rut del asistente que se va a editar en el formulario (no se puede editar el rut)
  const getRutInput = () => {
    return (
      <>
        <label htmlFor="">Rut</label>
        <input
          type="text"
          id="rut"
          name="rut"
          placeholder="XX.XXX.XXX-X"
          pattern="^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$"
          readOnly
          value={editValues.rut}
        />
      </>
    );
  };

  // valores para editar asistente
  const [editValues, setEditValues] = useState({
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
  const onChangeEdit = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
  };

  // valores para guardar la foto del asistente que se va a editar
  const [selectedFile, setSelectedFile] = useState(null);

  // funcion que se ejecuta al seleccionar una foto y guarda la foto en el state
  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  // valores para guardar la foto del asistente que se va a crear
  const [selectFileCreateAsistente, setSelectFileCreateAsistente] = useState(null);
  
  // funcion que se ejecuta al seleccionar una foto y guarda la foto en el state (formulario crear asistente)
  const onFileChangeCreateAsistente = (e) => {
    setSelectFileCreateAsistente(e.target.files[0]);
  };

  // funcion que se ejecuta al presionar el boton editar asistente y envia los datos del formulario al backend
  const sendEditForm = async (e) => {
    e.preventDefault();
    try {
      // se decodifica el token para obtener el id del usuario que esta creando el asistente
      const token = Cookies.get("token");
      const payload = jwt.decode(token, process.env.SECRET_KEY);
      // si se selecciono un archivo se envia el archivo
      if (selectedFile) {
        // se crea un formdata para enviar el archivo
        const formData = new FormData();
        formData.append("archivos", selectedFile);
        console.log(formData);
        // se envia el archivo al backend
        const response = await axios.post(
          `${process.env.API_URL}/file/${selectedFile.name}`,
          formData,
          {
            headers: {
              // se envia el id del usuario que esta creando el asistente en el header (payload.sub)
              "X-Caller-Id": payload.sub,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Respose foto: ");
        console.log(response.data[0]._id);
        console.log(response.status);
        // si el archivo se sube correctamente se guarda el id del archivo en el state
        if (response.status === 201) {
          setEditValues({
            ...editValues,
            foto: response.data[0]._id,
          });
        }
      }

      // verifica si hay valores vacios en el formulario
      const emptyValues = Object.values(editValues).some(
        (value) => value === ""
      );
      console.log("emptyValues");
      console.log(emptyValues);
      if (emptyValues) {
        // si hay valores vacios solo se envian los valores que no estan vacios
        const filteredValues = Object.fromEntries(
          Object.entries(editValues).filter(([key, value]) => value !== "")
        );
        console.log("filteredValues");
        console.log(filteredValues);
        // se envian los valores al backend
        const response = await axios.put(
          `${process.env.API_URL}/asistente/update/${editValues.rut}`,
          filteredValues,
          {
            headers: {
              "X-Caller-Id": payload.sub,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        // si el asistente se edita correctamente se muestra un mensaje de exito
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Asistente editado",
            showConfirmButton: false,
            timer: 1500,
          });
          // usar el useEffect para actualizar la tabla de asistentes genera un error de dependencia infinita por lo que se comento la linea
          // useEffect();
          // se actualiza la pagina para que se muestren los cambios pero se agrega un delay para que se muestre el mensaje de exito
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          // si hay un error al editar el asistente se muestra un mensaje de error
          Swal.fire({
            icon: "error",
            title: "Error al editar asistente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        // si no hay valores vacios se envian todos los valores
        const response = await axios.put(
          `${process.env.API_URL}/asistente/${editValues.rut}`,
          editValues,
          {
            headers: {
              "X-Caller-Id": payload.sub,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        // si el asistente se edita correctamente se muestra un mensaje de exito
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "Asistente editado",
            showConfirmButton: false,
            timer: 1500,
          });
          // usar el useEffect para actualizar la tabla de asistentes genera un error de dependencia infinita por lo que se comento la linea
          // useEffect();
          // se actualiza la pagina para que se muestren los cambios pero se agrega un delay para que se muestre el mensaje de exito
          setTimeout(() => {
            window.location.reload();
          }, 1500);
          
        } else {
          // si hay un error al editar el asistente se muestra un mensaje de error
          Swal.fire({
            icon: "error",
            title: "Error al editar asistente",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error al editar asistente",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    
  };

  return (
    <div className="asistentesContainer w-screen ">
      {/* title */}
      <div className="asistentesTitle flex m-4 p-2 ">
        <h1>Asistentes de parvulo</h1>
      </div>
      {/* body */}
      <div className="asistentesBody m-4 flex flex-row max-md:flex-col h-fit">
        <div className="tableContainer flex h-fit max-lg:overflow-x-auto ">
          <div className="asistentesTable  border-2 rounded-2xl p-6 shadow mr-2 shadow-slate-900">
            <table className="tableContainer table-auto border-separate border-spacing-x-1 border-spacing-y-1 ">
              {/* atributos de la tabla */}
              <thead className="headerTable ">
                <tr className="headerTableItem">
                  <th className="">Foto</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Rut</th>
                  <th>Mail</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              {/* valores de la tabla */}
              <tbody className="tableBody">
                {/* items de la tabla */}
                {showAsistentes()}
              </tbody>
            </table>
          </div>
        </div>
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

        {/* ventana emergente para editar al asistente */}
        {showForm && (
          <div className="editPopUp">
            <div className="editPopUpContainer">
              <div className="editPopUpHeader flex flex-row">
                <h2 className="editPopUpTitle ml-2">Editar asistente</h2>
                <button
                  onClick={togglePopUp}
                  className="editPopUpBtnClose mr-2 pl-4 pr-4 rounded-full"
                >
                  X
                </button>
              </div>
              <div className="editPopUpBody">
                <form
                  action=""
                  id="asistente"
                  onSubmit={sendEditForm}
                  className="editForm m-2 mt-0  flex flex-col "
                  autoComplete="on"
                >
                  <label htmlFor="">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={onChangeEdit}
                    placeholder="Nombre"
                  />
                  <label htmlFor="">Apellido</label>
                  <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    onChange={onChangeEdit}
                    placeholder="Apellido"
                  />
                  {getRutInput()}
                  <label htmlFor="">Mail</label>
                  <input
                    type="text"
                    id="mail"
                    name="mail"
                    onChange={onChangeEdit}
                    placeholder="correo@mail.com"
                    pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
                  />
                  <label htmlFor="">Fecha de nacimiento</label>
                  <input
                    type="date"
                    name="fechaNa"
                    id="fechaNa"
                    onChange={onChangeEdit}
                  />
                  <label htmlFor="">Direccion</label>
                  <input
                    type="text"
                    id="domicilio"
                    name="domicilio"
                    onChange={onChangeEdit}
                  />
                  <label htmlFor="">Telefono</label>
                  <input
                    type="number"
                    id="telefono"
                    name="telefono"
                    onChange={onChangeEdit}
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
        )}
      </div>
    </div>
  );
};

export default Asistentes;
