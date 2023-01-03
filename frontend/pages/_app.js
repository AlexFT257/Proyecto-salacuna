import '../styles/globals.css'
import '../styles/leftbar.css'
import '../styles/asistentes.css'
import '../styles/footer.css'
import '../styles/perfil.css'

import '../styles/Home.module.css'
import { UserProvider } from '../contexts/userContext'


import axios from 'axios'


function MyApp({ Component, pageProps }) {
  // axios.defaults.withCredentials = true;
  
  return (
      <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
      </>
  )
}

export default MyApp
