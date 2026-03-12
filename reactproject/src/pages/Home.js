import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import Stats from '../components/StatsCard/Stats'
import FeaturedRoutes from '../components/RouteCard/FeaturedRoutes'
import Fleet from '../components/Fleet/Fleet'
import Packages from '../components/Packages/Packages'
import About from '../components/About/About'
import Contact from '../components/Contacts/Contact'
import Footer from '../components/Footer/Footer'
import Cursor from '../components/Cursor/Cursor'
import Reviews from '../components/Reviews/Reviews'
import WhyChooseUs from '../components/Whychooseus/WhyChooseUs'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Stats/>
        <FeaturedRoutes/>
        <Fleet/>
        <Packages/>
        <Reviews/>
        <About/>
        <WhyChooseUs/>
        <Contact/>
        <Footer/>
        <Cursor/>
        
    </div>
  )
}

export default Home
