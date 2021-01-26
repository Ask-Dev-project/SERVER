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
    describe("Login & Google Login ", () => {
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
        })
    })
})
