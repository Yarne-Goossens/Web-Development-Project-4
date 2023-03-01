import express,{Request,Response} from 'express';
import { getAllPlanetsService } from '../service/planet_service';

const planet_router = express.Router();

planet_router.get('/', async(req:Request, res:Response) => {
    try {
        const planets = await getAllPlanetsService();
        res.status(200).json({planets});
    } catch (error) {
        res.status(500).json({message: 'Internal Server Error'});
    }
});