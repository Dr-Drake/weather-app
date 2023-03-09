import React, { useState } from "react";
import { useWeatherForecastCache } from "../hooks/useWeatherForecastCache";
import { capitalizeFirstLetter } from "../utils/stringFormatUtils";
import { InputContainer, MainContainer, WeatherDataDisplay, WeatherFooter, WeatherInput } from "./styles";

const WeatherApp: React.FC = () => {
 
    // State
    const [searchQuery, setSearchQuery] = useState("");
    const [tempQuery, setTempQuery] = useState("");

    // Hooks
    const { data: weatherData } = useWeatherForecastCache(searchQuery);

    // Handlers
    const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e)=>{
        setTempQuery(e.target.value);
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e)=>{
        e.preventDefault();
        setSearchQuery(tempQuery);
    }

  return (
    <MainContainer>
        {/* <h1>Weather App</h1> */}

        {/** Input */}
        <InputContainer>
            <form onSubmit={handleSubmit}>
                <WeatherInput 
                    id="search-input" type="text" 
                    placeholder="Enter a city"
                    onChange={handleInput}
                />
            </form>
        </InputContainer>

        {/** Data display */}
        <WeatherDataDisplay>
            {
                weatherData.description &&
                <>
                    <p>{capitalizeFirstLetter(weatherData.description)}</p>
                    <img
                        src={`http://openweathermap.org/img/w/${weatherData.icon}.png`}
                        alt={weatherData.description}
                    />
                    <p className="temp">{weatherData.temp}°C</p>
                </>
            }
            {
                !weatherData.description &&
                <p>No weather data available</p>
            }
        </WeatherDataDisplay>

        <WeatherFooter>
            <div className="bottom">
                <div className="meta">
                    <p>{weatherData?.feels_like}°C</p>
                    <p>Feels Like</p>
                </div>
                <div className="meta">
                    <p>{weatherData?.humidity}%</p>
                    <p>Humidity</p>
                </div>
                <div className="meta">
                    <p>{weatherData?.speed} MPH</p>
                    <p>Wind Speed</p>
                </div>
            </div>
        </WeatherFooter>

    </MainContainer>
  );
};

export default WeatherApp;
