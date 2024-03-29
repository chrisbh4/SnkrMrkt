import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as sessionActions from '../../store/session'
import './SignupForm.css'

function SignupFormPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const sessionUser = useSelector((state) => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  if (sessionUser) return navigate('/')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await dispatch(sessionActions.signup({ email, username, password }))

    if (data?.errors) {
      if (password !== confirmPassword) {
        const err = [...data?.errors, 'Password and Confirm Password must match']
        setErrors(err)
      } else {
        setErrors(data?.errors)
      }
    }
    navigate('/')
    return data
  }

  return (
    <>
      <h1 id='signup-header'>Sign Up</h1>
      <form className='signup-form' onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}

        </ul>
        <label>
          Email
          <input
            className='signup-input'
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Username
          <input
            className='signup-input'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            className='signup-input'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            className='signup-input'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button className='signup-submit' type='submit'>Sign Up</button>
      </form>

      <div>
        <footer>
          <p>Christian Brown</p>

          <div class='networking'>
            <a href='https://www.linkedin.com/in/christian-brown-8770311ba/'>
              <i class='fab fa-linkedin' />
            </a>
            <a href='mailto:Chrismbh4@gmail.com'>
              <i class='fas fa-envelope-square' />
            </a>

            <a href='https://github.com/chrisbh4'>
              <i class='fab fa-github' />
            </a>
          </div>
        </footer>
      </div>
    </>
  )
}

export default SignupFormPage
