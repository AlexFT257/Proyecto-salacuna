import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React from "react";
import Link from "next/link";
// import { logout } from "../data/user";

export const LeftBar = () => {
  // bool para controlar el menu cuando la pantalla es muy chica
  const [menu, setMenu] = React.useState(false);

  // funcion para mostrar el menu cuando la pantalla es muy chica
  const showMenu = () => {
    // delay para que el menu se muestre despues de que se haga click en el boton
    setTimeout(() => {
      setMenu(!menu);
    }, 100);
    console.log(menu);
  };

  const dropdownStyle = menu
    ? "flex flex-col h-fit lg:h-full  shadow-black shadow-2xl   "
    : "hidden";

  const router = useRouter();

  // segun el profe da error si se usa el logout de data/user
  const logingOut = async () => {
    // const response = await axios.get(`${process.env.API_URL}/logout`);
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="LeftBar flex flex-col w-max max-lg:w-fit  max-sm:w-full shadow-black shadow-2xl  ">
      {/* boton para mostrar el menu cuando la pantalla es muy chica */}
      <div className="flex">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          type="button"
          onClick={showMenu}
        >
          <div className=" hidden max-sm:flex ">
            <input type="checkbox" id="toggler" />
            <label htmlFor="toggler" className="burger">
              <span className="bun bun--top"></span>
              <span className="bun bun--bottom"></span>
            </label>
          </div>
        </button>
      </div>

      {/* menu cuando la pantalla es muy chica */}

      {menu && (
        <div className={dropdownStyle}>
          <div className=" flex-col h-fit m-2  ">

          <div className="navHeader flex flex-row p-8 justify-center  w-max max-lg:w-fit max-sm:hidden">
              <img
                src="/kindergarten.png"
                alt="icono salacuna"
                className="w-10 h-10 "
              />
              <h1 className="m-2 max-sm:hidden max-lg:hidden">Salacuna 31 minutos</h1>
            </div>
            
            <div className="">
              {/* items  */}

              <div className="navGroup  justify-center flex flex-col  m-2 content-center">
                

                <div
                  onClick={() => {
                    router.push("/actividades");
                  }}
                  className="navItem flex flex-row   m-2 rounded-lg "
                >
                  <img
                    src="/checklist.png"
                    alt="icono de actividades"
                    className=" w-6 h-6"
                  />
                  <h2 className="ml-2 ">Actividades</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/parvularias");
                  }}
                  className="navItem flex flex-row  m-2 rounded-lg "
                >
                  <img
                    src="/teacher_2.png"
                    alt="icono de parvularias"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 ">Parvularia</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/asistentesParvulo");
                  }}
                  className="navItem flex flex-row   m-2 rounded-lg "
                >
                  <img
                    src="/teacher_2.png"
                    alt="icono de asistentes de parvulo"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 ">Asistentes de parvulo</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/parvulos");
                  }}
                  className="navItem flex flex-row m-2 rounded-lg "
                >
                  <img
                    src="/teeter.png"
                    alt="icono de parvulos"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 ">Parvulos</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/registro");
                  }}
                  className="navItem flex flex-row m-2 rounded-lg "
                >
                  <img
                    src="/report.png"
                    alt="icono de parvulos"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 ">Registro de pagos</h2>
                </div>
                <hr className="navDivider " />
                <div
                  onClick={logingOut}
                  className="navItem  flex flex-row m-2 rounded-lg "
                >
                  <img src="/log-out.png" alt="logout" className="w-6 h-6" />
                  <h2 className="ml-2 ">Log Out</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* menu cuando la pantalla es grande */}
      {!menu && (
        <div className="flex flex-col w-max max-lg:w-fit max-sm:flex max-sm:h-full max-sm:w-full h-full shadow-black shadow-2xl ">
          {/* header */}
          <div>
            <div className="navHeader flex flex-row p-8 justify-center  w-max max-lg:w-fit max-sm:hidden">
              <img
                src="/kindergarten.png"
                alt="icono salacuna"
                className="w-10 h-10 "
              />
              <h1 className="m-2 max-sm:hidden max-lg:hidden">Salacuna 31 minutos</h1>
            </div>

            <hr className="navDivider p-1 max-sm:hidden" />

            {/* items  */}
            <div>
              <div className="navGroup max-sm:hidden justify-center flex flex-col  m-2 max-lg:content-center">
                

                <Link href="/actividades">
                <div className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center">
                  <button className="flex">
                    <img
                      src="/checklist.png"
                      alt="icono de actividades"
                      className=" w-6 h-6"
                    />
                    <h2 className="ml-2 max-lg:hidden">Actividades</h2>
                  </button>
                </div>
                </Link>

                <div
                  onClick={() => {
                    router.push("/parvularias");
                  }}
                  className="navItem flex flex-row shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center"
                >
                  <img
                    src="/teacher_2.png"
                    alt="icono de parvularias"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 max-lg:hidden">Parvularia</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/asistentesParvulo");
                  }}
                  className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center"
                >
                  <img
                    src="/teacher_2.png"
                    alt="icono de asistentes de parvulo"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 max-lg:hidden">Asistentes de parvulo</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/parvulos");
                  }}
                  className="navItem flex flex-row  shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center"
                >
                  <img
                    src="/teeter.png"
                    alt="icono de parvulos"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 max-lg:hidden">Parvulos</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/asistencia");
                  }}
                  className="navItem flex flex-row shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center"
                >
                  <img
                    src="/asistencia.png"
                    alt="icono de parvulos"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 max-lg:hidden">Asistencia</h2>
                </div>

                <div
                  onClick={() => {
                    router.push("/registro");
                  }}
                  className="navItem flex flex-row shadow-xl m-2 rounded-lg max-lg:content-center max-lg:justify-center"
                >
                  <img
                    src="/report.png"
                    alt="icono de parvulos"
                    className="w-6 h-6"
                  />
                  <h2 className="ml-2 max-lg:hidden">Registro de pagos</h2>
                </div>
              </div>
              {/* footer */}
              <hr className="navDivider p-1 max-sm:hidden mb-2" />
              <div
                onClick={logingOut}
                className="navItem flex flex-row rounded-lg max-lg:justify-center  m-4 max-sm:hidden max-lg:content-center"
              >
                <img src="/log-out.png" alt="logout" className="w-6 h-6" />
                <h2 className="ml-2 max-lg:hidden">Log Out</h2>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default LeftBar;
