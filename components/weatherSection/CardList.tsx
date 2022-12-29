import { useContext } from 'react';
import { GlobalState } from '../../contexts/globalState';
import WeatherCard from './WeatherCard';

function CardList() {
  const state = useContext(GlobalState);
  const [weather] = state.weather;

  return (
    weather && (
      <div
        className='w-100 d-flex flex-row flex-wrap justify-content-center'
        style={{ maxWidth: '800px' }}
      >
        <WeatherCard weather={weather.current} title='Today'>
          <span data-testid='temp' className='fw-bold mt-3 fs-5'>
            {Math.round(weather.current.temp)}ºC
          </span>
        </WeatherCard>
        {weather.daily.map((daily) => {
          return (
            <WeatherCard
              weather={daily}
              title={daily.weekday}
              key={daily.date.toString()}
            >
              <div className='w-100 d-flex justify-content-between'>
                <span
                  data-testid='temp'
                  className='fw-bold mt-3 fs-6 text-primary'
                >
                  {Math.round(daily.temp_min)}ºC
                </span>
                <span
                  data-testid='temp'
                  className='fw-bold mt-3 fs-6 text-danger'
                >
                  {Math.round(daily.temp_max)}ºC
                </span>
              </div>
            </WeatherCard>
          );
        })}
      </div>
    )
  );
}

export default CardList;
