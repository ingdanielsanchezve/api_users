//apiTest.js
const request = require('supertest');
var should = require('should');
var api_url = 'https://j0yajjaeih.execute-api.us-east-1.amazonaws.com/prod';

//==================== Users API tests ====================

/**
 * Testing get all user endpoint
 */
describe('GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
        request(api_url)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get single user endpoint
 */
describe('GET /users/:login', function () {
    it('respond with json containing user account data', function (done) {
        request(api_url)
            .get('/users/ingdanielsanchezve')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, {
                message:"Successful operation",
                data:{password:"_1234567890ABC_",
                      login:"ingdanielsanchezve",
                      role:"Admin",
                      name:"Daniel Sanchez"}}, done);
    });
});

/**
 * Testing get user endpoint by giving a non-existing user
 */
describe('GET /users/:login', function () {
    it('respond with user not found', function (done) {
        request(api_url)
            .get('/users/loginisnonexisting')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                res.body.should.have.property('error', 'User not found')
                return done();
            });
    });
});

/**
 * Testing post user endpoint
 */
describe('POST /users', function () {
    let data = {
        "name": "Test User",
        "login": "thisisatest",
        "password": "passwordtest"
    }
    it('respond with 200 created', function (done) {
        request(api_url)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) {
                  return done(err);
                }
                res.body.should.have.property('message', 'User created sucessfully')
                return done();
            });
    });
});

/**
 * Testing post user endpoint with missing data
 */
describe('POST /users', function () {
    let data = {
        "name": "Error User",
        "login": "",
        "password": "passwordtest"
    }
    it('respond with 400 not created', function (done) {
        request(api_url)
            .post('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .expect({error:"login can`t be empty"})
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing put user endpoint
 */
describe('PUT /users', function () {
    let data = {
        "name": "I am a Test User",
        "login": "thisisatest",
        "password": "MyNewPassword",
        "role": "Admin"
    }
    this.timeout(10000);
    it('respond with 200 updated', function (done) {
        request(api_url)
            .put('/users')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) throw err;
            });
    });
});

/**
 * Testing delete user endpoint
 */
describe('DELETE /users/:login', function () {
    
    it('respond with 200 deleted', function (done) {
        request(api_url)
            .delete('/users/thisisatest')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .expect({message:"User deleted successfully"})
            .end(function(err, res) {
                if (err) throw err;
            });
    });
});