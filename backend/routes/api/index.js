const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const shoesRouter = require("./shoes.js")
const reviewsRouter = require("./reviews.js")
const sneaksRouter = require('./sneaks.js')


//* allows heroku app not to sleep
//* add the google one instead
// var http = require("http");
// setInterval(function() {
//     http.get("http://theplugg.herokuapp.com");
// // }, 100); // every 5 minutes (300000)
// }, 300000); // every 5 minutes (300000)




router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/shoes", shoesRouter);
router.use("/test", sneaksRouter)
router.use("/reviews",reviewsRouter);


module.exports = router;
