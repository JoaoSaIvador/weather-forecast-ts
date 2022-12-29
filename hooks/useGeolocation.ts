import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import lookup from 'country-code-lookup';

import { errorToastNotification } from '../utils/auxiliary';
import { addLocation } from '../utils/addLocation';
import { Location, Country } from '../types/types';

type UseGeolocationProps = {
  countries: Country[];
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  countriesFetched: boolean;
};

function useGeolocation({
  countries,
  setCountries,
  countriesFetched,
}: UseGeolocationProps) {
  const [geolocation, setGeolocation] = useState<null | Location>(null);
  const router = useRouter();

  useEffect(() => {
    const geolocationSuccess = async (location: any) => {
      const { data: locationJSON } = await axios.get(
        `http://api.openweathermap.org/geo/1.0/reverse?lat=${location.coords.latitude}&lon=${location.coords.longitude}&limit=1&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const geolocation = {
        country: lookup.byIso(locationJSON[0].country).country,
        city: locationJSON[0].name,
        lat: locationJSON[0].lat,
        lon: locationJSON[0].lon,
      };

      setGeolocation(geolocation);
      addLocation(geolocation, countries, setCountries, router);
    };

    const geolocationDenied = () => {
      setGeolocation({
        country: 'Portugal',
        city: 'Leiria',
        lat: '39.74362',
        lon: '-8.80705',
      });

      errorToastNotification(
        'Unable to retrieve your location! Location set to Leiria, Portugal'
      );
    };

    // Get user's device geolocation
    if (navigator.geolocation && countriesFetched) {
      navigator.permissions.query({ name: 'geolocation' }).then(function (res) {
        if (res.state === 'prompt') {
          navigator.geolocation.getCurrentPosition(
            geolocationSuccess,
            geolocationDenied
          );
        }
      });
    }
  }, [countriesFetched]);

  return { geolocation, setGeolocation };
}

export default useGeolocation;
