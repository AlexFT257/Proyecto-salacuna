import axios from "axios";
import React from "react";
import { useEffect } from "react";
import cookie from "js-cookie";
import Swal from "sweetalert2";
const jwt = require("jwt-simple");
import { useRouter } from "next/router";
import { Auth } from "../middleware/auth";

export const Perfil = () => {
  const router = useRouter();
  const [profileInfo, setProfileInfo] = React.useState({
    name: "Nombre",
    lastName: "Apellido",
    foto: "",
  });

  const check = async () => {
    const token = cookie.get("token");
    if (!token || token === "undefined") {
      router.push("/login");
    } else {
      const decoded = jwt.decode(token, process.env.SECRET_KEY);
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
      } else {
        
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No posees foto de perfil, por favor sube una foto de perfil",
        });
      }
      
    }
  };

  useEffect(() => {
    Auth;
    check();
  }, []);

  
    

  return (
    <div className="dropdownContainer">
      <div className="profileContainer fixed top-6 right-6 rounded-full p-2 shadow-lg shadow-slate-900 ">
        <div className="profileItems flex flex-row justify-center  ">
          <div className="profileImage w-10 h-10 rounded-full ">
            <img src={`${process.env.API_URL}/file/download/${profileInfo.foto}`} alt="Foto perfil" />
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
