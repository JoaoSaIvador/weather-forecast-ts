import { DailyForecast, CurrentForecast } from '../../types/types';

type WeatherCardProps = {
  weather: CurrentForecast | DailyForecast;
  title: string;
  children: React.ReactNode;
};

function WeatherCard({ weather, title, children }: WeatherCardProps) {
  return (
    <div className='w-100 d-flex flex-column justify-content-between align-items-center p-3 m-3 weather-card'>
      <span className='fs-5'>{title}</span>
      <img
        data-testid='icon'
        src={
          weather?.icon
            ? `http://openweathermap.org/img/wn/${weather.icon}@2x.png`
            : ''
        }
        alt=''
        style={{ maxWidth: '100px' }}
      />
      <span
        className='text-center text-capitalize h-100'
        style={{ maxHeight: '50px' }}
      >
        {weather?.description}
      </span>
      {children}
    </div>
  );
}

export default WeatherCard;
