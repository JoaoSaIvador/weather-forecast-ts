import { useEffect, useState } from 'react';
import axios from 'axios';
import { Location, Weather } from '../types/types';

const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function useWeather(location: Location) {
  const [weather, setWeather] = useState<null | Weather>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);
      const { data: weatherJSON } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&exclude=minutely,hourly,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      // Remove current day from forecast list
      weatherJSON.daily.shift();

      // Filter out useless data
      const formattedDaily = weatherJSON.daily.map((daily: any) => ({
        date: new Date(daily.dt * 1000),
        weekday: weekDays[new Date(daily.dt * 1000).getDay()],
        temp_min: daily.temp.min,
        temp_max: daily.temp.max,
        description: daily.weather[0].description,
        icon: daily.weather[0].icon,
      }));

      const data: Weather = {
        current: {
          date: weatherJSON.current.dt,
          temp: weatherJSON.current.temp,
          description: weatherJSON.current.weather[0].description,
          icon: weatherJSON.current.weather[0].icon,
        },
        daily: formattedDaily,
      };

      setWeather(data);
      setLoading(false);
    };

    if (location) {
      getWeather();
    }
  }, [location]);

  return { weather, loading };
}

export default useWeather;
