import { WeatherConditions } from "./WeatherConditions";

export type WeatherInfo = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: [
    {
      main: WeatherConditions;
    },
  ];
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  sys: {
    country: string;
  };
  timezone: number;
  name: string;
};
