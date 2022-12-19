import React from "react";
import { login } from "../data/user";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import cookie from "js-cookie";

export const loginPage = () => {
  const router = useRouter();

  const setUserParvularia = async () => {
    const response = await login("639d37cb61f491428cec23cf");
    if (response.status === 200) {
      cookie.set("token", response.data.token, { expires: 1 });
      Swal.fire({
        title: "Login exitoso",
        text: "Bienvenido a la Salacula 31 minutos (Conectado como parvularia)",
        icon: "success",
        showConfirmButton: true,
        confirmButtonText: "Aceptar",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/");
        }
      });

      console.log("login exitoso");
    } else {
      console.log("login fallido");
    }
  };
  const setUserAsistente = async () => {
    const response = await login("639d32fa3c32614a985bd3c2");
    if (response.status === 200) {
        cookie.set("token", response.data.token, { expires: 1 });
        Swal.fire({
          title: "Login exitoso",
          text: "Bienvenido a la Salacula 31 minutos (Conectado como Asistente de parvulo)",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
        console.log("login exitoso");
      } else {
        console.log("login fallido");
      }
  };
  const setUserApoderado = async () => {
    const response = await login("639d37f361f491428cec23d0");
    if (response.status === 200) {
        cookie.set("token", response.data.token, { expires: 1 });
        Swal.fire({
          title: "Login exitoso",
          text: "Bienvenido a la Salacula 31 minutos (Conectado como parvularia)",
          icon: "success",
          showConfirmButton: true,
          confirmButtonText: "Aceptar",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/");
          }
        });
        console.log("login exitoso");
      } else {
        console.log("login fallido");
      }
  };

  return (
    <>
      <div className="loginContainer h-screen w-screen flex justify-center">
        <div className="loginBody  w-1/2 h-1/2 flex flex-col  ">
          <div className="loginTitle flex justify-center">
            <h1>Login</h1>
          </div>
          <div className=" loginButtons  flex flex-col ">
            <button onClick={setUserParvularia}>Parvularia</button>
            <button onClick={setUserAsistente}>Asistente de parvulo</button>
            <button onClick={setUserApoderado}>Apoderado</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default loginPage;
