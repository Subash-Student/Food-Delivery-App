import React, { useState } from 'react'
import "./home.css"
import Header from '../../Components/Header/Header'
import ExploreMenu from '../../Components/ExploreMenu/ExploreMenu'
import FoodDisply from '../../Components/FoodDisplay/FoodDisply'
import AppDownload from '../../Components/AppDownload/AppDownload'

const Home = () => {

  const[category,setCategory] = useState("All")

  return (
    <div>
     <Header />
     <ExploreMenu category={category} setCategory={setCategory}/>
     <FoodDisply category={category}/>
     <AppDownload />
    </div>
  )
}

export default Home