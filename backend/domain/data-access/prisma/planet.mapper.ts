import { Planet } from '../../model/planet';
import {PlanetPrisma}  from '../../../types/prisma_types';

export  const mapToPlanet = ({planet_id,planet_name,semimajor_axis,radius,mass,account_id}: PlanetPrisma &{planets:PlanetPrisma}) : Planet => 
    new Planet(radius,semimajor_axis,mass,planet_name,planet_id,account_id);

const mapToPlanets= (planetsPrisma: PlanetPrisma[]): Planet[] => planetsPrisma.map(mapToPlanet);

