const { Router } = require("express")

const authController = require("../controllers/authController");
// Importation of the authController

const authRouter = new Router();

authRouter.post('/login', cw(authController.loginAction));
authRouter.post('/signup', cw(authController.signupAction));
authRouter.get('/logout', cw(authController.logout));
authRouter.post('/auth/refreshtoken', cw(authController.refreshToken));
// Authentification roads for the user

module.exports = authRouter;
// Exporting the authRouter in Index/Routers

/**
 * @param {*}mdw
 * @return {Controller wrapper for the function in the controller using async await try catch}
*/

function cw(mdw) {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
          // Sequelize error different message 
          res.status(403)
          res.send({ status: 'error', message: "User already exists"});
      }else {
        console.error(error);
        res.json({ error: "Unexpected server error. Please try again later." });
      }}
    };
}

/**
 * @swagger
 * /login:
 *  post:
 *   summary: Logs user into the system
 *   tags: [User]
 *   requestBody:
 *      description: Login user
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *           $ref: '#/components/schemas/LoginUser'
 *   responses:
 *     200:
 *      description: User has logged in
 *      content:
 *       application/json:
 *        schema:
 *         type: array
 *         items:
 *          $ref: '#/components/schemas/GetUser'
 *     400:
 *      description: User/email not found
*/

/**
 * @swagger
 * /signup:
 *  post:
 *    summary: Create a new user
 *    tags: [User]
 *    requestBody:
 *     description: Create a new user
 *     required: true
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/components/schemas/CreateUser'
 *    responses:
 *      201:
 *        description: User is created
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/User'
 *      403:
 *        description: User already exists
*/

/**
 * @swagger
 * /logout:
 *   get:
 *    summary: Logs out current logged in user session
 *    tags: [User]
 *    responses:
 *     200:
 *      description: User has been disconnected
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     CreateUser:
 *      type: object
 *      properties:
 *        firstname:
 *            type: string  
 *        lastname:
 *            type: string
 *        pseudo:
 *            type: string
 *        password:
 *            type: string
 *        passwordConfirm:
 *            type: string 
 *        email:
 *            type: string
 *        biography:
 *            type: string  
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     LoginUser:
 *      type: object
 *      properties:
 *        email:
 *            type: string
 *        password:
 *            type: string
*/