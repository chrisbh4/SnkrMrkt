const router = require('express').Router()
const sessionRouter = require('./session.js')
const usersRouter = require('./users.js')
const shoesRouter = require('./shoes.js')
const reviewsRouter = require('./reviews.js')
const sneaksRouter = require('./sneaks.js')
const ordersRouter = require('./orders.js')
const settingsRouter = require('./settings.js')

//* allows heroku app not to sleep
//* add the google one instead
// var http = require("http");
// setInterval(function() {
//     http.get("http://theplugg.herokuapp.com");
// // }, 100); // every 5 minutes (300000)
// }, 300000); // every 5 minutes (300000)

router.use('/reviews', reviewsRouter)
router.use('/session', sessionRouter)
router.use('/settings', settingsRouter)
router.use('/shoes', shoesRouter)
router.use('/test', sneaksRouter)
router.use('/orders', ordersRouter)
router.use('/users', usersRouter)

module.exports = router
