/**
 * @swagger
 *   components:
 *     schemas:
 *       Account:
 *         type: object
 *         properties:
 *           account_id:
 *             type: number
 *             format: int64
 *             description: The auto-generated id of the planet
 *           email:
 *             type: string
 *           name:
 *             type: string
 *           address:
 *             type: string
 *           password:
 *             type: string
 */

import express,{Request,Response} from 'express';
import { AccountService } from '../service/account.service';
import { Account } from '../domain/model/account';

export const accountService:AccountService=new AccountService();
export const account_router = express.Router();

/** 
 * @swagger
 * /account/accountoverview:
 *   get:
 *      summary: Get all accounts
 *      responses:
 *          200:
 *            description: Get all accounts
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Account'
*/

account_router.get('/accountoverview', async(req:Request, res:Response) => {
    try {
        const accounts = accountService.getAllAccounts();
        res.status(200).json({accounts});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});


/** 
 * @swagger
 * /account/addaccount:
 *   post:
 *      summary: Add a new Planet through a form
 *      responses:
 *          200:
 *            description: Planet added
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 * 
 *      parameters:
 *        - name: name
 *          in: query
 *          description: planet name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: email
 *          in: query
 *          description: email
 *          required: true
 *          schema:
 *            type: string
 *            format: email
 * 
 *        - name: address
 *          in: query
 *          description: semimajor_axis in mathematical notation or normal notation
 *          required: true
 *          schema:  
 *            type: string
 * 
 *        - name: password
 *          in: query
 *          description: mass in mathematical notation or normal notation
 *          required: true
 *          schema:
 *            type: string
 *            format: password
 */

account_router.post('/addaccount', async(req:Request, res:Response) => {
    try {
        const toAdd=new Account(String(req.query.email),String(req.query.name),  String(req.query.address), String(req.query.password))
        await accountService.addAccountService(toAdd);

        res.status(200).json({toAdd});
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

/** 
 * @swagger
 * /account/editaccount/:
 *   put:
 *      summary: edit a Planet through a form using the planet_id
 *      parameters:
 *        - name: account_id
 *          in: query
 *          description: account that needs to be edited by id
 *          required: true
 *          schema:
 *            type: string
 *        - name: name
 *          in: query
 *          description: account name
 *          required: true
 *          schema:
 *            type: string
 * 
 *        - name: email
 *          in: query
 *          description: account email
 *          required: true
 *          schema:
 *            type: string
 *            format: email
 * 
 *        - name: address
 *          in: query
 *          description: address
 *          required: true
 *          schema:  
 *            type: string
 * 
 *        - name: password
 *          in: query
 *          description: password
 *          required: true
 *          schema:
 *            type: string
 *            format: password
 * 
 *      responses:
 *         200:
 *            description: Planet edited successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

account_router.put('/editaccount/', async(req:Request, res:Response) => {
    try {
        const planetToEdit=accountService.getAccountById(Number(req.query.account_id));
        accountService.updateAccount(Number(req.query.account_id),
            new Account(String(req.query.email),String(req.query.name),  String(req.query.address), String(req.query.password)));
        res.status(200).json({planetToEdit});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /account/deleteaccount/{account_id}:
 *   post:
 *      summary: delete an Account through a form using the account_id
 *      parameters:
 *        - name: account_id
 *          in: path
 *          description: account id to delete
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: Account deleted successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

account_router.post('/deleteAccount/:account_id', async(req:Request, res:Response) => {
    try {
        const planetToDelete=accountService.getAccountById(Number(req.params.account_id));
        accountService.deleteAccount(Number(req.params.account_id));
        res.status(200).json({planetToDelete});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});

/** 
 * @swagger
 * /account/login/:
 *   put:
 *      summary: edit a Planet through a form using the planet_id
 *      parameters:
 * 
 *        - name: email
 *          in: query
 *          description: account email
 *          required: true
 *          schema:
 *            type: string
 *            format: email
 * 
 *        - name: password
 *          in: query
 *          description: password
 *          required: true
 *          schema:
 *            type: string
 *            format: password
 * 
 *      responses:
 *         200:
 *            description: User logged in successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *         404:
 *          description: Object not found
 *         500:
 *          description: Internal server error
 */

account_router.put('/login/', async(req:Request, res:Response) => {
    try {
        accountService.loginValidation(String(req.query.email),String(req.query.password));
        res.status(200).json({message: 'User logged in successfully'});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
});
