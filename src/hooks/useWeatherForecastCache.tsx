import axios, { AxiosResponse } from "axios";
import { WeatherResponse } from "../types/WeatherResponse";
import { WeatherData } from "./useWeatherForecast";
import useSwr from "swr";


const API_KEY = "52a02f8dcaf54232a2c1a384b29841b1" //"your_api_key_here";

export function useWeatherForecastCache(searchTerm?: string){
    // Fetcher
    const fetcher = (url: string) => axios.get(url).
    then((res: AxiosResponse<WeatherResponse>) => res.data);
    

    // Fetching hook
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm?.toLowerCase()}&units=metric&appid=${API_KEY}`;
    const { data, error, mutate } = useSwr(apiUrl, fetcher);

    let weatherData: WeatherData = {
        description: data?.weather[0].description || '',
        icon: data?.weather[0].icon || '',
        temp: data?.main.temp || 0,
        humidity: data?.main.humidity || 0,
        "feels_like": data?.main.feels_like || 0,
        "speed": data?.wind.speed || 0,
    }

    return {
        data: weatherData,
        isLoading: !error && !data,
        error: error,
        mutate: mutate
    }
}