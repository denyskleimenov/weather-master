import {
  getColor,
  getDateTime,
  getWeatherVideo,
  transformForecast,
} from './helpers';
import { useEffect, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { ForecastList } from './components/ForecastList';
import { WeatherInfo } from './types/WeatherInfo';
import { getCurrentWeather, getForecast } from './api/weather';
import { ForecastInfo } from './types/ForecastInfo';

const App: React.FC = () => {
  const [dateTime, setDateTime] = useState<{ date: string; time: string; }>(getDateTime());
  const [selectedCity, setSelectedCity] = useState('Kyiv');
  const [forecast, setForecast] = useState<ForecastInfo[]>([]);
  const [currentWeather, setCurrentWeather] = useState<WeatherInfo | null>(null);
  const weather = currentWeather?.weather[0].main;

  useEffect(() => {
    setInterval(() => {
      setDateTime(getDateTime());
    }, 10000);

    const getCurrentWeatherFromServer = async () => {
      const currentWeatherFromServer = await getCurrentWeather(selectedCity);

      setCurrentWeather(currentWeatherFromServer);
    };

    getCurrentWeatherFromServer();
  }, []);

  useEffect(() => {
    const getCurrentWeatherFromServer = async () => {
      const currentWeatherFromServer = await getCurrentWeather(selectedCity);

      setCurrentWeather(currentWeatherFromServer);
    };

    const getForecastInfo = async () => {
      const forecastInfoFromServer = await getForecast(selectedCity);

      setForecast(forecastInfoFromServer.list);
    };

    getCurrentWeatherFromServer();
    getForecastInfo();
  }, [selectedCity]);

  const filteredForecast = transformForecast(forecast);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSelectedCity(event.currentTarget.value);
      event.currentTarget.value = '';
    }
  };

  return (
    <div
      className='box-border font-main text-4xl
        min-h-full text-cyan-50 font-light flex'
    >
      <div className='fixed top-0 left-0 w-full h-full'>
        <video
          src={getWeatherVideo(weather)}
          loop
          autoPlay={true}
          muted
          className='min-w-full min-h-full top-50 left-50 object-cover'
        ></video>
      </div>
      <div className='flex flex-col justify-between w-full text-end relative p-7'>
        <div className='text-3xl font-normal flex justify-end'>
          <span>{dateTime?.date}</span>
          <span className='text-gray-500/50 mx-1'>|</span>
          <span>{dateTime?.time}</span>
        </div>
        <input
          type='text'
          autoComplete='city'
          className={`min-w-0 self-center rounded-md border-0 bg-white/20 w-96 px-3.5 py-2 
            ${
              getColor(weather).input
            } shadow-sm ring-1 ring-inset ring-black/10 focus:ring-2
            focus:ring-inset outline-none placeholder:${
              getColor(weather).input
            }/50`}
          placeholder='Enter city'
          onKeyDown={handleKeyDown}
        />
        <div>
          <div
            className={`text-7xl font-medium after:bg-gray-500/50 
              after:h-0.5 after:block after:mt-8 after:mb-6 ${getColor(weather).title}`}
          >
            {weather}
          </div>
          <ForecastList forecast={forecast} weather={weather} />
        </div>
      </div>
      <Sidebar
        city={selectedCity}
        setSelectedCity={setSelectedCity}
        currentWeather={currentWeather}
        forecast={filteredForecast}
      />
    </div>
  );
};

export default App;
