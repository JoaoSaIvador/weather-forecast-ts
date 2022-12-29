import AddLocationButton from '../locationSection/AddLocationButton';

function NoLocations() {
  return (
    <div className='d-flex flex-column align-items-center'>
      <img
        className='my-4 w-100'
        src='/NoLocations.svg'
        alt=''
        style={{ maxWidth: '600px' }}
      />
      <h3>Oops...</h3>
      <span className='fs-5 text-center'>
        You have no locations, try adding some!
      </span>
      <AddLocationButton />
    </div>
  );
}

export default NoLocations;
