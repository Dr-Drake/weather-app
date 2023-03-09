import React, { useState, useEffect } from "react";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { WeatherResponse } from "../types/WeatherResponse";
import { capitalizeFirstLetter } from "../utils/stringFormatUtils";
import { InputContainer, MainContainer, WeatherDataDisplay, WeatherFooter, WeatherInput } from "./styles";

interface WeatherData {
    description: string;
    icon: string;
    temp: number;
    humidity: number;
    "feels_like": number;
    "speed": number;
}

const API_KEY = "52a02f8dcaf54232a2c1a384b29841b1" //"your_api_key_here";

const WeatherApp: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const search$ = new Observable<string>((subscriber) => {
        const handleInput = (event: any) => {
        subscriber.next(event.target.value);
        };

        const input = document.getElementById("search-input");
        input?.addEventListener("input", handleInput);

        return () => {
        input?.removeEventListener("input", handleInput);
        };
    });

    const weather$ = search$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.trim() === "") {
          return new Observable((subscriber) => {
            subscriber.next(null);
          });
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`;

        return fetch(url).then((response) => response.json());
      })
    );

    const subscription = weather$.subscribe((data: WeatherResponse | null) => {
      if (data === null) {
        setWeatherData(null);
        return;
      }

      setWeatherData({
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp: data.main.temp,
        humidity: data.main.humidity,
        "feels_like": data.main.feels_like,
        "speed": data.wind.speed
      });
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <MainContainer>
        {/* <h1>Weather App</h1> */}

        {/** Input */}
        <InputContainer>
            <WeatherInput id="search-input" type="text" placeholder="Enter a city"/>
        </InputContainer>

        {/** Data display */}
        <WeatherDataDisplay>
            {
                weatherData &&
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
                !weatherData &&
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
