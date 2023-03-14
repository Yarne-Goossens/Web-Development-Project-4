/**
 * @swagger
 *   components:
 *     schemas:
 *       Resource:
 *         type: object
 *         properties:
 *           resource_id:
 *             type: number
 *             format: int64
 *             description: The auto-generated id of the resource
 *           resource_name:
 *             type: string
 *             description: name of the resource (e.g. water)
 *           chemical_composition:
 *             type: string
 *             description: chemical composition of the resource (e.g. H2O)
 *           description:
 *             type: string
 *             description: description of the resource (e.g. water is a liquid)
 *           planet_id:
 *             type: number
 *             description: id of the planet the resource is on
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
 *      tags:
 *        - resource
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
        const resources = await resourceservice.getAllResourceService();
        res.status(200).json({resources});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/**
* @swagger
 * /resource/resourceoverview/{planet_id}:
 *   get:
 *      summary: Show all resources that belong to a planet
 *      tags:
 *        - resource
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
 *            description: Resource shown
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Resource'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

resource_router.get('/resourceoverview/:planet_id', async(req:Request, res:Response) => {
    try {
        const resourcesOfPlanet = await resourceservice.getAllResourceOfPlanetWithId(Number(req.params.planet_id));
        res.status(200).json({resourcesOfPlanet});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /resource/addresource:
 *   post:
 *      summary: Add a new resource through a form
 *      tags:
 *        - resource
 *      responses:
 *          200:
 *            description: Resource added
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Resource'
 * 
 *      parameters:
 *        - name: resource_name
 *          in: query
 *          description: resource name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: chemical_composition
 *          in: query
 *          description: chemical compostion
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: description
 *          in: query
 *          description: description
 *          required: true
 *          schema:  
 *            type: string
 *
 *        - name: planet_id
 *          in: query
 *          description: planet id of the planet the resource is on
 *          required: true
 *          schema:
 *            type: string
 */

resource_router.post('/addresource', async(req:Request, res:Response) => {
    try {
        const resource = await resourceservice.addResource(
        new Resource( 
        String(req.query.resource_name), 
        String(req.query.chemical_composition), 
        String(req.query.description), 
        Number(req.query.planet_id)));
        res.status(200).json({resource});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /resource/editresource/:
 *   put:
 *      summary: edit a Resource through a form using the resource_id
 *      tags:
 *        - resource
 *      parameters:
 *        - name: resource_id
 *          in: query
 *          description: resource id to edit
 *          required: true
 *          schema:
 *            type: number
 * 
 *        - name: resource_name
 *          in: query
 *          description: resource name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: chemical_composition
 *          in: query
 *          description: chemical composition
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: description
 *          in: query
 *          description: description
 *          required: true
 *          schema:  
 *            type: string
 *
 *        - name: planet_id
 *          in: query
 *          description: planet_id of the planet the resource belongs to
 *          required: true
 *          schema:
 *            type: string
 * 
 *      responses:
 *         200:
 *            description: Resource edited successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Resource'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

resource_router.put('/editresource/', async(req:Request, res:Response) => {
    try {
        const resourceToEdit=await resourceservice.getResourceWithIdService(Number(req.query.resource_id));
        resourceservice.editResourceService(Number(req.query.resource_id),
        new Resource(
        String(req.query.resource_name), 
        String(req.query.chemical_composition),
        String(req.query.description), 
        Number(req.query.planet_id)
        ));
        res.status(200).json({resourceToEdit});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /resource/deleteresource/{resource_id}:
 *   post:
 *      summary: delete a resource through a form using the resource_id
 *      tags:
 *        - resource
 *      parameters:
 *        - name: resource_id
 *          in: path
 *          description: resource id to delete
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Resource deleted successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Resource'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

resource_router.post('/deleteresource/:resource_id', async(req:Request, res:Response) => {
    try {
        const resourceToDelete=await resourceservice.getResourceWithIdService(Number(req.params.resource_id));
        resourceservice.deleteResource(Number(req.params.resource_id));
        res.status(200).json({resourceToDelete});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});