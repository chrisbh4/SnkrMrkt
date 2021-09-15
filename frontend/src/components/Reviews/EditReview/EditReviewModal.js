import React, { useState } from 'react';
// import { Modal } from '../../context/Modal';
import {Modal} from "../../../context/Modal"
// import LoginForm from './LoginForm';
import EditReviewForm from './EditReviewForm';

function EditReviewModal({review}) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className="idk">Edit Review</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <LoginForm /> */}
        <EditReviewForm review={review} key={review.id} />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
