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
 */

planet_router.post('/addplanet', async(req:Request, res:Response) => {
    try {
        const radius=Number(req.query.radius);const semimajor_axis=Number(req.query.semimajor_axis);const mass=Number(req.query.mass);const planet_name=String(req.query.planet_name);
        //error handling
        if(planet_name==null||planet_name.length<1||planet_name.length>30){res.status(400).json({message: 'Planet name must be between 1 and 30 characters'});return;}
        if(radius==null||radius<0){res.status(400).json({message: 'Radius must be greater than 0'});return;}
        if(semimajor_axis==null||semimajor_axis<0){res.status(400).json({message: 'Semimajor axis must be greater than 0'});return;}
        if(mass==null||mass<0){res.status(400).json({message: 'Mass must be greater than 0'});return;}
        
        const planets = await planetService.addPlanetService(
        new Planet(radius, semimajor_axis, mass, planet_name));
        res.status(200).json({planets});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /planet/editplanet/:
 *   put:
 *      summary: edit a Planet through a form using the planet_id
 *      tags:
 *        - planet
 *      parameters:
 *        - name: planet_id
 *          in: query
 *          description: planet id to edit
 *          required: true
 *          schema:
 *            type: number
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
 * 
 *      responses:
 *         200:
 *            description: Planet edited successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

planet_router.put('/editplanet/', async(req:Request, res:Response) => {
    try {
        const radius=Number(req.query.radius);const semimajor_axis=Number(req.query.semimajor_axis);const mass=Number(req.query.mass);const planet_name=String(req.query.planet_name);
        //error handling
        if(planet_name==null||planet_name.length<1||planet_name.length>30){res.status(400).json({message: 'Planet name must be between 1 and 30 characters'});return;}
        if(radius==null||radius<0){res.status(400).json({message: 'Radius must be greater than 0'});return;}
        if(semimajor_axis==null||semimajor_axis<0){res.status(400).json({message: 'Semimajor axis must be greater than 0'});return;}
        if(mass==null||mass<0){res.status(400).json({message: 'Mass must be greater than 0'});return;}
        planetService.editPlanetService(Number(req.query.planet_id),
            new Planet(
            radius, 
            semimajor_axis, 
            mass, 
            planet_name,
        ));
        res.status(200).json({message: 'Planet edited successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});


/** 
 * @swagger
 * /planet/deleteplanet/{planet_id}:
 *   post:
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
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

planet_router.post('/deleteplanet/:planet_id', async(req:Request, res:Response) => {
    try {
        planetService.deletePlanetService(Number(req.params.planet_id));
        res.status(200).json({message: 'Planet deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});
