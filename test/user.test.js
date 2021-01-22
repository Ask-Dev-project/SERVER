const app = require('../app')
const { User, sequelize } = require('../models')
const request = require('supertest')
const { queryInterface } = sequelize
