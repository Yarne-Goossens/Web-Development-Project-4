/**
 * @swagger
 *   components:
 *     schemas:
 *       Planet:
 *         type: object
 *         properties:
 *           planet_id:
 *             type: number
 *             format: int64
 *             description: The auto-generated id of the planet
 *           radius:
 *             type: number
 *           semimajor_axis:
 *             type: number
 *           mass:
 *             type: number
 *           planet_name:
 *             type: string
 *           account_id:
 *             type: number
 */

import express,{Request,Response} from 'express';
import { PlanetService } from '../service/planet.service';
import { Planet } from '../domain/model/planet';

export const planetService:PlanetService=new PlanetService();
export const planet_router = express.Router();

/** 
 * @swagger
 * /planet/planetoverview:
 *   get:
 *      summary: Get all planets
 *      tags:
 *        - planet
 *      responses:
 *          200:
 *            description: Get all planets
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
*/

planet_router.get('/planetoverview', async(req:Request, res:Response) => {
    try {
        const planets = await planetService.getAllPlanetsService();
        res.status(200).json(planets);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /planet/addplanet:
 *   post:
 *      summary: Add a new Planet through a form
 *      tags:
 *        - planet
 *      responses:
 *          200:
 *            description: Planet added
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *          404:
 *           description: User Input Error
 *          500:
 *           description: Internal server error
 * 
 *      requestBody:
 *       description: Account login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planet_name:
 *                 type: string
 *                 format: string
 *                 description: name of the planet
 *               radius:
 *                 type: number
 *                 format: number
 *                 description: radius of the planet
 *               semimajor_axis:
 *                 type: string
 *                 pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 *                 description: semimajor_axis of the planet
 *               mass:
 *                 type: number
 *                 pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 *                 description: mass of the planet
 *  
 *       
 *       
 */

planet_router.post('/addplanet', async(req:Request, res:Response) => {
    try {
        
        const radius=Number(req.body.radius);const semimajor_axis=Number(req.body.semimajor_axis);const mass=Number(req.body.mass);const planet_name=String(req.body.planet_name);
        const planet=new Planet(radius, semimajor_axis, mass, planet_name);
        const planets = await planetService.addPlanetService(
        new Planet(radius, semimajor_axis, mass, planet_name));
        
        res.status(200).json(planet);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /planet/getplanetwithid/{planet_id}:
 *   get:
 *      summary: delete a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: planet id to delete
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Planet deleted successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: user input error
 *         500:
 *          description: Internal server error
 */

planet_router.get('/getplanetwithid/:planet_id', async(req:Request, res:Response) => {
    try {
        
        const planet_id=Number(req.params.planet_id);
        const withId=await planetService.getPlanetWithIdService(planet_id);
        res.status(200).json(withId);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /planet/editplanet/{planet_id}:
 *   put:
 *      summary: edit a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: planet id to edit
 *          required: true
 *          schema:
 *            type: number
 *      requestBody:
 *       description: Account login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               planet_name:
 *                 type: string
 *                 format: string
 *                 description: name of the planet
 *               radius:
 *                 type: number
 *                 format: number
 *                 description: radius of the planet
 *               semimajor_axis:
 *                 type: string
 *                 pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 *                 description: semimajor_axis of the planet
 *               mass:
 *                 type: number
 *                 pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 *                 description: mass of the planet
 *
 *      responses:
 *         200:
 *            description: Planet edited successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: User Input Error
 *         500:
 *          description: Internal server error
 */

planet_router.put('/editplanet/:planet_id', async(req:Request, res:Response) => {
    try {
        //turn every part of the query into a body
        const radius = Number(req.body.radius);
        const semimajor_axis = Number(req.body.semimajor_axis);
        const mass = Number(req.body.mass);
        const planet_name = String(req.body.planet_name);

        const planetToEdit=await planetService.editPlanetService(Number(req.params.planet_id),
            new Planet(
            radius, 
            semimajor_axis, 
            mass, 
            planet_name,
        ));
        res.status(200).json({message: 'Planet edited successfully with id: '+req.params.planet_id});
        
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
 

/** 
 * @swagger
 * /planet/deleteplanet/{planet_id}:
 *   delete:
 *      summary: delete a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: planet id to delete
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Planet deleted successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: user input error
 *         500:
 *          description: Internal server error
 */

planet_router.delete('/deleteplanet/:planet_id', async(req:Request, res:Response) => {
    try {
        const planet_id=Number(req.params.planet_id);
        const deletePlanet=await planetService.deletePlanetService(planet_id);
        res.status(200).json({message:  'Planet with id: '+req.query.planet_id+ ' deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /planet/buyplanet/{planet_id}/to/{account_id}:
 *   put:
 *      summary: buy a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: planet id to buy
 *          required: true
 *          schema:
 *            type: number
 *        - name: account_id
 *          in: path
 *          description: account id to add it to
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Planet bought successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

planet_router.put('/buyplanet/:planet_id/to/:account_id', async(req:Request, res:Response) => {
    try {
        const planet_id=Number(req.params.planet_id);
        const account_id=Number(req.params.account_id)

        await planetService.buyPlanetService(planet_id,account_id);
        res.status(200).json({message: 'Planet bought successfully with id: '+planet_id+' to account with id: '+account_id});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /planet/sellplanet/{planet_id}/from/{account_id}:
 *   put:
 *      summary: sell a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: planet id to sell
 *          required: true
 *          schema:
 *            type: number
 *        - name: account_id
 *          in: path
 *          description: account to 
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Planet sold successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

planet_router.put('/sellplanet/:planet_id/from/:account_id', async(req:Request, res:Response) => {
    try {
        const planet_id=Number(req.params.planet_id);
        const account_id=Number(req.params.account_id)
        await planetService.sellPlanetService(planet_id,account_id);

        res.status(200).json({message: 'Planet with id: '+planet_id+' sold successfully to account with id: '+account_id});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
