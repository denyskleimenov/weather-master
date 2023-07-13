import { useEffect, useState } from 'react';
import { BsGeoAlt } from 'react-icons/bs';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { WiStrongWind } from 'react-icons/wi';
import { WeatherInfo } from '../types/WeatherInfo';
import { convertDegreesToDirection, getColor } from '../helpers';
import { ForecastInfo } from '../types/ForecastInfo';
import { DailyForecast } from './DailyForecast';

type Props = {
  city: string;
  setSelectedCity: (city: string) => void;
  currentWeather: WeatherInfo | null;
  forecast: ForecastInfo[];
};

export const Sidebar: React.FC<Props> = ({
  city,
  setSelectedCity,
  currentWeather,
  forecast,
}) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([city]);
  const [opened, setOpened] = useState(false);
  const currentTemperature = currentWeather && Math.trunc(currentWeather?.main.temp);
  const currentWind = currentWeather && +(currentWeather?.wind.speed * 3.6).toFixed(1);
  const windDirection = currentWeather && convertDegreesToDirection(currentWeather?.wind.deg);
  const weather = currentWeather?.weather[0].main;

  useEffect(() => {
    setOpened(false);
    if (!selectedCities.includes(city) && selectedCities.length < 5) {
      setSelectedCities((cities) => [city, ...cities]);

      return;
    }

    if (!selectedCities.includes(city) && selectedCities.length >= 5) {
      setSelectedCities((cities) => [city, ...cities.slice(0, 4)]);

      return;
    }

    if (selectedCities.includes(city)) {
      setSelectedCities((cities) => {
        const newCitiess = cities.filter((listCity) => listCity !== city);
        newCitiess.unshift(city);

        return newCitiess;
      });
    }
  }, [city]);

  const toggleSelect = () => {
    setOpened(!opened);
  };

  const handleChangeCity = (city: string) => {
    setSelectedCity(city);
    toggleSelect();
  };

  return (
    <div
      className='backdrop-blur-md min-w-[24rem] border-l
      border-gray-500/50 hidden md:block px-7 pt-4 relative'
    >
      <div
        className={`mt-2 flex border-gray-500/50 border-[1px]
          rounded-lg text-2xl items-center px-2 py-1 select-none ${getColor(weather).sidebarText}`}
        onClick={toggleSelect}
      >
        <div className='flex items-center w-full font-medium whitespace-nowrap mr-4'>
          <BsGeoAlt className='h-5 w-5 mr-2' />
          {`${city}, ${currentWeather?.sys.country || 'Unknown'}`}
        </div>
        {opened ? <IoIosArrowUp /> : <IoIosArrowDown />}
      </div>
      {opened && (
        <div
          className={`mt-2 flex flex-col border-gray-500/50 border-[1px]
            rounded-lg text-2xl select-none absolute w-[20.51rem] border-box ${getColor(weather).sidebarText}`}
        >
          {selectedCities.map((city, i) => (
            <span
              key={i}
              className={`p-2 whitespace-nowrap bg-cyan-700 hover:bg-cyan-500 px-2 py-1 ${!i && 'rounded-t-lg'}
                ${i === selectedCities.length - 1 && 'rounded-b-lg'}`}
              onClick={() => handleChangeCity(city)}
            >
              {city}
            </span>
          ))}
        </div>
      )}
      <div className={`text-7xl font-medium text-center
            pt-8 pb-5 ${getColor(weather).sidebarText}`}
      >
        {currentTemperature}&deg;C
      </div>
      <div
        className={`flex text-lg items-center gap-1 justify-center
          border-b border-b-gray-500/50 pb-9 mb-8 ${getColor(weather).sidebarText}`}
      >
        <WiStrongWind className='h-8 w-8' />
        <span className={`${getColor(weather).sidebarText}/60 font-normal`}>
          {`${windDirection} ${currentWind} km/h`}
        </span>
      </div>
      <div className='flex w-full justify-center mb-8'>
        <span className={`text-3xl font-medium ${getColor(weather).text}`}>
          The Next Days Forecast
        </span>
      </div>
      <ul className='flex flex-col gap-5'>
        {forecast.map((forecastItem) => (
          <DailyForecast
            key={forecastItem.dt}
            dailyForecast={forecastItem}
            weather={weather}
          />
        ))}
      </ul>
    </div>
  );
};
