import { useContext } from 'react';
import { useRouter } from 'next/router';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { GlobalState } from '../../contexts/globalState';
import { removeLocation } from '../../utils/removeLocation';
import { SimpleLocation } from '../../types/types';

type RemoveLocationModalProps = {
  show: boolean;
  setShow: React.Dispatch<boolean>;
  location: SimpleLocation;
};

function RemoveLocationModal({
  show,
  setShow,
  location,
}: RemoveLocationModalProps) {
  const router = useRouter();
  const state = useContext(GlobalState);
  const [countries, setCountries] = state.countries;
  const [, setCurrentLocation] = state.currentLocation;

  const onHide = (event: any) => {
    event.preventDefault();
    setShow(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    removeLocation(
      location,
      countries,
      setCountries,
      setCurrentLocation,
      router
    );
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setShow(false);
      }}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title className='fw-bold'>Remove Location</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
          Are you sure you want to <b>remove</b> this location from your list?
          Please confirm.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant='dark' onClick={onHide}>
          Cancel
        </Button>
        <Button variant='danger' onClick={handleSubmit}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RemoveLocationModal;
