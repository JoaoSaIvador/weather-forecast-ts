import { successToastNotification } from './auxiliary';
import { NextRouter } from 'next/router';
import { Country, SimpleLocation, Location } from '../types/types';

export const removeLocation = (
  location: SimpleLocation,
  countries: Country[],
  setCountries: (
    setValueFunction: Country[] | ((value: Country[]) => Country[])
  ) => void,
  setCurrentLocation: React.Dispatch<null | Location>,
  router: NextRouter
) => {
  const countryIndex = countries.findIndex(
    (country) => country.country === location.country
  );

  if (countries[countryIndex].cities.length > 1) {
    const cityIndex = countries[countryIndex].cities.findIndex(
      (city) => city.city === location.city
    );

    // Remove selected city from cities array
    setCountries((prevCountries) => {
      prevCountries[countryIndex].cities.splice(cityIndex, 1);
      const newCountries = [...prevCountries];
      localStorage.setItem('countries', JSON.stringify(newCountries));
      return newCountries;
    });

    router.push(`/${countries[0].country}/${countries[0].cities[0].city}`);
  } else {
    if (countries.length > 1) {
      // Remove country from countries array
      setCountries((prevCountries) => {
        prevCountries.splice(countryIndex, 1);
        const newCountries = [...prevCountries];
        localStorage.setItem('countries', JSON.stringify(newCountries));
        return newCountries;
      });

      router.push(`/${countries[0].country}/${countries[0].cities[0].city}`);
    } else {
      setCountries([]);
      localStorage.setItem('countries', JSON.stringify([]));
      setCurrentLocation(null);
      router.push('/');
    }
  }

  successToastNotification(
    `${location.city}, ${location.country} was removed from your locations!`
  );
};
