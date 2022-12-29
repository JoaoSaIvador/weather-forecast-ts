import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import lookup from 'country-code-lookup';
import { GlobalState } from '../contexts/globalState';
import NoLocations from '../components/exceptions/NoLocations';
import { Location } from '../types/types';

export default function Home() {
  const router = useRouter();
  const state = useContext(GlobalState);
  const [countries, , countriesFetched] = state.countries;
  const [, setGeolocation] = state.geolocation;

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

      if (!wasGeolocationRemoved(geolocation)) {
        setGeolocation(location);
        router.push(`/${location.country}/${location.city}`);
      } else {
        router.push(`/${countries[0].country}/${countries[0].cities[0].city}`);
      }
    };

    const wasGeolocationRemoved = (location: Location) => {
      const countryIndex = countries.findIndex(
        (country) => country.country === location.country
      );

      if (countryIndex > -1) {
        const hasCity = countries[countryIndex].cities.some(
          (city) => city.city === location.city
        );

        if (hasCity) {
          return false;
        }
      }

      return true;
    };

    if (countries.length > 0 && navigator.geolocation) {
      navigator.permissions.query({ name: 'geolocation' }).then(function (res) {
        if (res.state === 'granted') {
          navigator.geolocation.getCurrentPosition(geolocationSuccess);
        } else if (countriesFetched) {
          router.push(
            `/${countries[0].country}/${countries[0].cities[0].city}`
          );
        }
      });
    }
  }, [countriesFetched]);

  if (countriesFetched && countries.length === 0) {
    return <NoLocations />;
  }
}
