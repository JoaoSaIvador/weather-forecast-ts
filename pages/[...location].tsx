import { useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';
import CardList from '../components/weatherSection/CardList';
import { GlobalState } from '../contexts/globalState';
import LocationSelection from '../components/locationSection/LocationSection';

function Location() {
  const router = useRouter();
  const location = router.query.location;
  const state = useContext(GlobalState);
  const [, loading] = state.weather;
  const [countries, , countriesFetched] = state.countries;
  const [currentLocation, setCurrentLocation] = state.currentLocation;

  useEffect(() => {
    const getLocationData = (country: string, city: string) => {
      const countryData = countries.find((c) => {
        return c.country.toLowerCase() === country.toLowerCase();
      });

      // Check if user entered a location that is added or not
      if (countryData) {
        const cityData = countryData.cities.find(
          (c) => c.city.toLowerCase() === city.toLowerCase()
        );

        if (cityData) {
          setCurrentLocation({
            lat: cityData.lat,
            lon: cityData.lon,
            country: countryData.country,
            city: cityData.city,
          });
        } else {
          router.replace('/404');
        }
      } else {
        router.replace('/404');
      }
    };

    if (location && countriesFetched) {
      getLocationData(location[0], location[1]);
    }
  }, [location, countriesFetched]);

  if (!loading) {
    return (
      currentLocation && (
        <>
          <div className='col-10'>
            <h1 className='mt-3 text-center fw-bold'>Weather Forecast</h1>
            <p className='mb-5 text-center fs-4'>{`${currentLocation.city}, ${currentLocation.country}`}</p>
            <div className='d-flex justify-content-center flex-wrap'>
              <LocationSelection />
              <CardList />
            </div>
          </div>
        </>
      )
    );
  } else {
    return (
      <div className='w-100 d-flex justify-content-center align-items-center'>
        <Spinner animation='border' style={{ width: '4rem', height: '4rem' }} />
      </div>
    );
  }
}

export default Location;
