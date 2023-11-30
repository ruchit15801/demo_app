const express = require('express')
const router = express.Router()
const userController = require("../controller/auth")
const userJwt = require("../helper/jwt")

router.post('/signUp', userController.signup)
router.post('/login', userController.login)
router.use(userJwt)
router.get('/profile', userController.getProfile)

module.exports = router