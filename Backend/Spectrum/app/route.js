const express = require('express');
const app = express();

const { authRoute, dashboardRoute } = require('./api');

app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)
module.exports = app;