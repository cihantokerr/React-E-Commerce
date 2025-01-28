import { useState } from 'react'
import {BrowserRouter,Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
