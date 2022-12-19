import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
// import { logout } from "../data/user";

export const LeftBar = () => {

  const router = useRouter();

  // segun el profe da error si se usa el logout de data/user
  const logingOut = async () => {
    // const response = await axios.get(`${process.env.API_URL}/logout`);
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="LeftBar flex flex-col w-fit max-sm:flex-row max-sm:h-full max-sm:w-screen h-screen shadow-black shadow-2xl  ">
      {/* boton para mostrar el menu cuando la pantalla es muy chica */}
      <div className="hidden max-sm:flex flex-nowrap">
          <input type="checkbox" id="toggler" />
          <label for="toggler" class="burger">
            <span class="bun bun--top"></span>
            <span class="bun bun--bottom"></span>
          </label>
        </div>

      {/* header */}

      <div className="navHeader flex flex-row p-8 justify-center  max-sm:hidden">
        <img
          src="/kindergarten.png"
          alt="icono salacuna"
          className="w-10 h-10 "
        />
        <h1 className="m-2 max-sm:hidden">Salacuna 31 minutos</h1>
        
      </div>

      <hr className="navDivider p-1 max-sm:hidden" />

      {/* items  */}
      <div className="navGroup max-sm:hidden justify-center flex flex-col  m-2 max-lg:content-center">
        <div className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
          <img
            src="/dashboard_blank.png"
            alt="icono de menu principal"
            className="w-6 h-6 "
          />
          <h2 className="ml-2 max-lg:hidden">Home page</h2>
        </div>

        <div className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
          <img
            src="/checklist.png"
            alt="icono de actividades"
            className=" w-6 h-6"
          />
          <h2 className="ml-2 max-lg:hidden">Actividades</h2>
        </div>

        <div className="navItem flex flex-row shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
          <img
            src="/teacher_2.png"
            alt="icono de parvularias"
            className="w-6 h-6"
          />
          <h2 className="ml-2 max-lg:hidden">Parvularia</h2>
        </div>

        <div className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
          <img
            src="/teacher_2.png"
            alt="icono de asistentes de parvulo"
            className="w-6 h-6"
          />
          <h2 className="ml-2 max-lg:hidden">Asistentes de parvulo</h2>
        </div>

        <div className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
          <img src="/teeter.png" alt="icono de parvulos" className="w-6 h-6" />
            <Link href="/Parvulos" >
          <h2 className="ml-2 max-lg:hidden">Parvulos</h2>
            </Link>
        </div>

        <div className="navItem flex flex-row shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
          <img src="/report.png" alt="icono de parvulos" className="w-6 h-6" />
          <h2 className="ml-2 max-lg:hidden">Registro de pagos</h2>
        </div>
      </div>
      {/* footer */}
      <hr className="navDivider p-1 max-sm:hidden mb-2"  />
      <div className="navFooter  justify-center flex flex-col m-4 max-sm:hidden max-lg:content-center">
        <button onClick={logingOut} className="navItem flex flex-row  shadow-xl  rounded-lg max-lg:content-center max-lg:justify-center">
          <img src="/log-out.png" alt="logout" className="w-6 h-6" />
          <h2 className="ml-2 max-lg:hidden">Log Out</h2>
        </button>
      </div>
    </div>
  );
};

export default LeftBar;
