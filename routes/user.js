const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router()

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