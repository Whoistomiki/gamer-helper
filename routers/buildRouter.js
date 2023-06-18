const { Router } = require("express")

const buildController = require("../controllers/buildController");
// Importation of the buildController

const buildRouter = new Router();

buildRouter.get('/user/:id/builds', cw(buildController.getBuildsInUser));
buildRouter.post('/builds', cw(buildController.createBuild));
buildRouter.patch('/builds/:id', cw(buildController.modifyBuild));
buildRouter.delete('/builds/:id', cw(buildController.deleteBuild));
// CRUD roads for builds

module.exports = buildRouter;
// Exporting the buildRouter in Index/Routers

/**
 * @param {*}mdw
 * @return {Controller wrapper for the function in the controller using async await try catch}
*/

function cw(mdw) {
    return async (req, res) => {
      try {
        await mdw(req, res);
      } catch (error) {
        console.error(error);
        res.json({ error: "Unexpected server error. Please try again later." });
      }
    };
}

//TODO: Add the documentation for the buildRouter later for future versions of the project
/**
 * @swagger
 * /user/{id}/builds:
 *  get:
 *    summary: Get an user build by ID
 *    tags: [Build]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user build to return
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User build found
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Build'
*/  

/**
 * @swagger
 * /builds/:id:
 *  patch:
 *    summary: Update an user's build by ID
 *    tags: [Build]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user build to update
 *      schema:
 *        type: integer
 *    requestBody:
 *      required: true
 *      description: Update an existent user build
 *      content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/Build'  
 *    responses:
 *      200:
 *        description: User build updated successfully
 *        content:
 *         application/json:
 *          schema:
 *           type: array
 *           items:
 *            $ref: '#/components/schemas/Build'
*/

/**
 * @swagger
 * /builds:
 *  post:
 *    summary: Add a new user build
 *    tags: [Build]
 *    requestBody:
 *      required: true
 *      description: Create a new user build
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/components/schemas/Build'    
 *    responses:
 *      200:
 *        description: User build added successfully
 *        content:
 *          application/json:
 *           schema:
 *            type: array
 *            items:
 *             $ref: '#/components/schemas/Build' 
*/

/**
 * @swagger
 * /builds/:id:
 *  delete:
 *    summary: Delete an user build by ID
 *    tags: [Build]
 *    parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      description: ID of the user build to delete
 *      schema:
 *        type: integer
 *    responses:
 *      200:
 *        description: User build has successfully deleted
 *      400:
 *       description: Invalid build ID supplied
 *      404:
 *        description: User build not found
*/

/**
 * @swagger
 *  components:
 *    schemas:
 *     Build:
 *      type: object
 *      properties:
 *        id:
 *            type: integer
 *        title:
 *            type: string  
 *        widget_id:
 *            type: integer
 *        user_id:
 *            type: integer   
 */