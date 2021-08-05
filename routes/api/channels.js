// import router
const express = require('express')
const router = express.Router()

// import data
const channels = require('../../data/channels')

// get all channels
router.get('/', (req, res) => res.json(channels))

module.exports = router