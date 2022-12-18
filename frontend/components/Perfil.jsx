import axios from "axios";
import React from "react";
import { useEffect } from "react";
import cookie from "js-cookie";
const jwt = require("jwt-simple");

export const Perfil = () => {
  const [profileInfo, setProfileInfo] = React.useState({
    name: "Nombre",
    lastName: "Apellido",
    foto: "/user.png",
  });

  const getProfileInfo = (e) => {
    e.preventDefault();
    setProfileInfo({ ...profileInfo, [e.target.name]: e.target.value });
  };

  // useEffect(async () => {
  //   const token = cookie.get("token");
  //   if (!token || token === "undefined") {
  //     router.push("/login");
  //   } else {
  //     const decoded = jwt.decode(token, process.env.SECRET_KEY);
  //     const response = await axios.get(`${process.env.API_URL}/userFoto`, {
  //       headers: { "X-Caller-Id": decoded.sub},
  //     });
  //     console.log("Response: ");
  //     console.log(response);
  //     if (response.status === 200) {
        
        
  //     }
  //   }
  // }, []);

  return (
    <div className="dropdownContainer">
      <div className="profileContainer fixed top-6 right-6 rounded-full p-2 shadow-lg shadow-slate-900 ">
        <div className="profileItems flex flex-row justify-center  ">
          <div className="profileImage w-10 h-10 rounded-full ">
            <img src={profileInfo.foto} alt="Foto perfil" />
          </div>

          <h2 className="m-2 max-lg:hidden">
            {profileInfo.name} {profileInfo.lastName}
          </h2>
          <button className="">
            <img
              src="/down_arrow_2.png"
              alt=""
              className="h-6 w-6 mr-2  max-lg:hidden max-lg:m-0"
            />
          </button>
        </div>
      </div>
      <div
        id="profileDropdown-content"
        className="profileDropdown-content fixed top-12 right-6 flex flex-col "
      >
        <div className="profile flex rounded-full mt-4 mb-2 shadow-lg shadow-slate-900">
          <a href="">Parvularia</a>
        </div>
        <div className="profile flex rounded-full mt-2 mb-2  shadow-lg shadow-slate-900">
          <a href="" className="asistenteProfile">
            Asistentes de parvulo
          </a>
        </div>
        <div className="profile flex rounded-full mt-2 mb-2 shadow-lg shadow-slate-900">
          <a href="">Apoderado</a>
        </div>
      </div>
    </div>
  );
};
export default Perfil;
