const express = require("express");
const asyncHandler = require("express-async-handler");
const { Shoe, User, Orders } = require('../../db/models');
const {check} = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();




router.get('/:id/selling', asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [Shoe]
    })
    return res.send(user)
}))


router.get('/:id/orders', asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [Orders]
    })
    return res.json({user})
    // return res.send("userId fk needs to be added")
}))

router.get('/:id/watching', asyncHandler(async (req, res) => {
    const User = await User.findByPk(req.params.id, {
        include: [Shoe]
    })
    return res.json({User})
}))

module.exports = router
