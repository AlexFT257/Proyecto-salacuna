import axios from "axios";
import React from "react";
import { useEffect } from "react";
import cookie from "js-cookie";
import Swal from "sweetalert2";
const jwt = require("jwt-simple");

export const Perfil = () => {
  const [profileInfo, setProfileInfo] = React.useState({
    name: "Nombre",
    lastName: "Apellido",
    foto: "/user.png",
  });

  const check = async () => {
    const token = cookie.get("token");
    if (!token || token === "undefined") {
      router.push("/login");
    } else {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
      try {
        const response = await axios.get(`${process.env.API_URL}/userFoto`, {
          headers: { "X-Caller-Id": decoded.sub },
        });

        console.log("Response: ");
        console.log(response);

        if (response.status === 200) {
          setProfileInfo({
            name: response.data.name,
            apellido: response.data.apellido,
            foto: response.data.foto,
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posees foto de perfil, por favor sube una foto de perfil",
        });
      }
    }
  };

  useEffect(() => {
    check();
  }, []);

  const profilePic = profileInfo.foto
    ? `${process.env.API_URL}/file/download/${profileInfo.foto}`
    : "/user.png";

  return (
    <div className="dropdownContainer">
      <div className="profileContainer fixed top-6 right-6 rounded-full p-2 shadow-lg shadow-slate-900 ">
        <div className="profileItems flex flex-row justify-center  ">
          <div className="profileImage w-10 h-10 rounded-full ">
            <img src={profilePic} alt="Foto perfil" />
          </div>

          <h2 className="m-2 max-lg:hidden">
            {profileInfo.name} {profileInfo.apellido}
          </h2>
          
        </div>
      </div>
    </div>
  );
};
export default Perfil;