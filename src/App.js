import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "weather-icons/css/weather-icons.min.css";
import Navbar from "./components/navbar.component";
import ForecastWeather from "./components/forecastwheather.component";
import Chart from "./components/chart.component";

const api = {
  key: "75c2f32c4a3d2df99698c0e8fa6033a3",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

function convertTime(unixTime) {
  let dt = new Date(unixTime * 1000)
  let h = dt.getHours()
  let m = "0" + dt.getMinutes()
  let t = h + ":" + m.substr(-2)
  return t
}

function CityComponent(props) {
  return (
    <div className="card my-citycard">
      <div className="card-header text-center"><h2>{props.city} , {props.country}</h2></div>
      <div className="card-body text-center">
        <h6>
          <span>Coordinates:</span>&nbsp;<span>{Math.round(parseInt(props.coords.lat).toFixed(4))} , {Math.round(parseInt(props.coords.lon).toFixed(4))}</span>
        </h6>
        <h6 className="my-font">
          <span>Sunrise:</span>&nbsp;<span>{convertTime(props.sunrise)}<i className="wi wi-sunrise"></i></span>
        </h6>
        <h6 className="my-font">
          <span>Sunset:</span>&nbsp;<span>{convertTime(props.sunset)}<i className="wi wi-sunset"></i></span>
        </h6>
      </div>
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.onChangeCity = this.onChangeCity.bind(this);
    this.getWheatherData = this.getWheatherData.bind(this);
    this.state = {
      cityName: "",
      forecastData: undefined,
      cityData: undefined,
      chartData: []
    }
  }

  getWheatherData = async (event) => {
    if (event.key === "Enter") {
      const api_call = await fetch(`${api.baseUrl}forecast?q=${this.state.cityName}&appid=${api.key}`);
      const response = await api_call.json();
      console.log(response);
      if (response.cod != "200") {
        alert("enter proper city name")
        return
      }
      this.setState({
        forecastData: response.list,
        cityData: response.city,
      })

      // if (response.cod != "200") this.setState({ chartData: [] })
    }
  }

  city() {
    return <CityComponent coords={this.state.cityData.coord}
      sunrise={this.state.cityData.sunrise}
      sunset={this.state.cityData.sunset}
      city={this.state.cityData.name}
      country={this.state.cityData.country} />
  }


  forecastWeatherList() {
    this.state.chartData = [];
    // return this.state.forecastData.map((currentexercise, i) => {
    //   if (i != 0) {
    //     if (i % 7 == 0 && i < 35) {
    //       i--;
    //       this.state.chartData.push(currentexercise);
    //       return <ForecastWeather forecastDetail={currentexercise} key={currentexercise.dt} />
    //     }
    //   }
    // })
    return this.state.forecastData.map((currentexercise, i) => {
      // if (i != 0) {
      if (i < 5) {
        this.state.chartData.push(currentexercise);
        return <ForecastWeather forecastDetail={currentexercise} key={currentexercise.dt} />
      }
      // }
    })
  }

  onChangeCity(e) {
    this.setState({
      cityName: e.target.value
    })
  }
  render() {
    return (
      <Router>
        <div className="container">
          <Navbar changeCity={this.onChangeCity} cname={this.cityName} getData={this.getWheatherData} />
          {(typeof this.state.cityData != 'undefined') ?
            this.city() :
            ''
          }
          <div className="card-deck">
            {(typeof this.state.forecastData != 'undefined') ?
              this.forecastWeatherList() :
              ''
            }
          </div>
          <Chart chartDetails={this.state.chartData} />
        </div>
      </Router>
    )
  }
}
