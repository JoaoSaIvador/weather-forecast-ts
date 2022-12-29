import CountryList from './CountryList';
import AddLocationButton from './AddLocationButton';

function LocationSelection() {
  return (
    <div className='my-3 location-selection'>
      <div className='h-100 d-flex flex-column justify-content-between'>
        <div>
          <div className='h4 px-3 pt-3'>Locations:</div>
          <CountryList />
        </div>
        <div className='d-flex p-2 justify-content-end'>
          <AddLocationButton />
        </div>
      </div>
    </div>
  );
}

export default LocationSelection;
