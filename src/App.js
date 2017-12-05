import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentWeather: {},
      condition: "",
      conditionDescription: "",
      temp: "",
      searchCity: " ",
      cardVisible: "hide",
      windSpeed: "",
      windChill: "",
      icon: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.getForecast = this.getForecast.bind(this);
    this.convertTemp = this.convertTemp.bind(this);
  }
  convertTemp(temp) {
    return 1.8 * (temp - 273) + 32;
  }

  handleChange(val) {
    this.setState({ searchCity: val });
    console.log(this.state.searchCity);
  }

  getForecast() {
    axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?zip=${
          this.state.searchCity
        }&appid=39b0a9078bc3441996350bb20ac1bd36`
      )
      .then(response => {
        this.setState({
          currentWeather: response.data,
          temp: response.data.main.temp,
          condition: response.data.weather[0].main,
          conditionDescription: response.data.weather[0].description,
          windSpeed: response.data.wind.speed,
          windChill: response.data.wind.deg,
          icon: `http://openweathermap.org/img/w/${
            response.data.weather[0].icon
          }.png`,
          cardVisible: "show"
        });
        console.log("here is the new state", this.state);
        //console.log("this is the state", this.state.currentWeather);
      })
      .catch(err => err);
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
        <p id="city">{this.state.currentWeather.name}</p>
        <div id="current-forecast">
          <p id="type" />
        </div>
        <div id="weather-box" className={this.state.cardVisible}>
          <p className="weather-box-text" id="conditions">
            {this.state.condition}
          </p>
          <img src={this.state.icon} id="icon" />
          <p className="weather-box-text" id="degrees">
            {Math.floor(this.convertTemp(this.state.temp))}
            &#8457;
          </p>
          <p className="weather-box-text" id="wind-speed">
            Wind: {this.state.windSpeed} mph
          </p>
        </div>
      </div>
    );
  }
}

export default App;
