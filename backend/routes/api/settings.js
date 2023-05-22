const express = require("express");
const asyncHandler = require("express-async-handler");
const { Shoe, User } = require('../../db/models');
const {check} = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const router = express.Router();




router.get('/:id/selling', asyncHandler(async (req, res) => {
    const user = await User.findByPk(req.params.id, {
        include: [Shoe]
    })
    return res.send("api works")
}))


router.get('/:id/orders', asyncHandler(async (req, res) => {
    const User = await User.findByPk(req.params.id, {
        include: [Shoe]
    })
    return res.json({User})
}))

router.get('/:id/watching', asyncHandler(async (req, res) => {
    const User = await User.findByPk(req.params.id, {
        include: [Shoe]
    })
    return res.json({User})
}))

module.exports = router
