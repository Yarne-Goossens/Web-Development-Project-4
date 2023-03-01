
import { getAllPlanets } from '../domain/data-access/planet_db';
import {Planet} from '../domain/model/planet';

export const getAllPlanetsService=():Planet[]=>getAllPlanets();