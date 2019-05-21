var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();


router.post('/', function (req, res, next) {
    console.log("Creating User");
    const {name, login, password, role} = req.body;
    console.log("name = " + name);
    console.log("login = " + login);
    console.log("password = " + password);
    console.log("role = " + role);

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
        
        console.log("User " + login + " created successfully.");
        res.json({name, login, password, role});
    });
});

router.get('/all', function (req, res, next) {
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

router.get('/get/:login', function (req, res, next) {
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

router.put('/update/:login', function (req, res, next) {
    console.log("Updating User");
    const {name, login, password, role} = req.body;
    console.log("name = " + name);
    console.log("login = " + login);
    console.log("password = " + password);
    console.log("role = " + role);

    if (typeof login !== 'string') {
        res.status(400).json({error: '"login" must be a string -> ' + login});
    } else if (typeof name !== 'string') {
        res.status(400).json({error: '"name" must be a string' + name});
    } else if (password == '') {
        res.status(400).json({error: '"password" can`t be empty'});
    }

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

    console.log("Updating the user");
    docClient.update(params, function(err, data) {
        if (err) {
            console.error("Unable to update User. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("User updated successfully:", JSON.stringify(data, null, 2));
        }
    });
});

router.delete('/delete/:login', function (req, res, next) {
    console.log("Deleting User");
    const {name, login, password, role} = req.body;
    console.log("login = " + login);

    if (typeof login !== 'string') {
        res.status(400).json({error: '"login" must be a string -> ' + login});
    }

    const params = {
        TableName: USERS_TABLE,
        Key:{
            "login": login
        }
    };

    console.log("Deleting the user: " + login);
    docClient.delete(params, function(err, data) {
        if (err) {
            console.error("Unable to delete User. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("User Deleted successfully:", JSON.stringify(data, null, 2));
        }
    });
});

module.exports = router;
