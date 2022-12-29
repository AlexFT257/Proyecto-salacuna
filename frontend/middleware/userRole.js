const jwt = require("jwt-simple");
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import axios from "axios";

export const UserRole = async () => {
  const token = Cookies.get("token");
  // desencriptar el token para obtener el id del usuario
  const payload = jwt.decode(token, process.env.SECRET_KEY);
  // generar la peticion a la api del usuario
  const response = await axios.get(`${process.env.API_URL}/getUser`, {
    headers: {
      "X-Caller-Id": payload.sub,
    },
  });
  // si el usuario no existe, redireccionar a login
  if (response.status !== 200) {
    Cookies.remove("token");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tu sesión ha expirado, por favor inicia sesión",
    });
    return "/login";
  }
  // si el usuario existe comprobar retornar su rol
  return response.data.role;
};

export default UserRole;
