//apiTest.js
const request = require('supertest');
var api_url = 'https://fbsvtk90aa.execute-api.us-east-1.amazonaws.com/dev';

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
            .expect(404) //expecting HTTP status code
            .expect({error:"User not found"}) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
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
            .end((err) => {
                if (err) return done(err);
                done();
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
 * Testing post user endpoint
 */
describe('PUT /users', function () {
    let data = {
        "name": "I am a Test User",
        "login": "thisisatest",
        "password": "MyNewPassword",
        "role": "Admin"
    }
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
 * Testing post user endpoint
 */
describe('DELETE /users/:login', function () {
    
    it('respond with 200 deleted', function (done) {
        request(api_url)
            .delete('/users/thisisatest')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
            .expect({message:"User deleted successfully"})
            .end(function(err, res) {
                if (err) throw err;
            });
    });
});