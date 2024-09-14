import './App.css'
import Calculator from './apps/Calculator';
import Counter from './apps/Counter'
import MemeGenerator from './apps/MemeGenerator';
import Home from './components/Home';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from "./redux/store"

const App: React.FC = () => {

  const theme = useSelector((state: RootState) => state.theme.theme)
  return (
    <div className={`${theme === "dark" ? "god_level_dark" : "god_level_light"} `}>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/counter' element={<Counter />} /> 
        <Route path='/calculator' element={<Calculator />} /> 
        <Route path='/meme-generator' element={<MemeGenerator />} /> 
      </Routes>
    </div>
  )
}

export default App
