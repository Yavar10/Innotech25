import React from 'react'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Hero from '../../components/Hero/Hero'
import Challenges from '../../components/Challenges/Challenges'
import Features from '../../components/Features/Features'

const LandingPage = () => {
  return (
    <div>
      <NavigationBar />
      <Hero />
      <Challenges />
      <Features />
    </div>
  )
}

export default LandingPage
