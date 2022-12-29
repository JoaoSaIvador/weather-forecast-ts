import { successToastNotification } from './auxiliary';
import { Location, Country } from '../types/types';
import { NextRouter } from 'next/router';

export const addLocation = (
  location: Location,
  countries: Country[],
  setCountries: (setValueFunction: (value: Country[]) => Country[]) => void,
  router: NextRouter
) => {
  const country = location.country;
  const city = {
    city: location.city,
    lat: location.lat,
    lon: location.lon,
  };

  const i = countries.findIndex((c) => c.country === country);

  // Check if inserted country already exists
  // If yes, just update the cities array,
  // If not just insert a new country in the countries array
  if (i > -1) {
    // Check if inserted city already exists
    if (countries[i].cities.every((c) => c.city !== city.city)) {
      setCountries((prevCountries: Country[]) => {
        prevCountries[i].cities.push(city);
        prevCountries[i].cities.sort((a, b) =>
          a.city.toLowerCase().localeCompare(b.city.toLowerCase())
        );

        return [...prevCountries];
      });
    } else {
      router.push(`/${country}/${city.city}`);
      return;
    }
  } else {
    setCountries((prevCountries) => {
      prevCountries.push({
        country,
        cities: [city],
      });
      prevCountries.sort((a, b) =>
        a.country.toLowerCase().localeCompare(b.country.toLowerCase())
      );
      return [...prevCountries];
    });
  }

  router.push(`/${country}/${city.city}`);

  successToastNotification(
    `${city.city}, ${country} was added to your locations!`
  );
};
