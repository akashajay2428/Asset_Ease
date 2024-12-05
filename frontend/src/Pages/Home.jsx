import React from 'react'
import Header from '../components/Header/Header'
import Explore from '../components/Explore/Explore'
import Appdownload from '../components/Appdownload/Appdownload'
import Footer from '../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <Explore/>
        <Appdownload/>
        <Footer/>
    </div>
  )
}

export default Home