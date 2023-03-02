import { getAllPlanets } from '../domain/data-access/planet.db';
import {Planet} from '../domain/model/planet';

export const getAllPlanetsService=():Planet[]=>getAllPlanets();