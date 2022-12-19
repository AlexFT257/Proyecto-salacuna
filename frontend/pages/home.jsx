import React from 'react'
import { LeftBar } from '../components/LeftBar'
import { Perfil } from '../components/Perfil'

export const home = () => {
  return (
    <div className='flex max-sm:flex-col  h-screen w-screen '>
        {/* componentes de dashboar */}
        <LeftBar/>
        <Perfil/>

        {/* tu componente/pagina  */}
    </div>
  )
}

export default home;