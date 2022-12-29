import Link from 'next/link';
import { City, Country } from '../../types/types';
import RemoveLocationButton from './RemoveLocationButton';

type CityItemProps = {
  city: City;
  country: Country;
  isCityActive: (city: City) => boolean;
};

function CityItem({ city, country, isCityActive }: CityItemProps) {
  return (
    <Link
      href={`/${country.country}/${city.city}`}
      style={{ textDecoration: 'none', color: 'black' }}
    >
      <li
        className={
          'list-group-item d-flex justify-content-between align-items-center ' +
          (isCityActive(city) ? 'active' : '')
        }
        style={{ borderBottom: '1px' }}
      >
        {city.city}
        <RemoveLocationButton
          location={{ country: country.country, city: city.city }}
        />
      </li>
    </Link>
  );
}

export default CityItem;
