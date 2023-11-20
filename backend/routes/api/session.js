const express = require('express')
const { check } = require('express-validator')
const asyncHandler = require('express-async-handler')

const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie, restoreUser } = require('../../utils/auth')
const { User } = require('../../db/models')

const router = express.Router()

const validateLogin = [
  check('credential')
    // .exists({ checkFalsy: true })
    // .withMessage("Username does not exist")
    .notEmpty()
    .withMessage('Email needs to be entered'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password.'),
  handleValidationErrors
]

// Log in
router.post(
  '/',
  validateLogin,
  asyncHandler(async (req, res, next) => {
    const { credential, password } = req.body
    const user = await User.login({ credential, password })
    //! Need to figure out how to display the loginError handler instead of that if statment
    // will most likely just need to create own if condition and check to see if the user has errors
    if (!user) {
      const err = new Error('Login failed')
      err.status = 401
      err.title = 'Login failed'
      err.errors = ['The provided credentials were invalid']
      return next(err)
    }
    // else if (user.errors) {
    //   return res.json({ user })

    // }
    else {
      await setTokenCookie(res, user)

      return res.json({
        user
      })
    }
  })
)

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token')
    return res.json({ message: 'success' })
  }
)

// Restore session user
router.get(
  '/',
  restoreUser,
  (req, res) => {
    const { user } = req
    if (user) {
      return res.json({
        user: user.toSafeObject()
      })
    } else return res.json({})
  }
)

router.get('/all-users', asyncHandler(async (req, res) => {
  const users = await User.findAll()

  const allUsers = {}
  // users.forEach((user)=>{
  //   if(!allUsers[user.id]){
  //     allUsers[user.id]=user;
  //   }
  // })

  // return res.json({allUsers})
  return res.json({ users })
}))

module.exports = router

// Everytime edit review is clicked backend fetches for /restore/users need to find what is triggering it to render that
// maybe update????
