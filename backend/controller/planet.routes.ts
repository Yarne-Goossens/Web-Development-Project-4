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
import { getAllPlanetsService } from '../service/planet.service';

export const planet_router = express.Router();



planet_router.get('/', async(req:Request, res:Response) => {
    try {
        const planets = await getAllPlanetsService();
        res.status(200).json({planets});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});