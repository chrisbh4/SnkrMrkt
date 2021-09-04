import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
// import LoginForm from './LoginForm';
import SignupFormPage from "./SignupForm"

<<<<<<< HEAD
function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
          return  setErrors(data.errors);
          }
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };
=======
function SignUpModal() {
  const [showModal, setShowModal] = useState(false);
>>>>>>> reviews-store

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
