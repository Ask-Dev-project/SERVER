const app = require('../app')
const request = require('supertest')
const { User, sequelize } = require('../models')
const { Sign } = require('../helper/jwt') 
const Jwt = require('../helper/jwt')
const { queryInterface } = sequelize

const answer1 = {
    description: 'i dont know broooo',
}

const answer2 = {
    description: 'i dont know how'
}

const answer3 = {
    description: ''
}

const question1 = {
    question: 'how?',
    description: 'i dont know woyoo',
    category: 'Javascript'
}

let PostId
let access_token_superuser
let access_token_user
let AnswerId
let successAnswerId


beforeAll((done) => {
    User.findOne({
            where: {
                email: "john.doe@mail.com"
            }
        })
        .then(superuser => {
            access_token_superuser = Sign({
                id: superuser.id,
                email: superuser.email
            })
            return User.findOne({
                where: {
                    email: "tatang.sudanawan@mail.com"
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
    queryInterface.bulkDelete("Answers")
        .then(response => {
            done()
        })
        .catch(err => {
            done(err)
        })
});


describe("CRUD answers", () => {
    describe("Success CRUD ", () => {
        test("create post questions by superuser POST /posts", (done) => {
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
        test("get all answers GET /answers/PostId", (done) => {
            request(app)
                .get(`/answers/${PostId}` )
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    done();
                })
        }),
        test("create answers by superuser POST /answers/PostId", (done) => {
            request(app)
                .post(`/answers/${PostId}`)
                .send(answer1)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    AnswerId = res.body.id
                    successAnswerId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("description", answer1.description)
                    done();
                })
            }),
        test("get answers GET /answers/PostId/AnswerId", (done) => {
            request(app)
                .get(`/answers/${PostId}/${AnswerId}` )
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(200)
                    done();
                })
        }),
        test("update superuser answers PUT /answers/:PostId/:id", (done) => {
            request(app)
            .put(`/answers/${PostId}/${AnswerId}`)
            .send(answer2)
            .set('access_token', access_token_superuser)
            .end(function (err, res) {
                const { body, status } = res
                if (err) return done(err);
                expect(status).toBe(200)
                expect(body).toHaveProperty("message", "Data success updated")
                done();
            })
        }),
        test("create answers by user POST /answers/PostId", (done) => {
            request(app)
                .post(`/answers/${PostId}`)
                .send(answer1)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    AnswerId = res.body.id
                    successAnswerId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("description", answer1.description)
                    done();
                })
        }),
        test("update user answers PUT /answers/PostId/:id", (done) => {
            request(app)
                .put(`/answers/${PostId}/${AnswerId}`)
                .send(answer2)
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
        test("failed get all answers GET /answers/PostId", (done) => {
            request(app)
                .get('/answers/a' )
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(500)
                    expect(body).toHaveProperty("message", "Internal Server Error!")
                    done();
                })
        }),
        test("failed get answers GET /answers/PostId/AnswerId", (done) => {
            request(app)
                .get(`/answers/${PostId}/a` )
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(500)
                    expect(body).toHaveProperty("message", "Internal Server Error!")
                    done();
                })
        }),
        test("failed create answers by superuser POST /answers with missing description field", (done) => {
            request(app)
                .post(`/answers/${PostId}`)
                .send(answer3)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    AnswerId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Description is required")
                    done();
                })
        }),
        test("failed create answers by user POST /answers with missing description field", (done) => {
            request(app)
                .post(`/answers/${PostId}`)
                .send(answer3)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    AnswerId = res.body.id
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Description is required")
                    done();
                })
        }),
        test("failed update answers by superuser PUT /answers/:id missing description field", (done) => {
            request(app)
                .put(`/answers/${PostId}/${AnswerId}`)
                .send(answer3)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Description is required')
                    done();
                })
        }),
        test("failed update answers by user PUT /answers/:id missing description field", (done) => {
            request(app)
                .put(`/answers/${PostId}/${AnswerId}`)
                .send(answer3)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty('message', 'Description is required')
                    done();
                })
        }), 
        test("failed delete answers DELETE /answers/:id", (done) => {
            let fakeJwt = Jwt.Sign({id:5000, email: 'ngasal@mail.com'})
            request(app)
                .delete(`/answers/${PostId}/a`)
                .set('access_token', access_token_user)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(500)
                    expect(body).toHaveProperty("message", "Internal Server Error!")
                    done();
                })
        }),      
        test("delete answers DELETE /answers/:id", (done) => {
            request(app)
                .delete(`/answers/${PostId}/${successAnswerId}`)
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