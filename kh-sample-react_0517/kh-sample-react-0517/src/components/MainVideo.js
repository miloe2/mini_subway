import React, { useState } from "react";
import About from "../pages/About";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import styled, { withTheme } from "styled-components";
import videoBG from "../img/main.mp4";

const Container =styled.div`
width: 100vw;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`;

const Video = styled.video`
  width: 100vw;
  height: 100vh;
  object-fit:cover;
  /* z-index: 1; */
`;

const BlackBg = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0.2;
  position: absolute;
  top: 0;
`;

function MainVideo() {
  // const [modal, setModal] = useState(false);
  
  
  return (
    <Container>
          {/* <BlackBg/> */}
          <Video autoPlay loop muted>
            <source src={videoBG}type="video/mp4" />
            {/* <source src="/cloud.mp4" type="video/mp4" /> */}
          </Video>
    </Container>
  );

}

export default MainVideo;
