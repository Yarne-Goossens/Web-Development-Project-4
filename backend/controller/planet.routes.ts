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
 *      parameters:
 *        - name: planet_name
 *          in: query
 *          description: planet name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: radius
 *          in: query
 *          description: radius
 *          required: true
 *          schema:
 *            type: number
 * 
 *        - name: semimajor_axis
 *          in: query
 *          description: semimajor_axis in mathematical notation or normal notation
 *          required: true
 *          schema:  
 *            type: string
 *            pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 * 
 *        - name: mass
 *          in: query
 *          description: mass in mathematical notation or normal notation
 *          required: true
 *          schema:
 *            type: string
 *            pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 *       
 */

planet_router.post('/addplanet', async(req:Request, res:Response) => {
    try {
        //turn every part of the query into a body
        req.query.radius=req.body.radius;
        req.query.semimajor_axis=req.body.semimajor_axis;
        req.query.mass=req.body.mass;
        req.query.planet_name=req.body.planet_name;
        
        const radius=Number(req.query.radius);const semimajor_axis=Number(req.query.semimajor_axis);const mass=Number(req.query.mass);const planet_name=String(req.query.planet_name);
        const planets = await planetService.addPlanetService(
        new Planet(radius, semimajor_axis, mass, planet_name));
        
        res.status(200).json({planets});
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
 *        - name: planet_name
 *          in: body
 *          description: planet name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: radius
 *          in: body
 *          description: radius
 *          required: true
 *          schema:
 *            type: number
 * 
 *        - name: semimajor_axis
 *          in: body
 *          description: semimajor_axis in mathematical notation or normal notation
 *          required: true
 *          schema:  
 *            type: string
 *            pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
 * 
 *        - name: mass
 *          in: body
 *          description: mass in mathematical notation or normal notation
 *          required: true
 *          schema:
 *            type: string
 *            pattern: '^[-+]?([0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?|\.[0-9]+([eE][-+]?[0-9]+)?)$'
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

        console.log(radius);
        console.log(semimajor_axis);
        console.log(mass);
        console.log(planet_name);


        const planetToEdit=await planetService.editPlanetService(Number(req.params.planet_id),
            new Planet(
            radius, 
            semimajor_axis, 
            mass, 
            planet_name,
        ));
        res.status(200).json({message: 'Planet edited successfully with id: '+req.query.planet_id});
        
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
        const delee=await planetService.deletePlanetService(planet_id);
        res.status(200).json({message:  'Planet deleted successfully with id: '+req.query.planet_id});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /planet/buyplanet:
 *   put:
 *      summary: buy a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: query
 *          description: planet id to buy
 *          required: true
 *          schema:
 *            type: number
 *        - name: account_id
 *          in: query
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

planet_router.put('/buyplanet', async(req:Request, res:Response) => {
    try {

        await planetService.buyPlanetService(Number(req.query.planet_id),Number(req.query.account_id));
        res.status(200).json({message: 'Planet bought successfully with id: '+req.query.planet_id}+' to account with id: '+req.query.account_id);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /planet/sellplanet:
 *   put:
 *      summary: sell a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: query
 *          description: planet id to sell
 *          required: true
 *          schema:
 *            type: number
 *        - name: account_id
 *          in: query
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

planet_router.put('/sellplanet', async(req:Request, res:Response) => {
    try {
        

        await planetService.sellPlanetService(Number(req.query.planet_id),Number(req.query.account_id));
        res.status(200).json({message: 'Planet with id: '+Number(req.query.planet_id)+' sold successfully to account with id: '+Number(req.query.account_id)});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
