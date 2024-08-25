const express = require("express");
const { getAll } = require('../controllers/taskController');

const router = express.Router()

router.get('/tasks', getAll)

module.exports = router