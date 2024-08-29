const express = require('express');
const tasksRouter = require('./routes/tasksRoutes');
const authRouter = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth } = require('./middleware/authMiddleware');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/tasks', requireAuth, tasksRouter);

module.exports = app;
