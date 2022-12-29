import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import RemoveLocationModal from '../modals/RemoveLocationModal';
import { SimpleLocation } from '../../types/types';

type RemoveLocationButtonProps = {
  location: SimpleLocation;
};

function RemoveLocationButton({ location }: RemoveLocationButtonProps) {
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const handleRemove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    event.preventDefault();
    setShowRemoveModal(true);
  };

  return (
    <>
      <FontAwesomeIcon
        icon={faTrash}
        style={{ fontSize: 18 }}
        onClick={(event) => handleRemove(event)}
      />
      <RemoveLocationModal
        show={showRemoveModal}
        setShow={setShowRemoveModal}
        location={location}
      />
    </>
  );
}

export default RemoveLocationButton;
