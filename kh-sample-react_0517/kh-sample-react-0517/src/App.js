import {Fragment} from 'react';
import './App.css';
import SubwayMap from './SubwayMap';
import Home from "./pages/Home";
import About from "./pages/About";
import Chat from "./pages/Chat"
import Nav2 from "./components/Nav2";
import Nav from './components/Nav';

import KakaoMap from "./pages/Kakao";
import MainVideo from "./components/MainVideo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logo from './components/logo';

const App = () => {
  return (
  <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/About" element={<About/>}/>
          <Route path="/SubwayMap" element={<SubwayMap/>}/>
          <Route path="/Chat" element={<Chat/>}/>
          <Route path="/KakaoMap" element={<KakaoMap/>}/>
        </Routes>
        {/* <Nav/> */}

      </Router>

  </>
  );
};

export default App;
