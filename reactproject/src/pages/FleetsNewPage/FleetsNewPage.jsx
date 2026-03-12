import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import BusnewPage from '../../components/Buses/BusnewPage'
import Footer from '../../components/Footer/Footer'
import BusHero from '../../components/Buses/BusHero'
import Cursor from '../../components/Cursor/Cursor'

const FleetsNewPage = () => {
  return (
    <div>
      <Navbar/>
      <BusHero/>
      <BusnewPage/>
      <Footer/>
      <Cursor/>
    </div>
  )
}

export default FleetsNewPage
