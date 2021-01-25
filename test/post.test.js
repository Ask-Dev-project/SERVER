const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { Sign } = require('../helper/jwt')
const { queryInterface } = sequelize

const question1 = {
    question: 'how?',
    description: 'i dont know',
    category: 'Javascript'
}

const question2 = {
    question: 'why?',
    description: 'i dont know',
    category: 'C++'
}

const question3 = {
    question: '',
    description: 'i dont know',
    category: 'C++'
}

const question4 = {
    question: 'why?',
    description: '',
    category: 'C++'
}

// let access_token
let access_token_superuser
let access_token_user
let PostId
let successPostId

beforeAll((done) => {
    User.findOne({
        where: {
            email: "admin@mail.com"
        }
    })
    .then(superuser => {
        access_token_superuser = Sign({
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
        access_token_user = Sign({
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
        test("get all posts GET /post", (done) => {
            request(app)
                .get('/post')
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    done();
                })
        }),
        test("create post questions by superuser POST /post", (done) => {
            request(app)
                .post('/post')
                .send(question1)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    PostId = res.body.id
                    successPostId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("question", question1.question)
                    expect(body).toHaveProperty("description", question1.description)
                    expect(body).toHaveProperty("category", question1.category)
                    done();
                })
            }),
            test("update superuser posts PUT /posts/:id", (done) => {
                request(app)
                .put(`/post/${PostId}`)
                .send(question2)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    console.log('masuk pak eko')
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("message", "Data success updated")
                    done();
                })
        }),
        test("create post questions by user POST /posts", (done) => {
            request(app)
                .post('/post')
                .send(question1)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    PostId = res.body.id
                    successPostId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("question", question1.question)
                    expect(body).toHaveProperty("description", question1.description)
                    expect(body).toHaveProperty("category", question1.category)
                    done();
                })
        }),
        test("update user posts PUT /posts/:id", (done) => {
            request(app)
                .put(`/post/${PostId}`)
                .send(question2)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("message", "Data success updated")
                    done();
                })
        })
    }),
    describe("Failed CRUD and success deleted", () => {
        test("failed create posts questions by superuser POST /posts with missing question field", (done) => {
            request(app)
                .post('/post')
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
                .post('/post')
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
                .post('/post')
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
                .post('/post')
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
                .put(`/post/${PostId}`)
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
                .put(`/post/${PostId}`)
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
                .put(`/post/${PostId}`)
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
                .put(`/post/${PostId}`)
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
                .delete(`/post/${successPostId}`)
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