const AWS = require('aws-sdk');
const USERS_TABLE = process.env.USERS_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.getAllUsers = function(req, res, next){
    var params = {
        TableName: USERS_TABLE
    };
    
    dynamoDb.scan(params, function (err, data) {
        if (err)
            res.status(400).json({messsage: 'Can`t get users Data', error: err});
        else
            res.json({message: 'Successful operation', data: data});
    });
} 

exports.getUser = function(req, res, next){
    const params = {
        TableName: USERS_TABLE,
        Key: {
            login: req.params.login,
        },
    }
   
    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({messsage: 'Can`t get user Data', error: error});
        }
        if (result.Item) {
            res.json({message: 'Successful operation', data: result.Item});
        }else{
            res.status(404).json({error: "User not found"});
        }
    });
}

exports.createUser = function (req, res, next) {
    const {name, login, password, role} = req.body;
    var Item = {}

    if (name !== '') {
        Item.name = name
    }else{
        res.status(400).json({error: 'name can`t be empty'});
    }

    if (login !== '') {
        Item.login = login
    }else{
        res.status(400).json({error: 'login can`t be empty'});
    }

    if (password !== '') {
        Item.password = password
    }else{
        res.status(400).json({error: 'password can`t be empty'});
    }

    if (role !== '') {
        Item.role = role
    }

    const params = {
        TableName: USERS_TABLE,
        Item: Item
    };

    dynamoDb.put(params, function(err, data) {
        if (err) {
            res.status(400).json({messsage: 'Can`t create User', error: err});
        } else {
            res.json({message: "User created sucessfully", data: data});
        }
    });
}

exports.updateUser = function(req, res, next){

    const {login, name, password, role} = req.body;

    if (login == '') {
        res.status(400).json({error: 'login can`t be empty'});
    }

    const params = {
        TableName: USERS_TABLE,
        Key:{
            "login": login
        },
        UpdateExpression: "set name = :n, password = :p, role = :r",
        ExpressionAttributeValues:{
            ":n": name,
            ":p": password,
            ":r": role
        },
        ReturnValues:"UPDATED_NEW"
    };

    dynamoDb.update(params, function(err, data) {
        if (err) {
            res.status(400).json({message: "Unable to update User. Error JSON:", error: err});
        } else {
            res.json({message: "User updated successfully", data: data});
        }
    });
}

exports.deleteUser = function(req, res, next){
    const login = req.params.login;

    if (login == '') {
        res.status(400).json({error: 'login can`t be empty'});
    }

    const params = {
        TableName: USERS_TABLE,
        Key:{
            "login": login
        }
    };

    dynamoDb.delete(params, function(err, data) {
        if (err) {
            res.status(400).json({message: "Unable to delete User", error: err});
        } else {
            res.json({message: "User deleted successfully"});
        }
    });
}