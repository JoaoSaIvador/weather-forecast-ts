import React, { useState, createContext } from 'react';

import { ToastContainer } from 'react-toastify';

import useCountries from '../hooks/useCountries';
import useGeolocation from '../hooks/useGeolocation';
import useWeather from '../hooks/useWeather';
import { Location, Country, Weather } from '../types/types';

type State = {
  countries: [
    Country[],
    (setValueFunction: (value: Country[]) => Country[]) => void,
    boolean
  ];
  currentLocation: [Location, React.Dispatch<Location>];
  geolocation: [Location, React.Dispatch<Location>];
  weather: [Weather, boolean];
};

type WeatherProviderProps = {
  children: React.ReactNode;
};

export const GlobalState = createContext({} as State);

export const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const { countries, setCountries, countriesFetched } = useCountries();
  const [currentLocation, setCurrentLocation] = useState<null | Location>(null);
  const { geolocation, setGeolocation } = useGeolocation({
    countries,
    setCountries,
    countriesFetched,
  });
  const { weather, loading } = useWeather(currentLocation);

  const state: State = {
    countries: [countries, setCountries, countriesFetched],
    currentLocation: [currentLocation, setCurrentLocation],
    geolocation: [geolocation, setGeolocation],
    weather: [weather, loading],
  };

  return (
    <GlobalState.Provider value={state}>
      {children}
      <ToastContainer
        position='top-right'
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='colored'
      />
    </GlobalState.Provider>
  );
};
