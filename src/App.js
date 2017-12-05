import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      forecastedWeather: [],
      searchCity: " "
    };
    this.handleChange = this.handleChange.bind(this);
    this.getForecast = this.getForecast.bind(this);
  }

  handleChange(val) {
    this.setState({ searchCity: val });
    console.log(this.state.searchCity);
  }
  getExtendedForecast() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/forecast?zip=${
          this.state.searchCity
        }&appid=39b0a9078bc3441996350bb20ac1bd36`
      )
      .then(response => {
        this.setState({ forecastedWeather: response });
        console.log(response);
        console.log("this is the state", this.state.forecastedWeather);
      })
      .catch(err => err);
  }
  getForecast() {
    console.log(this.state.searchCity);
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${
          this.state.searchCity
        }&appid=39b0a9078bc3441996350bb20ac1bd36`
      )
      .then(response => {
        this.setState({ currentWeather: response });
        console.log(response);
        console.log("this is the state", this.state.currentWeather);
      })
      .catch(err => err);
    this.getExtendedForecast();
  }

  render() {
    return (
      <div className="App">
        <p className="text" id="weather-text">
          Weather Forecast
        </p>
        <p className="text">
          <input
            id="zip"
            type="text"
            placeholder="Enter Zip"
            onChange={e => {
              this.handleChange(e.target.value);
            }}
          />
        </p>
        <button
          id="forecast"
          onClick={e => {
            this.getForecast();
          }}
        >
          Forecast
        </button>
      </div>
    );
  }
}

export default App;
