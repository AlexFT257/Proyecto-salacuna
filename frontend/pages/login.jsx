import React from "react";
import { login } from "../data/user";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/userContext";
const jwt = require("jwt-simple");

export const loginPage = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [rut, setRut] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setRut({ ...rut, [e.target.name]: e.target.value });

    console.log(e.target.value);
    console.log(rut);
  };

  const loggin = async (e) => {
    e.preventDefault();
    console.log(rut);
    const response = await login(rut);
    if (!response || response.status == null) {
      Swal.fire({
        title: "Login fallido",
        text: "Usuario no encontrado",
        icon: "error",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      });
      console.log("login fallido");
    } else {
      if (response.status === 200) {
        cookie.set("token", response.data.token, { expires: 1 });
        cookie.set("user", JSON.stringify(response.data.user), { expires: 1 });
        setUser(response.data.user);
        Swal.fire({
          title: "Login exitoso",
          text: "Bienvenido a la Salacula 31 minutos",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/actividades");
          }
        });
        console.log("login exitoso");
      }
    }
  };

  <form action="" onSubmit={loggin}>
    <label htmlFor="" className="">
      Rut :
    </label>
    <input
      onChange={onChange}
      type="text"
      name="rut"
      id="rut"
      pattern="^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$"
      placeholder="XX.XXX.XXX-X"
    />
    <input className="loginSubmit" type="submit" value={"Iniciar Sesion"} />
  </form>;

  // display: flex;
  // justify-content: center;
  // align-items: center;
  // margin: auto;
  // border-radius: 50px;
  // background-color: #fffafb;
  // box-shadow: 0 0 10px #131515;

  return (
    <>
      <div className=" h-screen w-screen flex justify-center">
        <div className="justify-center bg-white shadow-2xl  rounded-2xl align-middle m-auto  w-auto h-auto flex flex-col shadow-black ">
          <div className="w-full h-full flex sm:flex-row justify-evenly flex-col py-6">
            <div className=" flex flex-col justify-center m-auto max-sm:ml-6">
              <h1 className="text-center text-5xl font-bold italic">
                Hola!
              </h1>
              <h1 className="text-center text-5xl font-bold italic">
                Inicia sesión
              </h1>
            </div>
            <div className="w-1/2 h-1/2 flex justify-left m-auto ">
              <form
                action=""
                onSubmit={loggin}
                className="flex flex-col justify-center space-y-2 "
              >
                <label htmlFor="" className="text-xl font-medium">
                  Rut:
                </label>
                <input
                  required={true}
                  onChange={onChange}
                  type="text"
                  name="rut"
                  id="rut"
                  pattern="^(\d{1,3}(?:\.\d{1,3}){2}-[\dkK])$"
                  placeholder="XX.XXX.XXX-X"
                  className="flex max-lg:w-40 border-b-2 border-gray-300 focus:border-black bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                />
                <input
                  className=" flex rounded-xl cursor-pointer bg-teal-500 hover:bg-teal-700 text-white py-2"
                  type="submit"
                  value={"Iniciar Sesion"}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default loginPage;
