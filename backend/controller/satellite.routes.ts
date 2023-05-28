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
 * /satellite/addsatellite/{planet_id}:
 *   post:
 *      summary: Add a new satellite through a form
 *      tags:
 *        - satellite
 *      
 * 
 *      parameters:
 *        - name: planet_id
 *          in: path
 *          description: id of the planet the satellite belongs to
 *          required: true
 *          schema:
 *            type: string
 * 
 *      requestBody:
 *       description: Edited account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               satellite_name:
 *                 type: string
 *                 description: account name
 *               radius:
 *                 type: number
 *               semimajor_axis:
 *                 type: number
 *               mass:
 *                 type: number
 *      responses:
 *         200:
 *            description: Account edited successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Account'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

satellite_router.post('/addsatellite/:planet_id', async(req:Request, res:Response) => {
    try {
        

        const radius=Number(req.body.radius);const semimajor_axis=Number(req.body.semimajor_axis);const mass=Number(req.body.mass);const satellite_name=String(req.body.satellite_name);
        const planet_id=Number(req.params.planet_id);
        
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
 *       description: Edited satellite
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               satellite_name:
 *                 type: string
 *                 description: Satellite name
 *               radius:
 *                 type: number
 *                 description: Satellite radius
 *               semimajor_axis:
 *                 type: number
 *                 description: Satellite semimajor-axis
 *               mass:
 *                 type: number
 *                 description: Satellite mass
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
 * /satellite/buysatellite/{satellite_id}/to/{account_id}:
 *   put:
 *      summary: buy a Planet through a form using the planet_id
 *      tags:
 *        - satellite
 *      parameters:
 *        - name: satellite_id
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

satellite_router.put('/buysatellite/:satellite_id/to/:account_id', async(req:Request, res:Response) => {
    try {
        const satellite_id=Number(req.params.satellite_id);
        const account_id=Number(req.params.account_id);

        await satelliteService.buySatelliteService(satellite_id,account_id);
        res.status(200).json({message: 'Planet bought successfully with id: '+satellite_id+' to account with id: '+account_id});

    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
});

/** 
 * @swagger
 * /satellite/sellsatellite/{satellite_id}/from/{account_id}:
 *   put:
 *      summary: sell a Planet through a form using the planet_id
 *      tags:
 *        - satellite
 *      parameters:
 *        - name: satellite_id
 *          in: path
 *          description: satellite id to sell
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

satellite_router.put('/sellsatellite/:satellite_id/from/:account_id', async(req:Request, res:Response) => {
    try {
        const satellite_id=Number(req.params.satellite_id);
        const account_id=Number(req.params.account_id);

        await satelliteService.sellSatelliteService(satellite_id,account_id);

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
