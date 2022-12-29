import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { LeftBar } from "../components/LeftBar";
import { Perfil } from "../components/Perfil";
import { Auth } from "../middleware/auth";
import { ListaAsistentes } from "../components/asistentes/ListaAsistentes";
import { CrearAsistentes } from "../components/asistentes/CrearAsistentes";
import { useRouter } from "next/router";
import { UserRole } from "../middleware/userRole";

export const Asistentes = () => {
  const router = useRouter();
  // useStates almacenar el rol del usuario logeado
  const [rol, setRol] = useState("");
  // funcion que se ejecuta al cargar la pagina, para obtener el rol del usuario logeado
  const getRol = async () => {
    const token = Cookies.get("token");
    if (!token) return router.push("/login");
    const role = await UserRole();
    if (role === "/login") {
      return router.push("/login");
    }
    setRol(role);
  };

  // funcion que retorna un bool si el usuario logeado puede ver la funcion
  const canView = () => {
    if (rol === "apoderado") {
      return false;
    } else {
      return true;
    }
  };

  // se ejecuta la funcion getAsistentes al cargar la pagina
  useEffect(() => {
    Auth;
    getRol();
  }, []);

  return (
    <div className="flex max-sm:flex-col  h-screen w-screen ">
      <LeftBar />
      <Perfil />
      <div className="asistentesContainer w-screen ">
        {/* title */}
        <div className="asistentesTitle flex m-4 p-2 ">
          <h1>Asistentes de parvulo</h1>
        </div>
        {/* body */}
        <div className="asistentesBody m-4 flex flex-row max-md:flex-col h-fit">
          {/* tabla de asistentes */}
          <ListaAsistentes />
          {/* formulario para crear un asistentente de parvulo */}
          {canView() && <CrearAsistentes />}
        </div>
      </div>
    </div>
  );
};

export default Asistentes;
