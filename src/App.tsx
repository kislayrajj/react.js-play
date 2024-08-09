import './App.css'
import Calculator from './apps/Calculator';
import Counter from './apps/Counter'
import Home from './components/Home';
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom';

const App: React.FC = () => {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/counter' element={<Counter />} /> 
        <Route path='/calculator' element={<Calculator />} /> 
      </Routes>
    </div>
  )
}

export default App
