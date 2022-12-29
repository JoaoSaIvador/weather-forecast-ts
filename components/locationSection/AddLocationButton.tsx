import { useState } from 'react';

import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import AddLocationModal from '../modals/addLocationModal/AddLocationModal';

function AddLocationButton() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <Button
        data-testid='addLocationBtn'
        className='d-flex justify-content-center align-items-center m-2 btn-circular btn-medium'
        variant='dark'
        onClick={() => setShowAddModal(true)}
      >
        <FontAwesomeIcon icon={faPlus} style={{ fontSize: 25 }} />
      </Button>
      <AddLocationModal show={showAddModal} setShow={setShowAddModal} />
    </>
  );
}

export default AddLocationButton;
