import { LeftBar } from "../components/LeftBar";
import {Perfil} from "../components/Perfil"
import {Footer} from "../components/Footer"
import {Asistentes} from "../components/Asistentes"
// import {dashboardIcon} from "../public/dashboard.png"
import { useRouter } from "next/router";
import cookie from "js-cookie";
import { useEffect } from "react";
import { checkToken } from "../data/user";

// funcion para verificar si el token es valido
export const getServerSideProps = async (context) => {
  try {
    const response = await checkToken(context.req.headers.cookie);
    // si el token es valido, no se redirecciona
    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    // si el token no es valido, se redirecciona a la pagina de login
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
  }
  }
};

const Home = ({data}) =>{

  const router = useRouter();

  useEffect(() => {
    const token = cookie.get("token");
    if (!token || token === "undefined") {
      router.push("/login");
    }
  }, []);

  return (
    // modelando la pagina
    // dashboard de la izq
    <div className="flex max-sm:flex-col  h-screen w-screen ">
      <LeftBar/>
      <Asistentes />
      <Perfil/>
      <Footer/>  
    </div>
  );
}

export default Home;
