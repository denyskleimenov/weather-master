import { getColor, getWeatherIcon } from '../helpers';
import { WeatherConditions } from '../types/WeatherConditions';

export const iconStyles = 'fill-cyan-50 bg-slate-400/25 rounded-md p-2 h-14 w-14 mb-0.5';

type Props = {
  dateTime: string;
  temperature: number;
  weatherStatus: string;
  weather?: WeatherConditions;
};

export const ForecastCard: React.FC<Props> = ({
  dateTime,
  temperature,
  weatherStatus,
  weather,
}) => {
  const date = new Date(dateTime);

  if (date.getDay() !== new Date().getDay()) {
    return;
  }

  const time = new Date(dateTime).toTimeString().slice(0, 5);

  return (
    <li
      className={`flex flex-col bg-gray-500/10 rounded-lg 
        items-center w-24 p-3 justify-between backdrop-blur-md ${getColor(weather).card}`}
    >
      <span className='text-xl font-normal after:block after:bg-gray-500/50 after:h-[0.080rem]'>
        {time}
      </span>
      <div className='text-center'>
        {getWeatherIcon(weatherStatus, weather)}
        <div className='font-semibold text-2xl h-fit'>{temperature}&deg;C</div>
      </div>
    </li>
  );
};
