const jwt = require("jwt-simple");
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { checkToken } from "../data/user";

const Auth = async () => {
  const router = useRouter();
  const token = Cookies.get("token");
  // si no hay token, redireccionar a login
  if (!token || token === "null" || token === "undefined") {
    Cookies.remove("token");
    return router.push("/login");
  }
  // si hay token, decodificarlo y comprobar si ha expirado
  const payload = jwt.decode(token, process.env.SECRET_KEY);
  if (payload.exp <= Date.now()) {
    Cookies.remove("token");
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Tu sesión ha expirado, por favor inicia sesión",
    });
    return router.push("/login");
  }
  // si el token no ha expirado, comprobar si el usuario existe
  const res = await checkToken(token);
  if (res.status === 200) {
    return;
  }
  // si el usuario no existe, redireccionar a login
  Cookies.remove("token");
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Tu sesión ha expirado, por favor inicia sesión",
  });
  return router.push("/login");
};

export default Auth;
