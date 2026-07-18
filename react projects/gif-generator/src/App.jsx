import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/Header'
import RandomGif from './components/RandomGif'
import SearchGif from './components/SearchGif'

function App() {
  return (
    <>
      <Header />
      <RandomGif />
      <SearchGif />
    </>
  )

}

export default App
