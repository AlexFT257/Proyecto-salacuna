import React, { useState, useEffect } from "react";
import axios from "axios";

export const Asistentes = () => {
  const [asistentes, setAsistentes] = useState([]);

  // TODO: modificar la funcion para la id de la persona que esta ejecutandola
  const getAsistentes = async () => {
    const response = await axios.get(`${process.env.API_URL}/asistentes`, {
      headers: { "X-Caller-Id": "63924e8b83941c5ca47046b4" },
    });
    console.log(response);
    setAsistentes(response.data);
  };

  useEffect(() => {
    getAsistentes();
  }, []);

  // TODO: modificar la funcion para la id de la persona que esta ejecutandola
  const deleteAsistente = async (rut) => {
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/asistente/delete/${rut}`,
        { headers: { "X-Caller-Id": "63924e8b83941c5ca47046b4" } }
      );
      console.log(response);
      if (response.status == 200) {
        useEffect();
        alert("Asistente eliminado");
      }else{
        alert("Error al eliminar el usuario")
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
            <button className="editButton">
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
        `${process.env.API_URL}/asistente`,
        values,
        {
          headers: {
            "X-Caller-Id": "63924e8b83941c5ca47046b4",
            "Content-Type": "application/json",
          },
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
          {/* footer de botones */}
        </div>
      </div>
    </div>
  );
};

export default Asistentes;
