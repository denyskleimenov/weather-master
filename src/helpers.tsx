import {
  WiRain,
  WiCloudy,
  WiDayCloudy,
  WiSnow,
  WiDayThunderstorm,
} from 'react-icons/wi';
import { iconStyles } from './components/ForecastCard';
import { ForecastInfo } from './types/ForecastInfo';
import rainVideo from './assets/rain.mp4';
import cloudsVideo from './assets/clouds.mp4';
import mistVideo from './assets/mist.mp4';
import thunderstormVideo from './assets/thunderstorm.mp4';
import { WeatherConditions } from './types/WeatherConditions';

export const getWeatherIcon = (
  weatherStatus?: string,
  weather?: WeatherConditions
) => {
  switch (weatherStatus) {
    case 'Rain':
      return <WiRain className={`${iconStyles} ${getColor(weather).icon}`} />;
    case 'Clear':
      return (
        <WiDayCloudy
          className={`${iconStyles} ${
            getColor(weather).icon
          } pl-[0.6rem] pt-2.5`}
        />
      );
    case 'Snow':
      return <WiSnow className={`${iconStyles} ${getColor(weather).icon}`} />;
    case 'Thunderstorm':
      return (
        <WiDayThunderstorm
          className={`${iconStyles} ${getColor(weather).icon}`}
        />
      );
    default:
      return <WiCloudy className={`${iconStyles} ${getColor(weather).icon}`} />;
  }
};

const dateTimeFormat = new Intl.DateTimeFormat('en-GB', {
  dateStyle: 'long',
  timeStyle: 'short',
});

export const getDateTime = () => {
  const parts = dateTimeFormat.formatToParts(new Date());
  const { month, day, year, hour, minute } = parts.reduce(
    (prev: Record<string, string>, current) => {
      prev[current.type] = current.value;

      return prev;
    },
    {}
  );
  const date = `${day} ${month} ${year}`;
  const time = `${hour}:${minute}`;

  return { date, time };
};

export const convertDegreesToDirection = (angle: number) => {
  const directions = [
    'North',
    'Northeast',
    'East',
    'Southeast',
    'South',
    'Southwest',
    'West',
    'Northwest',
  ];
  const index = Math.round((angle % 360) / 45) % 8;

  return directions[index];
};

export const transformForecast = (forecast: ForecastInfo[]) => {
  const transformedForecasts: ForecastInfo[] = [];

  for (const forecastPart of forecast) {
    if (new Date(forecastPart.dt_txt).getDay() === new Date().getDay()) {
      continue;
    }

    const currentMinTemp = Math.trunc(forecastPart.main.temp_min);
    const currentMaxTemp = Math.trunc(forecastPart.main.temp_max);
    const forecastPartDay = new Date(forecastPart.dt_txt).getDay();
    const sameDayForecast = transformedForecasts.find((transformedForecast) => {
      const day = new Date(transformedForecast.dt_txt).getDay();

      return day === forecastPartDay;
    });

    if (!forecastPart.date) {
      const date = new Date(forecastPart.dt_txt);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'full',
      })
        .format(date)
        .slice(0, -6);

      forecastPart.date = formattedDate;
    }

    if (!sameDayForecast) {
      transformedForecasts.push({
        ...forecastPart,
        minTemp: currentMinTemp,
        maxTemp: currentMaxTemp,
        weatherStatus: forecastPart.weather[0].main,
      });
    }

    if (sameDayForecast?.minTemp && sameDayForecast.minTemp > currentMinTemp) {
      sameDayForecast.minTemp = currentMinTemp;
    }

    if (sameDayForecast?.maxTemp && sameDayForecast.maxTemp < currentMaxTemp) {
      sameDayForecast.maxTemp = currentMaxTemp;
    }
  }

  return transformedForecasts;
};

export const getWeatherVideo = (weather?: string) => {
  switch (weather) {
    case 'Rain':
      return rainVideo;
    case 'Mist':
      return mistVideo;
    case 'Thunderstorm':
      return thunderstormVideo;
    default:
      return cloudsVideo;
  }
};

export const getColor = (weather?: WeatherConditions) => {
  const styles = {
    icon: '',
    text: '',
    input: 'text-black',
    card: '',
    sidebarText: 'text-cyan-50',
    cardSeparator: 'bg-gray-500/50',
    title:
      'text-transparent bg-clip-text bg-gradient-to-t from-slate-700 to-cyan-50',
  };

  switch (weather) {
    case 'Clouds':
    case 'Clear':
      styles.icon = 'bg-zinc-800/25';
      styles.card = 'text-zinc-800';
      styles.text = 'text-zinc-800';
      styles.title =
        'bg-gradient-to-r from-zinc-300 to-zinc-700 bg-clip-text text-transparent';
      return styles;
    case 'Rain':
      styles.input = '';
      styles.cardSeparator = 'bg-cyan-50/50';
      return styles;
    case 'Mist':
      styles.input = 'bg-white/60 text-black placeholder:text-black/50';
      styles.icon = 'bg-zinc-800/25';
      styles.text = 'text-zinc-800';
      styles.sidebarText = 'text-zinc-800';
      styles.title = '';
      return styles;
    case 'Thunderstorm':
      styles.input = '';
      return styles;
    default:
      return styles;
  }
};
