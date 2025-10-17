import React from 'react'
import Header from '../components/Header'
import SpexialityMenu from '../components/SpexialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'

const Home = () => {
  return (
    <div>
        <Header/>
        <SpexialityMenu/>
        <TopDoctors/>
        <Banner/>
    </div>
  )
}

export default Home