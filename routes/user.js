const express = require('express')
const jwt = require('jsonwebtoken')

const {
    checkAdminDetails,
    getAuthToken
} = require('../utils')

const router = express.Router()

router.post('/verify', (req, res) => {
    const token = getAuthToken(req)
    const result = checkAdminDetails(token)
    if(result === true) {
        return res.json({
            "auth_token": token
        })
    } else {
        res.status(403)
        throw new Error("Verification Failed")
    }
})

router.post('/login', async (req, res) => {
    const {username, password} = req.body
    if(process.env.APP_CSAIGMC_USERNAME === username && password === process.env.APP_CSAIGMC_PASSWORD){
        const token = jwt.sign({
            username,
            id: process.env.APP_CSAIGMC_CLIENT_ID 
        }, process.env.APP_CSAIGMC_SECRET_PASS)
        return res.json({"auth_token": token})
    } else {
        res.status(403)
        return res.json({
            message: "Forbidden"
        })
    }
})

module.exports = router