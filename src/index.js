import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import useLocalStorage from './hooks/UseLocalStorage'

import Charts from "./components/Charts";
import Navbar from "./components/Navbar";

import "./styles.scss";

const App = () => {

  // const initialState = {
  //   first: '',
  //   last: ''
  // }

  // const [first] = useLocalStorage('first', 'Randy')
  const [name, setName] = useLocalStorage('first', 'Randy')
  const [coinData, setCoinData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true"
      )
      .then(res => setCoinData(res.data))
      .catch(err => console.log(err));
  }, []);
  return (
    <div className={darkMode ? "dark-mode App" : "App"}>
      <h1>{name}</h1>
      {/* <h1>{last}</h1> */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
