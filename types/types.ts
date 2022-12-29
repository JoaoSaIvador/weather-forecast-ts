export type City = {
  city: string;
  lat: string;
  lon: string;
};

export type Country = {
  country: string;
  cities: City[];
};

export type SimpleLocation = {
  country: string;
  city: string;
};

export type Location = {
  country: string;
  city: string;
  lat: string;
  lon: string;
};

export type CurrentForecast = {
  date: number;
  description: string;
  icon: string;
  temp: number;
};

export type DailyForecast = {
  date: Date;
  description: string;
  icon: string;
  temp_max: number;
  temp_min: number;
  weekday: string;
};

export type Weather = {
  current: CurrentForecast;
  daily: DailyForecast[];
};
