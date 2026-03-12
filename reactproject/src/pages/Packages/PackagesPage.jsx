import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AllPackagesPage from '../../components/AllPackages/AllPackagesPage'
import Footer from '../../components/Footer/Footer'
import HeroPackages from '../../components/Packages/HeroPackages'
import Cursor from '../../components/Cursor/Cursor'

const PackagesPage = () => {
  return (
    <div>
      <Navbar/>
      <HeroPackages/>
      <AllPackagesPage/>
      <Footer/>
      <Cursor/>
    </div>
  )
}

export default PackagesPage
