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
        const planets = planetService.getAllPlanetsDb();
        res.status(200).json({planets});
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
        const planets = await planetService.addPlanetService(
            new Planet(Number(req.query.radius), Number(req.query.semimajor_axis), Number(req.query.mass), String(req.query.planet_name)));
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
        const planetToEdit=planetService.getPlanetWithIdService(Number(req.query.planet_id));
        planetService.editPlanetService(Number(req.query.planet_id),
            new Planet(
            Number(req.query.radius), 
            Number(req.query.semimajor_axis), 
            Number(req.query.mass), 
            String(req.query.planet_name),
            Number(planetToEdit.planet_id)
        ));
        res.status(200).json({planetToEdit});
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
        const planetToDelete=planetService.getPlanetWithIdService(Number(req.params.planet_id));
        planetService.deletePlanetService(Number(req.params.planet_id));
        res.status(200).json({planetToDelete});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});
