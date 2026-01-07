import { useState } from 'react'
import './App.css'
import Navbar from './Navbar'
import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter  basename="/">
        <Route path="/"  element= {<div>Base Page</div>}></Route>

    <Route path="/login"  element= {<div>Login Page</div>}></Route>
    <Route path="/test"  element= {<div>test Page</div>}></Route>

    </BrowserRouter>
    <Navbar />
      <h1 class="text-3xl font-bold underline">
         Hello world!
      </h1>
    </>
  )
}

export default App
