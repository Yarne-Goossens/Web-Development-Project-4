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
 *             description: The auto-generated id of the satellite
 *           radius:
 *             type: number
 *             description: radius of the satellite in km
 *           semimajor_axis:
 *             type: number
 *             description: semimajor axis of the satellite in m
 *           mass:
 *             type: number
 *             description: mass of the satellite in kg
 *           planet_name:
 *             type: string
 *             description: name of the planet the satellite orbits
 *           planet_id:
 *             type: number
 *             description: id of the planet that created the satellite
 * 
 *           account_id:
 *             type: number
 *             description: id of the acocunt that owns the satellite
 * 
 */
 

import express,{Request,Response} from 'express';
import { SatelliteService } from '../service/satellite.service';
import { Satellite } from '../domain/model/satellite';
import{PlanetService} from '../service/planet.service';
import { planetService } from './planet.routes';


export const satelliteService:SatelliteService=new SatelliteService();
export const satellite_router  = express.Router();

/** 
 * @swagger
 * /satellite/satelliteoverview:
 *   get:
 *      summary: Get all satellites
 *      tags:
 *        - satellite
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
        const satellites = await satelliteService.getAllSatellitesService();
        res.status(200).json(satellites);
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
 *      tags:
 *        - satellite
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
 *                       $ref: '#/components/schemas/Satellite'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.get('/satelliteoverview/:planet_id', async(req:Request, res:Response) => {
    try {
        const planet_id=Number(req.params.planet_id);
        if(await planetService.idExistsService(planet_id)===false){
            res.status(404).json({message: 'Planet not found'});
        }
        const satellitesOfPlanet = await satelliteService.getAllSatellitesOfPlanetWithId(planet_id);
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
 *      tags:
 *        - satellite
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
 *          description: id of the planet the satellite belongs to
 *          required: true
 *          schema:
 *            type: string
 * 
 */

satellite_router.post('/addsatellite', async(req:Request, res:Response) => {
    try {
        const radius=Number(req.query.radius);const semimajor_axis=Number(req.query.semimajor_axis);const mass=Number(req.query.mass);const satellite_name=String(req.query.satellite_name);const planet_id=Number(req.query.planet_id);
        /*if(await planetService.idExistsService(planet_id)===false){res.status(404).json({message: 'Planet not found'});}
        if(await satelliteService.satelliteNameExistsService(satellite_name)===true){res.status(404).json({message: 'Satellite name already exists'});}
        if(radius<0||radius==null){res.status(404).json({message: 'Radius cannot be negative'});}
        if(semimajor_axis<0||semimajor_axis==null){res.status(404).json({message: 'Semimajor axis cannot be negative'});}
        if(mass<0||mass==null){res.status(404).json({message: 'Mass cannot be negative'});}
        if(satellite_name==null){res.status(404).json({message: 'Satellite name cannot be null'});}
        if(planet_id==null){res.status(404).json({message: 'Planet id cannot be null'});}*/


        const satellite = await satelliteService.addSatellite(
        new Satellite( radius, 
        semimajor_axis, 
        mass,
        satellite_name, 
        planet_id));
        res.status(200).json({satellite});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /satellite/editsatellite/:
 *   put:
 *      summary: edit a Satellite through a form using the satellite_id
 *      tags:
 *        - satellite
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
 *          description: id of the planet the satellite belongs to
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: account_id
 *          in: query
 *          description: id of the account the satellite belongs to
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
 *                       $ref: '#/components/schemas/Satellite'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.put('/editsatellite/', async(req:Request, res:Response) => {
    try {
        const radius=Number(req.query.radius);
        const semimajor_axis=Number(req.query.semimajor_axis);
        const mass=Number(req.query.mass);
        const satellite_name=String(req.query.satellite_name);
        const planet_id=Number(req.query.planet_id);
        const satellite_id=Number(req.query.satellite_id);
        const account_id=Number(req.query.account_id);

        /*if(await planetService.idExistsService(planet_id)===false){res.status(404).json({message: 'Planet not found'});}
        if(await satelliteService.satelliteNameExistsService(satellite_name)===true){res.status(404).json({message: 'Satellite name already exists'});}
        if(radius<0||radius==null){res.status(404).json({message: 'Radius cannot be negative'});}
        if(semimajor_axis<0||semimajor_axis==null){res.status(404).json({message: 'Semimajor axis cannot be negative'});}
        if(mass<0||mass==null){res.status(404).json({message: 'Mass cannot be negative'});}
        if(satellite_name==null){res.status(404).json({message: 'Satellite name cannot be null'});}
        if(planet_id==null){res.status(404).json({message: 'Planet id cannot be null'});}
        if(satellite_id==null){res.status(404).json({message: 'Satellite id cannot be null'});}*/
        
        const satelliteToEdit=await satelliteService.getSatelliteWithIdService(satellite_id);
        satelliteService.editSatelliteService(satellite_id,
        new Satellite(
            radius, 
            semimajor_axis, 
            mass,
            satellite_name, 
            planet_id,
            account_id
        ));
        res.status(200).json({satelliteToEdit});
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
 *      tags:
 *        - satellite
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
        const satellite_id=Number(req.params.satellite_id);
        if(await satelliteService.idExistsService(satellite_id)===false){res.status(404).json({message: 'Satellite not found'});}

        const planetToDelete=await satelliteService.getSatelliteWithIdService(satellite_id);
        satelliteService.deleteSatellite(satellite_id);
        res.status(200).json({planetToDelete});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});


/** 
 * @swagger
 * /satellite/buysatellite/:
 *   post:
 *      summary: buy a Planet through a form using the planet_id
 *      tags:
 *        - satellite
 *      parameters:
 *        - name: satellite_id
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
 *            description: Satellite bought successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.post('/buysatellite/', async(req:Request, res:Response) => {
    try {
        if(await satelliteService.idExistsService(Number(req.query.satellite_id))==false)
        {res.status(400).json({message: 'Planet not found'});return;}//error handling

        satelliteService.buySatelliteService(Number(req.query.satellite_id),Number(req.query.account_id));
        res.status(200).json({message: 'Planet deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});

/** 
 * @swagger
 * /satellite/sellsatellite/:
 *   post:
 *      summary: sell a Planet through a form using the planet_id
 *      tags:
 *        - satellite
 *      parameters:
 *        - name: sat_id
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

satellite_router.post('/sellsatellite/', async(req:Request, res:Response) => {
    try {
        if(await satelliteService.idExistsService(Number(req.query.sat_id))==false)
        {res.status(400).json({message: 'Satellite not found'});return;}//error handling

        satelliteService.sellSatelliteService(Number(req.query.sat_id),Number(req.query.account_id));
        res.status(200).json({message: 'Planet deleted successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});
