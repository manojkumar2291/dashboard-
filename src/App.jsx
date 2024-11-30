import React from 'react'
import LandingPage from './pages/LandingPage'
import "./App.css"
import {Routes,Route} from 'react-router-dom'
import NotFound from './components/NotFound'
const App = () => {
  return (<>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/*' element={<NotFound/>}/>
  </Routes>
  </>
  )
}

export default App