import { LeftBar } from "../components/LeftBar";
import { Perfil } from "../components/Perfil";
// import {dashboardIcon} from "../public/dashboard.png"
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import { useEffect } from "react";
import {Auth} from "../middleware/auth"

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    Auth;
  }, []);

  return (
    <div className="flex max-sm:flex-col  h-screen w-screen ">
      <LeftBar />
      {/* <Asistentes /> */}
      <Perfil />
    </div>
  );
}

export default Home;
