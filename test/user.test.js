const app = require('../app')
const { User, sequelize } = require('../models')
const request = require('supertest')
const { queryInterface } = sequelize
const { Sign } = require('../helper/jwt') 


let PostId
let access_token_superuser
let access_token_user

let newNickname = {
    nickname: 'Nama baru'
}

let wrongNewNickname = {
    nickname: ''
}

let googleToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODU5NjgyMTM0MDEwLXNnYWl0MHY3dHZlc2djcTB2b2owbnRxaThrbTBqNjkyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODU5NjgyMTM0MDEwLXNnYWl0MHY3dHZlc2djcTB2b2owbnRxaThrbTBqNjkyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE4NDI2MTk2ODEzMzU1OTg1NjMxIiwiZW1haWwiOiJydWx6Lm1hdHJpeHNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJkRWRMTlNLclpZSFpMSFprSVdWZWdRIiwibmFtZSI6IkFydWwgQWJkdWwgQXppeiIsInBpY3R1cmUiOiJodHRwczovL2xoNi5nb29nbGV1c2VyY29udGVudC5jb20vLW9yOUFuWmtLRmpFL0FBQUFBQUFBQUFJL0FBQUFBQUFBQUFBL0FNWnV1Y2xBYzA5QTdzVVUxTGE0SUtpaWN5ODV0cWgwaHcvczk2LWMvcGhvdG8uanBnIiwiZ2l2ZW5fbmFtZSI6IkFydWwiLCJmYW1pbHlfbmFtZSI6IkFiZHVsIEF6aXoiLCJsb2NhbGUiOiJpZCIsImlhdCI6MTYxMTY0MjI1MSwiZXhwIjoxNjExNjQ1ODUxLCJqdGkiOiJiNzg3MTJhNzg4ZTRjZWZjODA3NTA2Y2MzZTU1NWE3ZjQxYjMyMjUyIn0.I7G0Vdb-8yj3up1Q3mMyGKuvXw6D5l4BeqIernVcbh108kkOuCF-_di_LfNDrGSH1NMfrTbA4atkzciVntCVav6bcRyuyBOZ6QQrCoF_lJq8dLXTOAbxqiCAUph5GMvSN0Fa9BNvOOI8QWFKXhPFS1IdLMjxWLgVfK8iTJmCkvHJQ53xTi9anXilW_brzRPrmRxKH1QHx1KkafnN_PGHsFbT105Q1uJhNfW_bXykEh3K8l5z_za2ieVxqYhL0GwWqQ5NZ-RcmEyKrTbf3VemPW6u_O-3ZWWx_1-RrRsdhLHheRqiXXW7Ckgq4jACgrSDAgRnFpOC0e4gRnf1LYsLcA'
let googleToken2 = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImVlYTFiMWY0MjgwN2E4Y2MxMzZhMDNhM2MxNmQyOWRiODI5NmRhZjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiODU5NjgyMTM0MDEwLXNnYWl0MHY3dHZlc2djcTB2b2owbnRxaThrbTBqNjkyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiODU5NjgyMTM0MDEwLXNnYWl0MHY3dHZlc2djcTB2b2owbnRxaThrbTBqNjkyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1ODM3ODM0MDYyMzgzNTU0MzcyIiwiZW1haWwiOiJhbGZhdGlvdXRhbWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJ2bkZ0bHkzdjZZa'

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

describe("Login Test", () => {
    describe("Login ", () => {
        test.only("update nickname PATCH /change-nickname", (done) => {
            request(app)
                .patch(`/user/change-nickname`)
                .send(newNickname)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(201)
                    expect(body).toHaveProperty("message", "Data success updated")
                    done();
                })
        }),
        test.only("login to /googleLogin should return access_token", (done) => {
            console.log('masuk google')
            request(app)
            .post(`/user/googleLogin`)
            .send({googleToken: googleToken2})
            .end(function (err, res) {
                console.log('masuk 2')
                const { body, status } = res
                expect(status).toBe(200)
                // expect(body).toHaveProperty('access_token', expect.any(String))
                done()
            })
        })
        test.only("failed update nickname PATCH /change-nickname", (done) => {
            request(app)
                .patch(`/user/change-nickname`)
                .send(wrongNewNickname)
                .set('access_token', access_token_superuser)
                .end(function (err, res) {
                    const { body, status } = res
                    if (err) return done(err);
                    expect(status).toBe(400)
                    expect(body).toHaveProperty("message", "Nickname is required")
                    done();
                })
        })
    })
})
