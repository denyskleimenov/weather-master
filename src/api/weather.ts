import axios, { AxiosRequestConfig } from 'axios';
import { WeatherInfo } from '../types/WeatherInfo';
import { ForecastInfo } from '../types/ForecastInfo';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const FORECAST_URL = 'http://api.openweathermap.org/data/2.5/forecast';

const getCityCoordinates = async (
  city: string
): Promise<{ lat: string; lon: string }[]> => {
  const options: AxiosRequestConfig = {
    params: {
      q: city,
      limit: 1,
      appid: API_KEY,
    },
  };

  const response = await axios.get(GEOCODING_URL, options);

  return response.data;
};

export const getCurrentWeather = async (city: string): Promise<WeatherInfo> => {
  const cityInfo = await getCityCoordinates(city);
  const { lat, lon } = cityInfo[0];

  const options: AxiosRequestConfig = {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    },
  };

  const response = await axios.get(WEATHER_URL, options);

  return response.data;
};

export const getForecast = async (
  city: string
): Promise<{ list: ForecastInfo[] }> => {
  const cityInfo = await getCityCoordinates(city);
  const { lat, lon } = cityInfo[0];

  const options: AxiosRequestConfig = {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units: 'metric',
    },
  };

  const response = await axios.get(FORECAST_URL, options);

  return response.data;
};
