import React, { useState, useEffect } from 'react';
import DailyWeather from './DailyWeather'
import CurrentWeather from './CurrentWeather'

const Weather = () => {
    const [weatherData, setWeatherData] = useState();
    const [city, setCity] = useState("")
    const [api, setApi] = useState({
        data: [],
        error: "",
        loading: true
    })
    const APIKey = "ffe63745a1e6cbad92e44b2bf6f0ea6a";

    let tempData;
    async function fetchData() {
        try {
            setApi(prev => ({ ...prev, loading: true }))
            const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIKey}`)
            const place = await res.json();
            tempData = { lat: place[0].lat, lon: place[0].lon , city : place[0].name, state : place[0].state , country : place[0].country};
            setApi(prev => ({ ...prev, loading: false, data: tempData }))
        }
        catch (error) {
            setApi(prev => ({ ...prev, loading: false, data: [] }))
            console.error(error);
        }
    }

    async function fetchWeatherData() {
        const data = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${api.data.lat}&lon=${api.data.lon}&units=metric&exclude=minutely&appid=${APIKey}`)
        const weatherData = await data.json()
        setWeatherData(weatherData)
    }

    useEffect(() => {
        if (!api.loading) {
            fetchWeatherData()
        }
    }, [api.loading])

    function searchLocation(e) {
        if (e.key === "Enter") {
            fetchData()
        }
    }

    return (
        <div className="alignment">
            <p className="larger">5-Day Weather Forecast</p>
            <div className="searchBar">
                <input
                    value={city}
                    type="search"
                    placeholder="Enter Location"
                    onChange={(e) => setCity(e.target.value)}
                    onKeyPress={searchLocation} />
            </div>
            {weatherData ? 
                <CurrentWeather
                    location={api}
                    date={weatherData.current.dt}
                    tempCurrent={weatherData.current.feels_like}
                    dayIcon={`https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} //icon url from openWeather
                    humidity={weatherData.current.humidity}
                    windSpeed={weatherData.current.wind_speed}
                    weatherDescription={weatherData.current.weather[0].description}
                    sunRise={weatherData.current.sunrise}
                    sunSet={weatherData.current.sunset}
                />
            : "" }
            <br></br>
            {weatherData ?
                weatherData.daily.slice(0, 5).map((day, index) => {
                    return (
                        <DailyWeather key={index}
                            dateNum={day.dt}
                            dayIcon={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} //icon url from openWeather
                            tempHigh={day.temp.max}
                            tempLow={day.temp.min}
                            weatherDescription={day.weather[0].description}
                            sunRise={day.sunrise}
                            sunSet={day.sunset}
                        />
                    )
                })
                : api.loading ? <h2>Search Weather</h2> : <h2>Loading ...</h2>}
        </div>
    )
}
export default Weather;