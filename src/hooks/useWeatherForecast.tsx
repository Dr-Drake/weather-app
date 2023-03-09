import React from "react";
import { Observable } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { WeatherResponse } from "../types/WeatherResponse";

export interface WeatherData {
    description: string;
    icon: string;
    temp: number;
    humidity: number;
    "feels_like": number;
    "speed": number;
}

const API_KEY = "52a02f8dcaf54232a2c1a384b29841b1" //"your_api_key_here";

export default function useWeatherForecast(searchTerm: string) {

    const [weatherData, setWeatherData] = React.useState<WeatherData | null>(null);

    React.useEffect(() => {
        const search$ = new Observable<string>((subscriber) => {
            subscriber.next(searchTerm);
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
    
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
    
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
      }, [searchTerm]);

    return weatherData;
    
}