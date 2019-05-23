var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/UserController');

/**
 * @swagger
 * components:
 *      schemas:
 *        User:
 *          type: object
 *          properties:
 *               login:
 *                   type: string
 *               name:
 *                   type: string
 *               password:
 *                   type: string
 *               role:
 *                   type: string
 * 
 * /prod/users:
 *    get:
 *      summary: "Get a List with all users"
 *      description: Get a List with all users
 *      operationId: "getUser"
 *      produces:
 *         - "application/json"
 *      parameters: []
 *      responses:
 *          200:
 *           description: "successful operation"
 *           content:
 *             application/json:
 *               schema:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/User'
 *          400:
 *            description: "Error operation" 
 */
router.get('/', user_controller.getAllUsers);

/**
 * @swagger
 * /prod/users/{login}:
 *    get:
 *      summary: "Find a user by login"
 *      description: "Returns a single User"
 *      operationId: "getUserByLogin"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - in: path
 *          name: login
 *          schema:
 *            type: string
 *          required: true
 *          description: login of the user to get
 *      responses:
 *            200:
 *                description: A single user.
 *                content:
 *                    application/json:
 *                    schema:
 *                      type: object
 *                      properties:
 *                           login:
 *                               type: string
 *                           name:
 *                               type: string
 *                           password:
 *                               type: string
 *                           role:
 *                               type: string
 *            400:
 *                description: "Invalid login supplied"
 *            404:
 *                description: "User not found"
 */
router.get('/:login', user_controller.getUser);

/**
 * @swagger
 * /prod/users:
 *    post:
 *      summary: "Create a New User account"
 *      description: Create a User account
 *      operationId: "addUser"
 *      produces:
 *         - "application/json"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *            200:
 *                description: "User created sucessfully"
 *            400:
 *               description: "Unable to create User"
 *            410:
 *               description: "name can`t be empty"
 *            420:
 *               description: "login can`t be empty"
 *            430:
 *               description: "password can`t be empty"
 */
router.post('/', user_controller.createUser);

/**
 * @swagger
 * /prod/users:
 *    put:
 *      description: Update User account Data
 *      summary: "Updates a User"
 *      operationId: "updateUser"
 *      consumes:
 *            - "application/json"
 *      produces:
 *            - "application/json"
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *            200:
 *                description: "User updated sucessfully"
 *            400:
 *               description: "Unable to update User"
 *            410:
 *               description: "login can`t be empty"
 */
router.put('/', user_controller.updateUser);

/**
 * @swagger
 * /prod/users/{login}:
 *    delete:
 *      description: Delete User account
 *      summary: "Deletes a User"
 *      operationId: "deleteUser"
 *      produces:
 *            - "application/json"
 *      parameters:
 *        - in: path
 *          name: login
 *          schema:
 *            type: string
 *          required: true
 *          description: login of the user to get
 *      responses:
 *             200:
 *                 description: "User deleted successfully" 
 *             400:
 *                 description: "Unable to delete user"
 *             410:
 *                 description: "login can`t be empty"
 */
router.delete('/:login', user_controller.deleteUser);

module.exports = router;
