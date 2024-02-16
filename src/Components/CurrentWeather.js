import React from "react";
const CurrentWeather = ({ location, date, tempCurrent, dayIcon, humidity, windSpeed, weatherDescription, sunRise, sunSet }) => {

    date = new Date(date * 1000)
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }

    date = Intl.DateTimeFormat('en-US', options).format(date);
    let dateArray = date.split(",");
    let dateTime = dateArray[1].replace("at", ",");

    const time = (sunTime) => {
        sunTime = new Date(sunTime * 1000)
        let options = {
            hour: "numeric",
            minute: "numeric"
        }
        sunTime = Intl.DateTimeFormat('en-US', options).format(sunTime);
        return sunTime;
    }
    return (
        <div className="currentData">
            <p className="fontColor bold">{location.data.city} ,{location.data.state} ,{location.data.country} </p>
            <h3>{dateArray[0]}</h3>
            <p className="fontColor">{dateTime}</p>
            <h1>{tempCurrent} °C</h1>
            <img className="blacknWhite" src={dayIcon} alt="Weather Icon" />
            <div className="splitContainer smaller">
                <span className="split">
                    <p>Humidity - {humidity} %</p>
                    <p>Wind Speed - {windSpeed} m/sec</p>
                </span>
                <span >
                    <p>Sunrise - {time(sunRise)}</p>
                    <p>Sunset - {time(sunSet)}</p>
                </span>
            </div>
            <p>{weatherDescription}</p>
            {/* creating router link to display hourly forecast */}
        </div>)
}
export default CurrentWeather;