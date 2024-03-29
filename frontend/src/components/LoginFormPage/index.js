import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import './LoginForm.css'

function LoginFormPage () {
  const dispatch = useDispatch()
  const sessionUser = useSelector((state) => state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [setErrors] = useState([])

  if (sessionUser) return Navigate('/')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors([])
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json()
        if (data && data.errors) setErrors(data.errors)
      })
  }

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul />
        <label>
          Username or Email
          <input
            type='text'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='login-submit-button' type='submit'>Log In</button>
      </form>
    </>
  )
}

export default LoginFormPage
