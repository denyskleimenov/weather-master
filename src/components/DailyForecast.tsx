import { ForecastInfo } from '../types/ForecastInfo';
import { getColor, getWeatherIcon } from '../helpers';
import { WeatherConditions } from '../types/WeatherConditions';

type Props = {
  dailyForecast: ForecastInfo;
  weather?: WeatherConditions;
};

export const DailyForecast: React.FC<Props> = ({ dailyForecast, weather }) => {
  return (
    <li className={`flex text-xl font-normal ${getColor(weather).text}`}>
      {getWeatherIcon(dailyForecast.weatherStatus, weather)}
      <div className='flex justify-between w-full'>
        <div className='flex flex-col ml-4 after:block after:w-1 after:bg-gray-500/50 after:h-full'>
          <span>{dailyForecast.date}</span>
          <span>{dailyForecast.weatherStatus}</span>
        </div>
        <div className='flex'>
          <span className={`${getColor(weather).cardSeparator} mx-1 h-full w-[0.1rem] mr-4`}></span>
          <div className='flex flex-col w-8 text-center'>
            <span>{dailyForecast.minTemp}&deg;</span>
            <span>{dailyForecast.maxTemp}&deg;</span>
          </div>
        </div>
      </div>
    </li>
  );
};
