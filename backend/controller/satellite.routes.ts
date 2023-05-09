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
        //turn every part of the query into a body
        req.query.radius=req.body.radius;
        req.query.semimajor_axis=req.body.semimajor_axis;
        req.query.mass=req.body.mass;
        req.query.satellite_name=req.body.satellite_name;
        req.query.planet_id=req.body.planet_id;

        const radius=Number(req.query.radius);const semimajor_axis=Number(req.query.semimajor_axis);const mass=Number(req.query.mass);const satellite_name=String(req.query.satellite_name);
        const planet_id=Number(req.query.planet_id);
        
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
 * /satellite/editsatellite/{satellite_id}:
 *   put:
 *      summary: Edit a Satellite using the satellite_id
 *      tags:
 *        - satellite
 *      parameters:
 *        - name: satellite_id
 *          in: path
 *          description: Satellite ID to edit
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
 *               satellite_name:
 *                 type: string
 *                 format: email
 *                 description: Account email
 *               radius:
 *                 type: number
 *                 format: password
 *                 description: Account password
 *               semimajor_axis:
 *                 type: number
 *                 format: password
 *                 description: Account password
 *               mass:
 *                 type: number
 *                 format: password
 *                 description: Account password
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

satellite_router.put('/editsatellite/:satellite_id', async(req:Request, res:Response) => {
    try {
        const radius=Number(req.body.radius);
        const semimajor_axis=Number(req.body.semimajor_axis);
        const mass=Number(req.body.mass);
        const satellite_name=String(req.body.satellite_name);

        const satellite_id=Number(req.params.satellite_id);
        
        const satelliteToEdit=await satelliteService.getSatelliteWithIdService(satellite_id);
        satelliteService.editSatelliteService(satellite_id,
        new Satellite(
            radius, 
            semimajor_axis, 
            mass,
            satellite_name
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
 *   delete:
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

satellite_router.delete('/deletesatellite/:satellite_id', async(req:Request, res:Response) => {
    try {
        const satellite_id=Number(req.params.satellite_id);
        const satelliteToDelete= await satelliteService.deleteSatellite(satellite_id);
        res.status(200).json({message: 'Satellite with id '+ req.query.satellite_id +' deleted succesfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /satellite/buysatellite/:
 *   put:
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

satellite_router.put('/buysatellite/', async(req:Request, res:Response) => {
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
 *   put:
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

satellite_router.put('/sellsatellite/', async(req:Request, res:Response) => {
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


/** 
 * @swagger
 * /satellite/getsatellitewithid/{satellite_id}:
 *   get:
 *      summary: get a satellite using its id
 *      tags:
 *        - satellite
 *      parameters:
 *        - name: satellite_id
 *          in: path
 *          description: satellite id to find
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description:  found successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Satellite'
 *         404:
 *          description: user input error
 *         500:
 *          description: Internal server error
 */

satellite_router.get('/getsatellitewithid/:satellite_id', async(req:Request, res:Response) => {
    try {
        const satellite_id=Number(req.params.satellite_id);
        const withId=await satelliteService.getSatelliteWithIdService(satellite_id);
        res.status(200).json(withId);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
