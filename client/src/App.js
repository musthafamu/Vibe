import {BrowserRouter,Navigate,Routes,Route} from 'react-router-dom';
import Home from './scenes/homePage/Home'
import Login from './scenes/loginPage/Login'
import Profile from './scenes/profilePage/Profile';
import './App.css';
import { useMemo } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import {CssBaseline,ThemeProvider} from "@mui/material";
import ChatWidget from './scenes/widgets/ChatWidget';




function App() {

 const isAuth=Boolean(useSelector((state)=>state.token))
  return (
   <BrowserRouter>  
  <CssBaseline>
   <Routes>
    <Route path='/'  element={<Login/>}/>
    <Route path='/home'  element={isAuth ? <Home/>:<Navigate to="/" />}/>
    <Route path='/profile/:userId'  element={ isAuth ? <Profile />:<Navigate to='/' />}/>
    <Route path='/chat'  element={<ChatWidget/>}/>
   </Routes>
  </CssBaseline>
    
   </BrowserRouter>
  );
}

export default App;
