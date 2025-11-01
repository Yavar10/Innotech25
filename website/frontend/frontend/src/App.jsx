import React from 'react'
import Home from './pages/Home/Home'
import NavBar from './components/NavBar/NavBar'
import NavigationBar from './components/NavigationBar/NavigationBar'
import Hero from './components/Hero/Hero'

const App = () => {
  return (
    <div>
     <NavigationBar/>
     <Hero />
     {/*  <Home />
      <NavBar /> */}
    </div>
  )
}

export default App
