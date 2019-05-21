var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/UserController');

/**
 * @swagger
 * /users:
 *    get:
 *      description: This should return all users
 *      operationId: "getUser"
 *      produces:
 *         - "application/json"
 *      parameters: []
 *      responses:
 *          200:
 *           description: "successful operation"
 *            schema:
 *               type: "object"
 *          400:
 *            description: "Error operation" 
 */
router.get('/', user_controller.getAllUsers);

/**
 * @swagger
 * /users:
 *    get/{login}:
 *      summary: "Find user by login"
 *      description: "Returns a single User"
 *      operationId: "getUserByLogin"
 *      produces:
 *        - "application/json"
 *      parameters:
 *        - name: "login"
 *            in: "path"
 *            description: "login of user to return"
 *            required: true
 *            type: "string"
 *      responses:
 *            200:
 *                description: "successful operation"
 *                schema:
 *                    type: "object"
 *            400:
 *                description: "Invalid login supplied"
 *            404:
 *                description: "User not found"
 */
router.get('/:login', user_controller.getUser);

/**
 * @swagger
 * /users:
 *    post:
 *      description: Create a User account
 *      operationId: "addUser"
 *      produces:
 *         - "application/json"
 *      parameters:
 *      - in: "body"
 *        name: "body"
 *        description: "User object that needs to be added"
 *        required: true
 */
router.post('/', user_controller.createUser);

/**
 * @swagger
 * /users:
 *    put:
 *      description: Update User account Data
 *      operationId: "updateUser"
 *      consumes:
 *            - "application/json"
 *      produces:
 *            - "application/json"
 *      parameters:
 *            - in: "body"
 *            name: "body"
 *            description: "User object that needs to be added to the store"
 *            required: true
 *      responses:
 *            200:
 *                description: "successful operation"
 *                schema:
 *                    type: "object"
 *            400:
 *               description: "Invalid login supplied"
 */
router.put('/', user_controller.updateUser);

/**
 * @swagger
 * /users:
 *    delete:
 *      description: Delete User account
 *      summary: "Deletes a User"
 *        operationId: "deleteUser"
 *        produces:
 *            - "application/json"
 *        parameters:
 *            - name: "login"
 *              in: "path"
 *              description: "User login to delete"
 *              required: true
 *              type: "string"
 *        responses:
 *             200:
 *                 description: "successful operation"
 *                 schema:
 *                     type: "object"        
 *             400:
 *                 description: "Invalid login supplied"
 */
router.delete('/:login', user_controller.deleteUser);

module.exports = router;
