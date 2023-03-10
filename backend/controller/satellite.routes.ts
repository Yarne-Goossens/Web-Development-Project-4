/**
 * @swagger
 *   components:
 *     schemas:
 *       Satellite:
 *         type: object
 *         properties:
 *           satellite_id:
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
 * 
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
import { SatelliteService } from '../service/satellite.service';
import { Satellite } from '../domain/model/satellite';



export const satelliteService:SatelliteService=new SatelliteService();
export const satellite_router  = express.Router();

/** 
 * @swagger
 * /satellite/satelliteoverview:
 *   get:
 *      summary: Get all satellites
 *      responses:
 *          200:
 *            description: Get all satellites
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Satellite'
*/

satellite_router.get('/satelliteoverview', async(req:Request, res:Response) => {
    try {
        const satellites = satelliteService.getAllSatellitesService();
        res.status(200).json({satellites});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/**
* @swagger
 * /satellite/satelliteoverview/{planet_id}:
 *   get:
 *      summary: Show all satellites that belong to a planet
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: planet id to search
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Satellite shown
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.get('/satelliteoverview/:planet_id', async(req:Request, res:Response) => {
    try {
        const satellitesOfPlanet = satelliteService.getAllSatellitesOfPlanetWithId(Number(req.params.planet_id));
        res.status(200).json({satellitesOfPlanet});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /satellite/addsatellite:
 *   post:
 *      summary: Add a new satellite through a form
 *      responses:
 *          200:
 *            description: Satellite added
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Satellite'
 * 
 *      parameters:
 *        - name: satellite_name
 *          in: query
 *          description: satellite name
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
 *        - name: planet_id
 *          in: query
 *          description: planet id of the planet the satellite belongs to
 *          required: true
 *          schema:
 *            type: string
 */

satellite_router.post('/addsatellite', async(req:Request, res:Response) => {
    try {
        const planet = await satelliteService.addSatellite(
        new Satellite( Number(req.query.radius), 
        Number(req.query.semimajor_axis), 
        Number(req.query.mass),
        String(req.query.satellite_name), 
        Number(req.query.planet_id)));
        console.log(planet);
        res.status(200).json({planet});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /satellite/deletesatellite/{satellite_id}:
 *   post:
 *      summary: delete a satellite through a form using the satellite_id
 *      parameters:
 *        - name: satellite_id
 *          in: path
 *          description: satellite id to delete
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Satellite deleted successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Satellite'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.post('/deletesatellite/:satellite_id', async(req:Request, res:Response) => {
    try {
        const planetToDelete=satelliteService.getSatelliteWithIdService(Number(req.params.satellite_id));
        satelliteService.deleteSatellite(Number(req.params.satellite_id));
        res.status(200).json({planetToDelete});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /satellite/editsatellite/:
 *   put:
 *      summary: edit a Planet through a form using the satellite_id
 *      parameters:
 *        - name: satellite_id
 *          in: query
 *          description: satellite id to edit
 *          required: true
 *          schema:
 *            type: number
 *        - name: satellite_name
 *          in: query
 *          description: satellite name
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
 *        - name: planet_id
 *          in: query
 *          description: planet_id of the planet the satellite belongs to
 *          required: true
 *          schema:
 *            type: string
 * 
 *      responses:
 *         200:
 *            description: Satellite edited successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.put('/editsatellite/', async(req:Request, res:Response) => {
    try {
        const satelliteToEdit=satelliteService.getSatelliteWithIdService(Number(req.query.satellite_id));
        satelliteService.editSatelliteService(Number(req.query.satellite_id),
        new Satellite(
        Number(req.query.radius), 
        Number(req.query.semimajor_axis), 
        Number(req.query.mass),
        String(req.query.satellite_name), 
        Number(req.query.planet_id),
        Number(satelliteToEdit.satellite_id)
        ));
        res.status(200).json({satelliteToEdit});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});