/**
 * @swagger
 *   components:
 *     schemas:
 *       Resource:
 *         type: object
 *         properties:
 *           resource_name:
 *             type: string
 *             description: resource of the planet
 *           chemical_composition:
 *             type: string
 *           description:
 *             type: string
 *           planet_id:
 *             type: number
 */

import express,{Request,Response} from 'express';
import { ResourceService } from '../service/resource.service';
import { Resource } from '../domain/model/resource';

export const resourceservice:ResourceService=new ResourceService();
export const resource_router = express.Router();

/** 
 * @swagger
 * /resource/resourceoverview:
 *   get:
 *      summary: Get all resources
 *      responses:
 *          200:
 *            description: Get all resources
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Resource'
*/

resource_router.get('/resourceoverview', async(req:Request, res:Response) => {
    try {
        const planets = resourceservice.getAllResources();
        res.status(200).json({planets});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});