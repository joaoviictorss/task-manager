const express = require('express')
const router = require('./routes/tasksRoutes')

const app = express()

app.use(router)

module.exports = app