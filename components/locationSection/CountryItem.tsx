import { useContext } from 'react';
import { GlobalState } from '../../contexts/globalState';
import { Country, City } from '../../types/types';
import CityItem from './CityItem';

type CountryItemProps = {
  country: Country;
};

function CountryItem({ country }: CountryItemProps) {
  const state = useContext(GlobalState);
  const [currentLocation] = state.currentLocation;
  const trimmedCountry = country.country.replaceAll(' ', '');

  const isCountryActive = () =>
    country.country.toLowerCase() === currentLocation.country.toLowerCase();

  const isCityActive = (city: City) =>
    isCountryActive() &&
    city.city.toLowerCase() === currentLocation.city.toLowerCase();

  return (
    <div className='accordion-item'>
      <h2 className='accordion-header' id={`heading${trimmedCountry}`}>
        <button
          className={
            'accordion-button ' + (isCountryActive() ? '' : 'collapsed')
          }
          type='button'
          data-bs-toggle='collapse'
          data-bs-target={`#collapse${trimmedCountry}`}
          aria-expanded='true'
          aria-controls={`#collapse${trimmedCountry}`}
        >
          {country.country}
        </button>
      </h2>
      <div
        id={`collapse${trimmedCountry}`}
        className={
          'accordion-collapse collapse ' + (isCountryActive() ? 'show' : '')
        }
        aria-labelledby={`#heading${trimmedCountry}`}
        data-bs-parent='#locationAccordion'
      >
        <div className='accordion-body p-0'>
          <ul className='list-group list-group-flush'>
            {country.cities.map((city) => (
              <CityItem
                city={city}
                country={country}
                isCityActive={isCityActive}
                key={`${city.lat}${city.lon}`}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CountryItem;
