const { Router } = require("express")

const userController = require("../controllers/userController");
// Importation of the userController

const userRouter = new Router();

userRouter.get('/user/:id', cw(userController.getUser));
userRouter.patch('/user/:id/biography', cw(userController.modifyBiography))
userRouter.patch('/user/:id', cw(userController.modifyUser));
userRouter.get('/user/:id/mail', cw(userController.confirmationDeleteUser))
userRouter.delete('/delete/:id',  cw(userController.deleteUser));
// CRUD roads for users

module.exports = userRouter;
// Exporting the UserRouter in Index/Routers

/**
 * @param {*}mdw
 * @return {Controller wrapper for the function in the controller using async await try catch + error message for pseudo } 
*/

function cw(mdw) {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
          res.status(403)
          res.send(error);
        } else {
        console.error(error);
        res.json({ error: "Unexpected server error. Please try again later." });
      }
    };
  }
}

/** 
 * @swagger
 * /user/{id}:
 *  get:
 *    summary: Get an user by ID
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true 
 *      description: ID of the user to return 
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User found
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/GetUser' 
 *      400: 
 *        description: User not found

*/

/**
 * @swagger
 * /user/{id}:
 *  patch:
 *    summary: Update an user by ID
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user to update
 *      schema:
 *       type: integer
 *    requestBody:
 *      description: Update an existent user
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/User'  
 *    responses:
 *      200:
 *        description: User updated successfully
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/GetUser'
 *      404:
 *        description: Can't find user with id
*/

/**
 * @swagger
 * /user/{id}/biography:
 *  patch:
 *    summary: Update an user biography by ID
 *    tags: [User]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user biography to update
 *      schema:
 *       type: integer
 *    requestBody:
 *      description: Update an existent user biography
 *      required: true
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/Biography'  
 *    responses:
 *      200:
 *        description: User biography updated successfully
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/GetUser'
 *      404:
 *        description: Can't find user biography
*/

/**
 * @swagger
 * /delete/{id}:
 *  delete:
 *   summary: Delete an user by ID
 *   tags: [User]
 *   parameters:
 *   - in: path
 *     name: id
 *     required: true
 *     description: ID of the user to delete
 *     schema:
 *      type: integer
 *   responses:
 *    200:
 *      description: User profile has been deleted
 *    400:
 *      description: Invalid user ID supplied
 *    404:
 *      description: User profile not found
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *     User:
 *      type: object
 *      properties:
 *        id:
 *            type: integer
 *        firstname:
 *            type: string  
 *        lastname:
 *            type: string
 *        pseudo:
 *            type: string
 *        password:
 *            type: string  
 *        email:
 *            type: string
 *        biography:
 *            type: string
 *        createdAt:
 *            type: string
 *            format: date-time
 *        updatedAt:
 *            type: string
 *            format: date-time    
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     GetUser:
 *      type: object
 *      properties:
 *        id:
 *            type: integer
 *        firstname:
 *            type: string  
 *        lastname:
 *            type: string
 *        pseudo:
 *            type: string
 *        email:
 *            type: string
 *        password:
 *            type: string
 *        biography:
 *            type: string
 *        createdAt:
 *            type: string
 *            format: date-time
 *        updatedAt:
 *            type: string
 *            format: date-time    
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     Biography:
 *      type: object
 *      properties:
 *        id:
 *         type: integer          
 *        biography:
 *         type: string  
*/


/**
 *  @swagger
 *   components:
 *    schemas:
 *     DeleteUser:
 *      type: object
 *      properties:
 *       id:
 *        type: integer  
 *       pseudo:
 *        type: string
 *       email:
 *        type: string 
*/
