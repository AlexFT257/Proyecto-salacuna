import { LeftBar } from "../components/LeftBar";
import {Perfil} from "../components/Perfil"
import {Footer} from "../components/Footer"
import {Asistentes} from "../components/Asistentes"
// import {dashboardIcon} from "../public/dashboard.png"

export default function Home() {
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
