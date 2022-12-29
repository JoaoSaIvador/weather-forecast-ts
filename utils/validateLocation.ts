import axios from 'axios';
import lookup from 'country-code-lookup';
import { Location } from '../types/types';
import { initCap } from './auxiliary';

export const validateLocation = async (location: Location) => {
  const formattedCountry = initCap(location.country.trim());
  const countryLookup = lookup.byCountry(formattedCountry);

  if (countryLookup) {
    const code = countryLookup.iso2;
    const { data: locationJSON } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${location.city.trim()},${code}&limit=5&appid=${
        process.env.NEXT_PUBLIC_API_KEY
      }`
    );

    return locationJSON;
  } else {
    return [];
  }
};
