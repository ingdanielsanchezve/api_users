var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

router.post('/', function (req, res, next) {

    const {name, login, password, role} = req.body;

    if (typeof login !== 'string') {
        res.status(400).json({error: '"login" must be a string -> ' + login});
    } else if (typeof name !== 'string') {
        res.status(400).json({error: '"name" must be a string' + name});
    } else if (password == '') {
        res.status(400).json({error: '"password" can`t be empty'});
    }

    const params = {
        TableName: USERS_TABLE,
        Item: {
            name:     name,
            login:    login,
            password: password,
            role:     role
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            console.log(error);
            res.status(400).json({error: 'Can`t create new User'});
        }
        res.json({name, login, password, role});
    });
});

router.get('/', function (req, res, next) {
    var params = {
            TableName: USERS_TABLE
        };
       
       dynamoDb.scan(params, function (err, data) {
        if (err)
            console.log(err, err.stack); // an error occurred
        else
            console.log(data); // successful response
            res.json(data);
        });
});

router.get('/:login', function (req, res, next) {
    const params = {
        TableName: USERS_TABLE,
            Key: {
                login: req.params.login,
            },
        }
       
       dynamoDb.get(params, (error, result) => {
            if (error) {
                console.log(error);
                res.status(400).json({error: 'Can`t get user Data'});
            }
            if (result.Item) {
                const {name, login, password, role} = result.Item;
                res.json({name, login, password, role});
            }else{
                res.status(404).json({error: "User not found"});
            }
        });
});

router.put('/:login', function (req, res, next) {

    const {name, login, password, role} = req.body;
    
    // if (typeof login !== 'string') {
    //     res.status(400).json({error: '"login" must be a string -> ' + login});
    // } else if (typeof name !== 'string') {
    //     res.status(400).json({error: '"name" must be a string' + name});
    // } else if (password == '') {
    //     res.status(400).json({error: '"password" can`t be empty'});
    // }

    const params = {
        TableName: USERS_TABLE,
        Key:{
            "login": login
        },
        UpdateExpression: "set name = :n, password = :p",
        ExpressionAttributeValues:{
            ":n": name,
            ":p": password
        },
        ReturnValues:"UPDATED_NEW"
    };

    dynamoDb.update(params, function(err, data) {
        if (err) {
            res.status(400).json({error: "Unable to update User. Error JSON:", data: JSON.stringify(err, null, 2)});
        } else {
            res.json({"message": "User updated successfully", "data": JSON.stringify(data, null, 2)});
        }
    });
});

router.delete('/:login', function (req, res, next) {
    
    const login = req.params.login;

    if (typeof login !== 'string') {
        res.status(400).json({error: '"login" must be a string -> ' + login});
    }

    const params = {
        TableName: USERS_TABLE,
        Key:{
            "login": login
        }
    };

    dynamoDb.delete(params, function(err, data) {
        if (err) {
            res.status(400).json({error: "Unable to delete User. Error JSON:", data: JSON.stringify(err, null, 2)});
        } else {
            res.json({"message": "User deleted successfully", "data": JSON.stringify(data, null, 2)});
        }
    });
    
});

module.exports = router;
