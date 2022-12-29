import { useState, useEffect } from 'react';
import { Country } from '../types/types';

function useCountries() {
  const [countries, setCountries] = useState([] as Country[]);
  const [countriesFetched, setCountriesFetched] = useState<boolean>(false);

  // Get stored countries if there are any
  useEffect(() => {
    const getCountries = () => {
      const oldCountries = JSON.parse(
        localStorage.getItem('countries') ?? '[]'
      );

      if (oldCountries.length > 0) {
        setCountries(oldCountries);
      }

      setCountriesFetched(true);
    };

    getCountries();
  }, []);

  // Persist countries to the local storage
  useEffect(() => {
    if (countries.length > 0) {
      localStorage.setItem('countries', JSON.stringify(countries));
    }
  }, [countries]);

  return { countries, setCountries, countriesFetched };
}

export default useCountries;
