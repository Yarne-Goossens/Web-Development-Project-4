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
 *             description: The auto-generated id of the account
 *           email:
 *             type: string
 *             description: email of the account owner 
 *             format: email
 *           name:
 *             type: string
 *             description: name of the account owner
 *           password:
 *             type: string
 *             description: password of the account owner
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
 *      tags:
 *        - account
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
        const accounts = await accountService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        if( error instanceof Error){
            res.status(400).json(error)
        }
        res.status(500).json(error);
    }
});


/** 
 * @swagger
 * /account/addaccount:
 *   post:
 *      summary: Add a new Account through a form
 *      tags:
 *        - account
 *      responses:
 *          200:
 *            description: Account added
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Account'
 * 
 *      parameters:
 *        - name: name
 *          in: query
 *          description: account name
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
 * 
 *        - name: password
 *          in: query
 *          description: password
 *          required: true
 *          schema:
 *            type: string
 *            format: password
 */

account_router.post('/addaccount', async(req:Request, res:Response) => {
    try {
        const toAdd=new Account(String(req.query.email),String(req.query.name), String(req.query.password))
        await accountService.addAccountService(toAdd);

        res.status(200).json({toAdd});
    } catch (error) {
        console.log(error);
        if( error instanceof Error){
            res.status(400).json(error)
        }
        res.status(500).json(error);
    }
});

/** 
 * @swagger
 * /account/editaccount/:
 *   put:
 *      summary: edit an account through a form using the account id
 *      tags:
 *        - account
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

account_router.put('/editaccount/', async(req:Request, res:Response) => {
    try {
        const planetToEdit=accountService.getAccountById(Number(req.query.account_id));
        accountService.updateAccount(Number(req.query.account_id),
            new Account(String(req.query.email),String(req.query.name), String(req.query.password)));
        res.status(200).json({planetToEdit});
    } catch (error) {
        console.log(error);
        if( error instanceof Error){
            res.status(400).json(error)
        }
        res.status(500).json(error);
    }
});

/** 
 * @swagger
 * /account/deleteaccount/{account_id}:
 *   post:
 *      summary: delete an Account through a form using the account_id
 *      tags:
 *        - account
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
 *                       $ref: '#/components/schemas/Account'
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
 *     summary: login an Account through a form using the account_id
 *     tags:
 *       - account
 *     parameters:
 *       - name: email
 *         in: query
 *         description: account email
 *         required: true
 *         schema:
 *           type: string
 *           format: email
 * 
 *       - name: password
 *         in: query
 *         description: password
 *         required: true
 *         schema:
 *           type: string
 *           format: password
 * 
 *     responses:
 *       200:
 *         description: User logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Object not found
 *       500:
 *         description: Internal server error
 */


account_router.put('/login/', async(req:Request, res:Response) => {
    try {
        //validatie weggehaald omdat het programma crashte
       // accountService.loginValidation(String(req.query.email),String(req.query.password));
       if(await accountService.loginValidation(String(req.query.email),String(req.query.password))==false){
           res.status(400).json({message: 'Invalid email or password'});
        }
       
        res.status(200).json({message: 'User logged in successfully'});
    } catch (error) {
        console.log(error);
        if( error instanceof Error){
            res.status(400).json(error)
        }
        res.status(500).json(error);
    }
});
