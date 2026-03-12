import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import CitySection from '../../components/CitiesPage/CitySection'
import CityCard from '../../components/CitiesPage/CityCard'
import HeroCity from '../../components/CitiesPage/HeroCity'
import Cursor from '../../components/Cursor/Cursor'

const Cities = () => {
  return (
    <div>
      <Navbar/>
      <HeroCity/>
      <CityCard/>
      <CitySection/>
      <Footer/>
      <Cursor/>
    </div>
  )
}

export default Cities
