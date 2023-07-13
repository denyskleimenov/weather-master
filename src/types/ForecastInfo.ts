import { WeatherInfo } from './WeatherInfo';

export type ForecastInfo = WeatherInfo & {
  dt_txt: string;
  dt: number;
  date?: string;
  minTemp?: number;
  maxTemp?: number;
  weatherStatus?: string;
};
