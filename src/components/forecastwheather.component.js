import React from 'react';

function getWeatherIcone(rangeId) {
    switch (true) {
        case rangeId >= 200 && rangeId <= 232:
            return "wi wi-thunderstorm";
            break;
        case rangeId >= 300 && rangeId <= 321:
            return "wi wi-rain";
            break;
        case rangeId >= 500 && rangeId <= 531:
            return "wi wi-hail";
            break;
        case rangeId >= 600 && rangeId <= 622:
            return "wi wi-snow";
            break;
        case rangeId >= 701 && rangeId <= 781:
            return "wi wi-cloudy-windy";
            break;
        case rangeId == 800:
            return "wi wi-day-sunny";
            break;
        case rangeId >= 801 && rangeId <= 804:
            return "wi wi-cloud";
            break;
    }
}
function calCelsius(temp) {
    return Math.floor(temp - 273.15);
}

function formatAMPM(dt) {
    var d = new Date(dt),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;
}

export default function ForecastWheather(props) {
    return (
        <div className="card my-forecastcard">
            <div className="card-body text-center">
                <h1>
                    <i className={getWeatherIcone(props.forecastDetail.weather[0].id)}></i>
                </h1>
                <h6 className="my-font">
                    <span>Humadity:</span>&nbsp;<span>{props.forecastDetail.main.humidity}%</span>
                </h6>
                <h6 className="my-font">
                    <span>High temp:</span>&nbsp;<span>{calCelsius(props.forecastDetail.main.temp_max)}<i className="wi wi-celsius"></i></span>
                </h6>
                <h6 className="my-font">
                    <span>Low temp:</span>&nbsp;<span>{calCelsius(props.forecastDetail.main.temp_min)}<i className="wi wi-celsius"></i></span>
                </h6>
                <p className="card-text" style={{'font-weight':'600'}}>{props.forecastDetail.weather[0].description}</p>
                <p className="card-text" style={{'font-weight':'700'}}>{formatAMPM(props.forecastDetail.dt_txt)}</p>
            </div>
        </div>

    )
}