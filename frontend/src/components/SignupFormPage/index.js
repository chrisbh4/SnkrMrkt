import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import SignupFormPage from "./SignupForm"

function SignUpModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className="login-button">Sign Up</div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {/* <LoginForm /> */}
        <SignupFormPage />
        </Modal>
      )}
    </>
  );
}

export default SignUpModal;
