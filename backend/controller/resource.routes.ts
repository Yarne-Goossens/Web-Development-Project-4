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
import { planetService } from './planet.routes';

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
        res.status(200).json(resources);
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
        if(await planetService.idExistsService(Number(req.params.planet_id)) == false){
            res.status(404).json({message: 'Planet not found'});
        }

        const resourcesOfPlanet = await resourceservice.getAllResourceOfPlanetWithId(Number(req.params.planet_id));
        res.status(200).json({resourcesOfPlanet});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /resource/addresource/{planet_id}:
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
 *          in: body
 *          description: resource name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: chemical_composition
 *          in: body
 *          description: chemical compostion
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: description
 *          in: body
 *          description: description
 *          required: true
 *          schema:  
 *            type: string
 *
 *        - name: planet_id
 *          in: path
 *          description: planet id of the planet the resource is on
 *          required: true
 *          schema:
 *            type: string
 */

resource_router.post('/addresource/', async(req:Request, res:Response) => {
    try {
        req.query.resource_name=req.body.resource_name;
        req.query.chemical_composition=req.body.chemical_composition;
        req.query.description=req.body.description;
        req.query.planet_id=req.body.planet_id;

        const resource_name=String(req.query.resource_name);const chemical_composition=String(req.query.chemical_composition);const description=String(req.query.description);const planet_id=Number(req.query.planet_id);

        if(resource_name==null||resource_name.length<1||resource_name.length>30){res.status(400).json({message: 'Resource name must be between 1 and 30 characters'});return;}
        if(chemical_composition==null||chemical_composition.length<1||chemical_composition.length>30){res.status(400).json({message: 'Chemical composition must be between 1 and 30 characters'});return;}
        if(description==null||description.length<1||description.length>255){res.status(400).json({message: 'Description must be between 1 and 255 characters'});return;}
        if(planet_id==null||planet_id<0){res.status(400).json({message: 'Planet id must be a number'});return;}
        if(await planetService.idExistsService(planet_id)==false){res.status(404).json({message: 'Planet not found'});return;}
        
        const resource = await resourceservice.addResource(
        new Resource( resource_name, chemical_composition, description, planet_id));
        res.status(200).json({resource});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /resource/editresource/{resource_id}:
 *   put:
 *      summary: edit a Resource through a form using the resource_id
 *      tags:
 *        - resource
 *      parameters:
 *        - name: resource_id
 *          in: path
 *          description: resource id to edit
 *          required: true
 *          schema:
 *            type: number
 * 
 *      requestBody:
 *       description: Edited resource
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resource_name:
 *                 type: string
 *                 description: resource name
 *               chemical_composition:
 *                 type: string
 *                 description: chemical composition
 *               description:
 *                 type: string
 *                 description: description
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

resource_router.put('/editresource/:resource_id', async(req:Request, res:Response) => {
    try {
        const resource_id=Number(req.params.resource_id);
        const resource_name=String(req.body.resource_name);
        const chemical_composition=String(req.body.chemical_composition);
        const description=String(req.body.description);

        /*if(resource_id==null||resource_id<0){res.status(400).json({message: 'Resource id must be a number'});return;}
        if(resource_name==null||resource_name.length<1||resource_name.length>30){res.status(400).json({message: 'Resource name must be between 1 and 50 characters'});return;}
        if(chemical_composition==null||chemical_composition.length<1||chemical_composition.length>30){res.status(400).json({message: 'Chemical composition must be between 1 and 30 characters'});return;}
        if(description==null||description.length<1||description.length>255){res.status(400).json({message: 'Description must be between 1 and 255 characters'});return;}
        if(planet_id==null||planet_id<0){res.status(400).json({message: 'Planet id must be a number'});return;}
        if(await planetService.idExistsService(planet_id)==false){res.status(400).json({message: 'Planet not found'});return;}*/

        const resourceToEdit=await resourceservice.getResourceWithIdService(resource_id);
        resourceservice.editResourceService(resource_id,
        new Resource(
        resource_name, 
        chemical_composition,
        description
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
 *   delete:
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

resource_router.delete('/deleteresource/:resource_id', async(req:Request, res:Response) => {
    try {
        const resource_id=Number(req.params.resource_id);       
        const resourceToDelete= await resourceservice.deleteResource(Number(resource_id));
        res.status(200).json({message: 'Resource with id '+ req.query.resource_id +' deleted succesfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /resource/getresourcewithid/{resource_id}:
 *   get:
 *      summary: get a resource using its id
 *      tags:
 *        - resource
 *      parameters:
 *        - name: resource_id
 *          in: path
 *          description: resource id to find
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: resource found successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Resource'
 *         404:
 *          description: user input error
 *         500:
 *          description: Internal server error
 */

resource_router.get('/getresourcewithid/:resource_id', async(req:Request, res:Response) => {
    try {
        const resource_id=Number(req.params.resource_id);
        const withId=await resourceservice.getResourceWithIdService(resource_id);
        res.status(200).json(withId);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
