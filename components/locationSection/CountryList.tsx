import { useContext } from 'react';
import { GlobalState } from '../../contexts/globalState';
import CountryItem from './CountryItem';

function CountryList() {
  const state = useContext(GlobalState);
  const [countries] = state.countries;

  return (
    <>
      <hr style={{ margin: '0', opacity: '0.15' }} />
      <div
        className='accordion accordion-flush w-100 overflow-scroll'
        id='locationAccordion'
        style={{ maxHeight: '25rem' }}
      >
        {countries.map((country) => (
          <CountryItem country={country} key={country.country} />
        ))}
      </div>
      <hr style={{ margin: '0', opacity: '0.15' }} />
    </>
  );
}

export default CountryList;
