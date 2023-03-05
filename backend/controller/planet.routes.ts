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
 *             type: bigint
 *           mass:
 *             type: bigint
 *           planet_name:
 *             type: string
 *           webshop_name:
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
        
        const planets = planetService.getAllPlanetsService();
        res.status(200).json({planets});
    } catch (error) {
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
 *          description: semimajor_axis
 *          required: true
 *          schema:  
 *            type: number
 * 
 *        - name: mass
 *          in: query
 *          description: mass
 *          required: true
 *          schema:
 *            type: number
 * 
 *        - name: webshop_name
 *          in: query
 *          description: webshop_name
 *          required: true
 *          schema:
 *            type: string
 */

planet_router.post('/addplanet', async(req:Request, res:Response) => {
    try {
        console.log(req.query.radius);
        console.log(req.query.semimajor_axis);
        console.log(req.query.mass);
        const planets = planetService.addPlanetService(

            new Planet(String(req.query.planet_name), Number(req.query.radius), BigInt(req.query.semimajor_axis), BigInt(req.query.mass), String(req.query.webshop_name)));
        
        res.status(200).json({planets});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});
