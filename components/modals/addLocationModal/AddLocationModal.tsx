import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

import Button from 'react-bootstrap/Button';
import LocationForm from './LocationForm';
import { Modal } from 'react-bootstrap';

import { addLocation } from '../../../utils/addLocation';
import { errorToastNotification, initCap } from '../../../utils/auxiliary';
import { GlobalState } from '../../../contexts/globalState';
import { validateLocation } from '../../../utils/validateLocation';
import { Location } from '../../../types/types';

type AddLocationModalProps = {
  show: boolean;
  setShow: React.Dispatch<boolean>;
};

function AddLocationModal({ show, setShow }: AddLocationModalProps) {
  const initialLocation = { country: '', city: '', lat: '', lon: '' };
  const [location, setLocation] = useState<Location>(initialLocation);
  const [formDisabled, setFormDisabled] = useState(true);
  const router = useRouter();
  const state = useContext(GlobalState);
  const [countries, setCountries] = state.countries;

  const onHide = () => {
    setLocation(initialLocation);
    setShow(false);
  };

  useEffect(() => {
    if (location.country !== '' && location.city !== '') {
      setFormDisabled(false);
    }

    if (!formDisabled && (location.country === '' || location.city === '')) {
      setFormDisabled(true);
    }
  }, [location]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const locationJSON = await validateLocation(location);

    // Check if location (Country + City) is valid
    if (locationJSON.length > 0) {
      addLocation(
        {
          country: initCap(location.country.trim()),
          city: initCap(location.city),
          lat: locationJSON[0].lat,
          lon: locationJSON[0].lon,
        },
        countries,
        setCountries,
        router
      );
    } else {
      errorToastNotification('Invalid location!');
    }

    onHide();
  };

  return (
    <Modal id='addLocationModal' show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className='fw-bold'>Add a new Location:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LocationForm
          location={location}
          setLocation={setLocation}
          handleSubmit={handleSubmit}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='danger' onClick={onHide}>
          Cancel
        </Button>
        <Button
          data-testid='confirmBtn'
          form='locationForm'
          variant='dark'
          type='submit'
          disabled={formDisabled}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddLocationModal;
