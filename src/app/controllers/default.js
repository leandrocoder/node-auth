const express = require('express')
const authMiddleware = require('../middlewares/auth')
const router = express.Router()
router.use(authMiddleware)

router.get('/', (req, res) => {
    
    res.send({status:true, date:(new Date()).toUTCString()})
})

module.exports = app => app.use('/', router)
