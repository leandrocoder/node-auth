const express = require('express')
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authConfig  = require('../../config/auth.json')


function generateToken(user) {
    return jwt.sign({id:user.id}, authConfig.secret, {
        expiresIn: 86400
    })
}

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body
        if (await User.findOne({ email }))
        return res.status(400).send({error: 'User already exists'})
        const user = await User.create(req.body)
        user.password = undefined
        const token = generateToken(user)
        return res.send({user, token})

    }
    catch (err) {
        return res.status(400).send({error:'Registration failed'})
    }
})

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({email}).select('+password')
    if (!user) return res.status(400).send({error: 'User not found'})
    if (!await bcrypt.compare(password, user.password)) return res.status(400).send({error: 'Invalid password'})
    user.password = undefined
    const token = generateToken(user)
    res.send({user, token})
})

module.exports = app => app.use('/auth', router)