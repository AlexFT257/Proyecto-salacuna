import '../styles/globals.css'
import '../styles/leftbar.css'
import '../styles/asistentes.css'
import '../styles/footer.css'
import '../styles/perfil.css'
import '../styles/login.css'

import axios from 'axios'


function MyApp({ Component, pageProps }) {
  // axios.defaults.withCredentials = true;
  
  return (
      <><Component {...pageProps}/></>
  )
}

export default MyApp
