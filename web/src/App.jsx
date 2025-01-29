import { useState } from 'react'
import {BrowserRouter,Router,Route,Routes} from 'react-router-dom'
import './App.css'
import Homepage from './pages/Homepage'
import CategorieDisplay from './pages/CategorieDisplay'
import SearchPage from './pages/SearchPage'
import SeasonalProducts from './pages/SeasonalProducts'
import LoginRegister from './pages/LoginRegister'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Homepage/>}/>
          <Route path='/Categorie-Display/:categorie' element={<CategorieDisplay/>}/>
          <Route path='/Search-Page/:search_text' element={<SearchPage/>}/>
          <Route path='/Seasonal-Products/:cloth_type' element={<SeasonalProducts/>}/>
          <Route path='/Login-Register' element={<LoginRegister/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
