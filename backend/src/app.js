const express = require('express')
const router = require('./routes/todosRoutes')

const app = express()

app.use(router)

module.exports = app