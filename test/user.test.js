const app = require('../app')
const { User, sequelize } = require('../models')
const request = require('supertest')
const { queryInterface } = sequelize

describe('User Routes Test', () => {
    const developerData = {
        email: 'abc@mail.com',
        status: 'superuser',
        nickname: 'John',
        rating: 8.2
    }

    const developerData2 = {
        email: 'xyz@mail.com',
        status: 'user',
        nickname: 'Doe',
        rating: 8.6
    }

    describe('POST /googleLogin - user authentication process', () => {
        beforeAll(done => {
            User.create(developerData)
                .then(_ => {
                    done()
                })
                .catch(err => {
                    done(err)
                })
        })

        afterAll(done => {
            queryInterface
                .bulkDelete('Users', {})
                .then(() => done())
                .catch(err => done(err))
        })

        test('200 Success login superUser - should return access_token', (done) => {
            request(app)
              .post('/login')
              .send(developerData)
              .then(response => {
                  const { body, status } = response
                  expect(status).toBe(200)
                  expect(body).toHaveProperty('access_token', expect.any(String))
                  done()
              })
              .catch

        })

        // test('400 failed login superUser - should return access_token', (done) => {
        //     request(app)
        //       .post('/login')
        //       .send({developerData2)
        //       .then(response => {
        //           const { body, status } = response
        //           expect(status).toBe(400)
        //           expect(body).toHaveProperty('message', 'Invalid Email')
        //           done()
        //       })
        //       .catch(err => {
        //           done(err)
        //       })
        // })



        test('200 Success login User - should return access_token', (done) => {
            request(app)
              .post('/login')
              .send(developerData2)
              .then(response => {
                  const { body, status } = response
                  expect(status).toBe(200)
                  expect(body).toHaveProperty('access_token', expect.any(String))
                  done()
              })
              .catch

        })

        // test('400 failed login User - should return access_token', (done) => {
        //     request(app)
        //       .post('/login')
        //       .send({
        //           email: 'ij@mail.com'
        //       })
        //       .then(response => {
        //           const { body, status } = response
        //           expect(status).toBe(400)
        //           expect(body).toHaveProperty('message', 'Invalid Email')
        //           done()
        //       })
        //       .catch(err => {
        //           done(err)
        //       })
        // })

    })
})