const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { createToken } = require('../helper') //di jwt
const { queryInterface } = sequelize

const answer1 = {
    description: 'i dont know',
}

const answer2 = {
    description: 'i dont know how'
}

const answer3 = {
    description: ''
}

// let access_token
let access_token_superuser
let access_token_user
let AnswerId
let successAnswerId

beforeAll((done) => {
    User.findOne({
            where: {
                email: "admin@mail.com"
            }
        })
        .then(superuser => {
            access_token_superuser = createToken({
                id: superuser.id,
                email: superuser.email
            })
            return User.findOne({
                where: {
                    email: "customer@mail.com"
                }
            })
        })
        .then(user => {
            access_token_user = createToken({
                id: user.id,
                email: user.email
            })
            done()
        })
        .catch(err => {
            done(err)
        })
})

afterAll((done) => {
    queryInterface.bulkDelete("Posts")
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
});


describe("CRUD posts", () => {
    describe("Success CRUD ", () => {
        test("get all answers GET /answers", (done) => {
            request(app)
                .get('/answers')
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    done();
                })
        }),
        test("create answers by superuser POST /posts", (done) => {
            request(app)
                .post('/posts')
                .send(answer1)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    PostId = res.body.id
                    successPostId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("question", answer1.question)
                    expect(body).toHaveProperty("description", answer1.description)
                    expect(body).toHaveProperty("category", answer1.category)
                    done();
                })
        }),
        test("update superuser posts PUT /posts/:id", (done) => {
            request(app)
                .put(`/posts/${PostId}`)
                .send(question2)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "Data success updated")
                    done();
                })
        }),
        test("create post questions by user POST /posts", (done) => {
            request(app)
                .post('/posts')
                .send(answer1)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    PostId = res.body.id
                    successPostId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("question", answer1.question)
                    expect(body).toHaveProperty("description", answer1.description)
                    expect(body).toHaveProperty("category", answer1.category)
                    done();
                })
        }),
        test("update user posts PUT /posts/:id", (done) => {
            request(app)
                .put(`/posts/${PostId}`)
                .send(question2)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "Data success updated")
                    done();
                })
        })
    }),
    describe("Failed CRUD and success deleted", () => {
        test("failed create posts questions by superuser POST /posts with missing question field", (done) => {
            request(app)
                .post('/posts')
                .send(question3)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Question is required")
                    done();
                })
        }),
        test("failed create posts questions by superuser POST /posts with missing description field", (done) => {
            request(app)
                .post('/posts')
                .send(question4)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Description is required")
                    done();
                })
        }),
        test("failed create posts questions by user POST /posts with missing question field", (done) => {
            request(app)
                .post('/posts')
                .send(question3)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Question is required")
                    done();
                })
        }),
        test("failed create posts questions by user POST /posts with missing description field", (done) => {
            request(app)
                .post('/posts')
                .send(question4)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    productId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Description is required")
                    done();
                })
        }),
        test("failed update posts questions by superuser PUT /posts/:id missing question field", (done) => {
            request(app)
                .put(`/posts/${PostId}`)
                .send(question3)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Question is required')
                    done();
                })
        }),
        test("failed update posts questions by superuser PUT /posts/:id missing description field", (done) => {
            request(app)
                .put(`/posts/${PostId}`)
                .send(question4)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Description is required')
                    done();
                })
        }),
        test("failed update posts questions by user PUT /posts/:id missing question field", (done) => {
            request(app)
                .put(`/posts/${PostId}`)
                .send(question3)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Question is required')
                    done();
                })
        }),
        test("failed update posts questions by user PUT /posts/:id missing description field", (done) => {
            request(app)
                .put(`/posts/${PostId}`)
                .send(question4)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Description is required')
                    done();
                })
        }),       
        test("delete posts questions DELETE /posts/:id", (done) => {
            request(app)
                .delete(`/posts/${successPostId}`)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    expect(body).toHaveProperty("message", "Data success deleted")
                    done();
                })
        })
    })
})