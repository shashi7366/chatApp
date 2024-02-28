import { useState } from 'react'

import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import {Register,Login,Chat, SetAvatar} from './pages';
import LandingPage from './pages/landingPage/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/chat" element={<Chat/>}/>
      <Route path="/setAvatar" element={<SetAvatar/>}/>
      <Route path="/" element={<LandingPage/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
