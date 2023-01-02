import axios from "axios";
import React from "react";
import { useEffect } from "react";
import cookie from "js-cookie";
import Swal from "sweetalert2";
const jwt = require("jwt-simple");
import { useRouter } from "next/router";
import { Auth } from "../middleware/auth";
import { UserContext } from "../contexts/userContext";
import { useContext } from "react";


export const Perfil = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  console.log(user);
  // const [profileInfo, setProfileInfo] = React.useState({
  //   name: user.nombre,
  //   lastName: user.apellido,
  //   foto: user.foto,
  // });

  const check = async () => {
    const token = cookie.get("token");
    if (!token || token === "undefined") {
      cookie.remove("token");
      return router.push("/login");
    } 
    const decoded = jwt.decode(token, process.env.SECRET_KEY);
    if (decoded.exp <= Date.now() / 1000) {
      cookie.remove("token");
      return router.push("/login");
    } else {
      const res = await checkToken(token);
      if (res.status === 200) {
        return;
      }else{
        cookie.remove("token");
        return router.push("/login");
      }
      // const response = await axios.get(`${process.env.API_URL}/userFoto`, {
      //   headers: { "X-Caller-Id": decoded.sub },
      // });


      // if (response.status === 200) {
      //   setProfileInfo({
      //     name: response.data.name,
      //     apellido: response.data.apellido,
      //     foto: response.data.foto,
      //   });
      // } else {
        
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "No posees foto de perfil, por favor sube una foto de perfil",
      //   });
      // }
      
    }
  };

  const checkToken = async (eltoken) => {
    try {
      const response = await axios.get(`${process.env.API_URL}/checkToken?token=${eltoken}`);
      console.log(eltoken);
      return response;
    } catch (error) {
      console.log(error);
      return {
        status: 500,
      };
    }
  };

  useEffect(() => {
    const cookieUser = cookie.get("user");
    console.log(cookieUser);
    if (cookieUser) {
      setUser(JSON.parse(cookieUser));
    }
    check();
  }, []);

  
    

  return (
    <div>
      <div className="text-black bg-white border-2  border-black
 fixed top-6 right-6 rounded-full p-2 shadow-lg shadow-slate-900 ">
        <div className="font-semibold flex flex-row justify-center  ">
          <div className="bg-white border-black border-2 overflow-hidden
 w-10 h-10 rounded-full ">
            { user.foto === null 
              ? 
              <img src={`${process.env.API_URL}/file/download/${user.foto}`} alt="Foto perfil" /> 
              : 
              null
            }
          </div>

          <h2 className="m-2 max-lg:hidden">
            {user.nombre} {user.apellido}
          </h2>
          
        </div>
      </div>
    </div>
  );
};
export default Perfil;
