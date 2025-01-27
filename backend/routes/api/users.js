const express = require('express')
const { check } = require('express-validator')
const asyncHandler = require('express-async-handler')

const { handleValidationErrors } = require('../../utils/validation')
const { setTokenCookie } = require('../../utils/auth')
const { User } = require('../../db/models')
const bcrypt = require('bcryptjs')

const router = express.Router()

const validateSignup = [
  check('email')
    // .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .isLength({ min: 5, max: 20 })
    .withMessage('Username must be 5 to 20 characters '),
  check('password')
    // .exists({ checkFalsy: true })
    .isLength({ min: 8, max: 10 })
    .withMessage('Password must be 8 to 10 characters')
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    .withMessage('Password must contain at least one uppercase letter, one number, and one special character'),
  handleValidationErrors
]

const validateUpdate = [
  check('email')
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.')
    .isLength({ min: 5, max: 20 })
    .withMessage('Username must be 5 to 20 characters '),
  handleValidationErrors
]

// Get user by ID
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(
      user
    );
  })
);

// Update user
router.put(
  '/:id',
  validateUpdate,
  asyncHandler(async (req, res) => {
    const { id } = req.params
    const user = await User.findByPk(id)
    //TODO: remove "password" and logic on line 74
    const { email, username, firstName, lastName, shoeSize } = req.body
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // if (password.length > 0) {
    //   const hashedPassword = await bcrypt.hashSync(password)
    //   Object.assign(user, { email, username, firstName, lastName, shoeSize, hashedPassword });
    //   await user.save();

    //   return res.json(
    //     user
    //   )
    // }
    Object.assign(user, { email, username, firstName, lastName, shoeSize });
    await user.save();

    return res.json(
      user
    )
  })
)

// Sign up
router.post(
  '',
  validateSignup,
  asyncHandler(async (req, res) => {
    const { email, password, username, firstName, lastName, shoeSize } = req.body
    const user = await User.signup({ email, username, firstName, lastName, shoeSize, password })
    await setTokenCookie(res, user)

    return res.json(
      {user}
    )
  })
)

module.exports = router
