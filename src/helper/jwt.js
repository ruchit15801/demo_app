const { req, res, next } = require("express")
const userModel = require("../model/user")
const jwt = require("jsonwebtoken")


const userJwt = async (req, res, next) => {
    let authorization = req.headers,
        result
    console.log('authorization :>> ', authorization);
    if (authorization) {
        try {
            let verifyToken = jwt.verify(authorization.token, "sdjgnsgjbasdgbsdghb")
            console.log('verifyToken :>> ', verifyToken);
            result = await userModel.findOne({ _id: verifyToken._id })
            console.log('result :>> ', result);
            if (result) {
                req.headers.user = result
                return next()
            } else {
                res.status(401).json({ message: "Invalid Token" })
            }
        } catch (error) {
            res.status(401).json({ message: "Change toekn and try again" })
        }
    }
}

module.exports = userJwt