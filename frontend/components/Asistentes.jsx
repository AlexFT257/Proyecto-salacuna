import React, { useState, useEffect } from "react";
import axios from "axios";
import { checkToken } from "../data/user";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const jwt = require('jwt-simple');

export const Asistentes = () => {
  const [asistentes, setAsistentes] = useState([]);

  // TODO: modificar la funcion para la id de la persona que esta ejecutandola
  const getAsistentes = async () => {
    const token = Cookies.get("token");
    const decoded = jwt.decode(token, process.env.SECRET_KEY, true);
    const response = await axios.get(`${process.env.API_URL}/asistentes`, {
      headers: { "X-Caller-Id": decoded.sub },
    });
    console.log(response);
    setAsistentes(response.data);
  };

  useEffect(() => {
    getAsistentes();
  }, []);

  
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

  const showAsistentes = () => {
    return asistentes.map((asistente) => {
      return (
        <tr key={asistente._id}>
          {/* <td><img src={asistente.foto} alt="" /></td> */}
          <td>
            <img src="/user.png" alt="foto" className="h-6 w-6" />
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
            <button className="editButton" onClick={togglePopUp}>
              <img src="/asterisct_key.png" alt="" className="h-6 w-6" />
            </button>
          </td>
        </tr>
      );
    });
  };

  const [values, setValues] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    mail: "",
    role: "asistente",
    fechaNa: "",
    domicilio: "",
    telefono: "",
  });

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  // TODO: modificar la funcion para la id de la persona que esta ejecutandola
  const sendForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.API_URL}/asistente/${values.rut}`,
        values,
        {
          headers: {
            "X-Caller-Id": "63924e8b83941c5ca47046b4",
            "Content-Type": "application/json",
          }
        }
      );
      if (response.status == 200) {
        useEffect();
        alert("Asistente registrado");
      } else {
        alert(
          "Error al crear asistente, verificar que el usuario no este registrado (posible rut duplicado)"
        );
      }
    } catch (error) {
      alert(
        "Error al crear asistente, verificar que el usuario no este registrado (posible rut duplicado)"
      );
    }
  };

  const [showForm, setShowForm] = useState(false);

  const togglePopUp = () => {
    setShowForm(!showForm);
  };

  const [editValues, setEditValues] = useState({
    nombre: "",
    apellido: "",
    rut: "",
    mail: "",
    role: "asistente",
    fechaNa: "",
    domicilio: "",
    telefono: "",
  });

  const onChangeEdit = (e) => {
    setEditValues({
      ...editValues,
      [e.target.name]: e.target.value,
    });
    
  };

   const sendEditForm = async (e) => {
    e.preventDefault();
    try {
      
      const token = Cookies.get("token");
      const payload = jwt.decode(token, process.env.SECRET_KEY);
      console.log(payload.sub);
      const response = await axios.put(`${process.env.API_URL}/asistente/update/${editValues.rut}`, editValues, {
        headers: {
          "X-Caller-Id": payload.sub,
          "Content-Type": "application/json",
        }
      });
      console.log(response);
      if (response.status == 200) {
        
        Swal.fire({
          title: "Asistente editado",
          icon: "success",
          confirmButtonText: "Ok",
        });
        useEffect();
      } else {
        Swal.fire({
          title: "Error al editar asistente",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al editar asistente",
        icon: "error",
        confirmButtonText: "Ok",
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
        <div className="formContainer  flex flex-col flex-1  ml-2 mr-2 max-md:mt-4 max-md:ml-0">
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
        {showForm && <div className="editPopUp" >
          <div className="editPopUpContainer">
            <div className="editPopUpHeader flex flex-row">
              <h2 className="editPopUpTitle ml-2">Editar asistente</h2>
              <button onClick={togglePopUp} className="editPopUpBtnClose mr-2 pl-4 pr-4 rounded-full" >X</button>
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
                <label htmlFor="">Rut</label>
                <input
                  type="text"
                  id="rut"
                  name="rut"
                  onChange={onChangeEdit}
                  placeholder="XX.XXX.XXX-X"
                  pattern="^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$"
                />
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
                <input
                  type="submit"
                  value="Enviar"
                  className="formBtnEnviar  m-2 p-2 pl-4 pr-4  justify-center content-center rounded-full shadow-md shadow-slate-900 "
                />
              </form>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

export default Asistentes;
