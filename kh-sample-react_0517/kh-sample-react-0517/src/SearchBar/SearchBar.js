import React, { useState, useEffect } from 'react';
import stations from '../stations';
import Hangul from 'hangul-js';
import styled from 'styled-components';

const Container = styled.div`
width: 100%;
/* background-color: aqua; */
padding: 50px 0;
button{
  background-color: #5eadf7;
  color: white;
  border: 1px solid rgb(244, 248, 255);
}
  .search{
    /* background-color: red; */
    display: flex;
    justify-content: center;
    .inputBlock{
      display: flex;
      flex-direction: column;
      justify-content: left;
      /* background-color: brown; */
      /* margin-left: 50px; */
    }
    .list{
      display: flex;
      flex-direction: column;
      .search-menu{
        background-color: rgb(244, 248, 255);
        padding: 2px;
        text-align: left;   
        font-weight: 400;
        cursor: pointer;
        color:black;
        
      }
      .search-menu:hover{
        background-color: #404143;
        /* background-color: #5eadf7; */
        color: white;
      }

    }
    .btnBlock{
      display: flex;
      align-items: top;

    }
    .change {
      width: 40px;
      height: 90px;
      border-radius: 25px;
      font-size: 1.3rem;
      margin-left: 10px;
      cursor: pointer;
      
    }
    input{
      /* background-color: brown; */
      width: 300px;
      height: 40px;
      border-radius: 5px;
      font-size: 1rem;
      font-weight: 400;
      padding-left: 5px;
      border: 1px solid grey;
      color: #404143;
    }
    input::placeholder{
      font-weight: 400;
      font-size: .8rem;
    }
    input:focus{
    border-color: #5eadf7;
    outline: none;
    color:  #5eadf7;
    font-weight: bold;
    background-color: rgb(244, 248, 255);

    }
  }
`;


const SearchBar = ({ startStation, setStartStation, setStartMarker, endStation,setEndStation, setEndMarker }) => {
  const [inputTextS, setInputTextS] = useState('');
  const [inputTextE, setInputTextE] = useState('');
  const [filteredStations, setFilteredStations] = useState([]);
  const [startStationInput, setStartStationInput] = useState(false);
  const [endStationInput, setEndStationInput] = useState(false);
  

  useEffect(() => {
    // startStation 값이 변경될 때마다 startMarker를 업데이트
    if (startStation) {
      const station = stations.find((line) =>
        line.stations.some((station) => station.name === startStation)
      );
        setInputTextS(startStation);
      if (station) {
        const targetStation = station.stations.find((station) => station.name === startStation);
        if (targetStation) {
          const { left, top } = targetStation;
          setStartMarker({ left, top });
        }
      }
    }
  }, [startStation, setStartMarker]);

  useEffect(() => {
    // endStation 값이 변경될 때마다 endMarker를 업데이트
    if (endStation) {
      const station = stations.find((line) =>
        line.stations.some((station) => station.name === endStation)
      );
      setInputTextE(endStation);
      if (station) {
        const targetStation = station.stations.find((station) => station.name === endStation);
        if (targetStation) {
          const { left, top } = targetStation;
          setEndMarker({ left, top });
        }
      }
    }
  }, [endStation, setEndMarker]);




  function handleInputChange(event) {
    const { name, value } = event.target;
  
    if (name === 'startStation') {
      setInputTextS(value);
      setStartStationInput(true); // 입력 중인 경우에만 true로 설정
      setEndStationInput(false);
      // 출발역에 대한 필터링된 역 리스트 업데이트
      const initials = getInitials(value);
      const filtered = stations.filter((line) =>
        line.stations.some((station) => search(getInitials(station.name), String(initials)))
      );
      setFilteredStations(filtered);
    } else if (name === 'endStation') {
      setInputTextE(value);
      setStartStationInput(false); // 입력 중인 경우에만 true로 설정
      setEndStationInput(true);
      // 도착역에 대한 필터링된 역 리스트 업데이트
      const initials = getInitials(value);
      const filtered = stations.filter((line) =>
        line.stations.some((station) => search(getInitials(station.name), String(initials)))
      );
      setFilteredStations(filtered);
    }
  }
  


  function handleMenuClick(stationName,inputText) {
    if (inputText===inputTextS) {
      setStartStation(stationName);
      setInputTextS(stationName);
    } else if(inputText===inputTextE){
      setInputTextE(stationName);
      setEndStation(stationName);
    }
    setFilteredStations([]);
  }
  

  
  function handleInputBlur() {
    setTimeout(() => {
      setFilteredStations([]);
    }, 500);
  }

    const search = (text, query) => {
    const re = new RegExp(query, 'i');
    return re.test(text);
    };

    const getInitials = (str) => {
    const disassembled = Hangul.disassemble(str);
    return disassembled.filter((char) => Hangul.isCho(char));
    };


    const ChangeStartEnd = () => {
      setStartStation(inputTextE);
      setEndStation(inputTextS);
      setInputTextS(inputTextE);
      setInputTextE(inputTextS);
  }





  return (
      <Container>
      <div className="search">
        <div className="inputBlock">
          <input
            type="text"
            name="startStation"
            value={inputTextS}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            placeholder='도착역을 입력해주세요'
          />
            {inputTextS && startStationInput&&
              filteredStations
                .filter((line) =>
                  line.stations.some((station) =>
                    search(getInitials(station.name), String(getInitials(inputTextS)))
                  )
                )
                .map((line) => (
                  <div key={line.line} className='list'>
                    {line.stations
                      .filter(
                        (station) =>
                          search(getInitials(station.name), String(getInitials(inputTextS))) &&
                          station.name.startsWith(inputTextS)
                      )
                      .map((station) => (
                        <button
                          key={station.ID}
                          className="search-menu"
                          onClick={() => handleMenuClick(station.name,inputTextS)}
                        >
                              {line.line}  <span style={{fontWeight:'700'}}> {station.name}  </span> 
                        </button>
                      ))}
                  </div>
                ))}
                 <input
          type="text"
          name="endStation"
          value={inputTextE}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          placeholder='도착역을 입력해주세요'

      />

      {inputTextE && endStationInput&&
      filteredStations
        .filter((line) =>
          line.stations.some((station) =>
            search(getInitials(station.name), String(getInitials(inputTextE)))
          )
        )
        .map((line) => (
          <div key={line.line} className='list'>
            {line.stations
              .filter(
                (station) =>
                  search(getInitials(station.name), String(getInitials(inputTextE))) &&
                  station.name.startsWith(inputTextE)
              )
              .map((station) => (
                <button
                  key={station.ID}
                  className="search-menu"
                  onClick={() => handleMenuClick(station.name,inputTextE)}
                >
                  {line.line}  <span style={{fontWeight:'700'}}> {station.name}  </span> 
                </button>
              ))}
          </div>
        ))}
        </div>
        <div className='btnBlock'>
          <button className = "change"
          onClick={ChangeStartEnd}> &#8645; </button>
        </div>

            {/* <br></br> */}
     
  </div>
  </Container>
  );
};

export default SearchBar;