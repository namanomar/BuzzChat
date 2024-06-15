import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import SetAvatar from './components/SetAvatar';
import Chat from './pages/Chat';
export default function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path='/register' element={<Register/>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/Avatar' element={<SetAvatar></SetAvatar>}></Route>
      <Route path='/' element={<Chat></Chat>}></Route>
    </Routes>  
  </BrowserRouter>
  )
}
