import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar  from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';
import CreateBook from './pages/CreateBook';
import ReadPDF from './pages/ReadPDF';

axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true

function App() {  
  return (
    <UserContextProvider>
    <Navbar/> 
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/create' element={<CreateBook />} />
      <Route path='/read/:bookId' element={<ReadPDF />} />
    </Routes>      
    </UserContextProvider>
  )
}

export default App
