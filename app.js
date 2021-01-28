// if (process.env.NODE_ENV != "production") {
// }
require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require('./midddlewares/errorHandler')
const routes = require('./routes/index')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/', routes)
app.use(errorHandler)

module.exports = app;
