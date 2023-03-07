import React from "react";

const DailyWeather = ({ dateNum, dayIcon, tempHigh, tempLow, weatherDescription , sunRise , sunSet }) => {
    dateNum = new Date(dateNum * 1000)
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }
    dateNum = Intl.DateTimeFormat('en-US', options).format(dateNum);
    let dateArray = dateNum.split(",");
    let dateTime = dateArray[1].replace("at", ",");

    const time = (sunTime) =>{
        sunTime = new Date(sunTime *1000)
        let options = {
            hour : "numeric",
            minute : "numeric"
        }
        sunTime =  Intl.DateTimeFormat('en-US', options).format(sunTime);
        return sunTime;
    }

    return (<div className="grid">
        <h3>{dateArray[0]}</h3>
        <p className="fontColor">{dateTime}</p>
        <img className="blacknWhite" src={dayIcon} alt="Weather Icon" />
        <div className="splitContainer">
            <span className="split">
                <p className="smaller">Low - {tempLow} °C</p>
                <p className="smaller">High - {tempHigh} °C</p>
            </span>
            <span >
                <p className="smaller">Sunrise - {time(sunRise)}</p>
                <p className="smaller">Sunset - {time(sunSet)}</p>
            </span>
        </div>
        <p>{weatherDescription}</p>
    </div>)
}
export default DailyWeather

// Notes:
// dateNum : An integer value representing the number of milliseconds since January 1, 1970, 00:00:00 
// getDay() returns day of the week starting from 0 (sunday)