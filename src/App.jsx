import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter  basename="/">
        <Route path="/"  element= {<Body></Body>}Route>
    </BrowserRouter>
    </>
  )
}

export default App
