import { Form } from 'react-bootstrap';
import { Location } from '../../../types/types';

type LocationFormProps = {
  location: Location;
  setLocation: React.Dispatch<Location>;
  handleSubmit: (event: React.FormEvent) => void;
};

function LocationForm({
  location,
  setLocation,
  handleSubmit,
}: LocationFormProps) {
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  };

  return (
    <Form
      id='locationForm'
      className='d-flex flex-column'
      onSubmit={handleSubmit}
    >
      <Form.Group className='mb-3 px-4' controlId='formCountry'>
        <Form.Label>Country:</Form.Label>
        <Form.Control
          name='country'
          type='text'
          value={location.country}
          placeholder='Enter a country'
          onChange={handleChangeInput}
          autoFocus
        />
      </Form.Group>
      <Form.Group className='mb-3 px-4' controlId='formCity'>
        <Form.Label>City:</Form.Label>
        <Form.Control
          name='city'
          type='text'
          value={location.city}
          placeholder='Enter a city'
          onChange={handleChangeInput}
        />
      </Form.Group>
    </Form>
  );
}

export default LocationForm;
