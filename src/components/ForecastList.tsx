import { ForecastCard } from './ForecastCard';
import { ForecastInfo } from '../types/ForecastInfo';
import { WeatherConditions } from '../types/WeatherConditions';

type Props = {
  forecast: ForecastInfo[];
  weather?: WeatherConditions;
};

export const ForecastList: React.FC<Props> = ({ forecast, weather }) => (
  <ul className={`flex gap-4 h-40 justify-center`}>
    {forecast.map((hourForecast) => (
      <ForecastCard
        key={hourForecast.dt_txt}
        dateTime={hourForecast.dt_txt}
        temperature={Math.trunc(hourForecast.main.temp)}
        weatherStatus={hourForecast.weather[0].main}
        weather={weather}
      />
    ))}
  </ul>
);
