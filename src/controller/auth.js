const { req, res } = require('express')
const userModel = require("../model/user")
const jwt = require("jsonwebtoken")
const bcryptjs = require("bcryptjs")
// console.log('"sdjgnsgjbasdgbsdghb" :>> ', "sdjgnsgjbasdgbsdghb");

const signup = async (req, res) => {
    try {
        let body = req.body
        let salt = await bcryptjs.genSaltSync(8)
        let hashpassword = await bcryptjs.hash(body.password, salt)
        body.password = hashpassword
        let response = await userModel.create(body)
        let token = jwt.sign({
            _id: response._id,
            email: response.email,
            genrateon: (new Date().getTime())
        }, "sdjgnsgjbasdgbsdghb")
        response = { response, token }
        if (response) {
            res.status(200).json({ message: "SignUP Successfully", data: response })
        } else {
            res.status(401).json({ message: "SignUP Error" })
        }
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const login = async (req, res) => {
    try {
        let body = req.body
        let response = await userModel.findOne({ email: body.email })
        if (!response) {
            res.status(404).json({ message: "User does not exist" })
        }
        let comparePassword = bcryptjs.compare(body.password, response.password)
        if (!comparePassword) {
            res.status(404).json({ message: "Password is incorrect" })
        }
        let token = jwt.sign({
            _id: response._id,
            email: response.email,
            genrateon: (new Date().getTime())
        }, "sdjgnsgjbasdgbsdghb")
        response = { response, token }
        if (response) {
            res.status(200).json({ message: "Login successful", response })
        } else {
            res.status(401).json({ message: "Login error" })
        }
    } catch (error) {
        console.log("Error: " + error);
        res.status(500).json({ message: "Internal Server Error" })
    }
}


const getProfile = async (req, res) => {
    let user = req.headers.user
    console.log('user :>> ', user);
    try {
        let response = await userModel.findOne({ _id: user._id })
        console.log('response :>> ', response);
        if (response) {
            res.status(200).json({ message: "profile successful", response })
        } else {
            res.status(401).json({ message: "profile error" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}
module.exports = {
    signup, login, getProfile
}