import React, { useContext } from 'react'
import Header from './Header'
import { Outlet } from 'react-router'
import Footer from './Footer'
import Loading from '../components/Loading'
import { AuthContext } from '../contexts/AuthContext/AuthContext'

const Root = () => {
  const{loading}=useContext(AuthContext)
  if(loading){
    return <Loading />
  }
  return (
    <div>
        <Header />
        <main className='min-h-screen'>
            <Outlet />
        </main>
        <Footer />
    </div>
  )
}

export default Root