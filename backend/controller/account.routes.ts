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
import  AccountService  from '../service/account.service';
import { Account } from '../domain/model/account';


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
        const accounts = await AccountService.getAllAccounts();
        res.status(200).json(accounts);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
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
 *            description: Account added successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Planet'
 *          404:
 *           description: User Input Error
 *          500:
 *           description: Internal server error
 * 
 *      requestBody:
 *       description: added account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: account name
 *               email:
 *                 type: string
 *                 description: email
 *                 format: email
 *               password:
 *                 type: string
 *                 description: password
 *                 format: password
 */

account_router.post('/addaccount', async(req:Request, res:Response) => {
    try {

        const email=String(req.body.email);const username=String(req.body.username);const password=String(req.body.password);
        const toAdd=new Account(email,username, password)

        await AccountService.addAccountService(toAdd);

        res.status(200).json({toAdd});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /account/getaccountbyemail/{email}:
 *   get:
 *      summary: get a account by email
 *      tags:
 *        - account
 *      parameters:
 *        - name: email
 *          in: path
 *          description: account email to find
 *          required: true
 *          schema:
 *            type: string
 * 
 *      responses:
 *         200:
 *            description: account found successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Account'
 *         404:
 *          description: user input error
 *         500:
 *          description: Internal server error
 */

account_router.get('/getaccountbyemail/:email', async(req:Request, res:Response) => {
    try {
        const email=String(req.params.email);
        const account = await AccountService.getAccountByEmail(email);
        res.status(200).json(account);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }});

/** 
 * @swagger
 * /account/editaccount/{account_id}:
 *   put:
 *      summary: edit an account through a form using the account id
 *      tags:
 *        - account
 *      parameters:
 *        - name: account_id
 *          in: path
 *          description: account that needs to be edited by id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
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
 *   
 *      requestBody:
 *       description: Edited account
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: account name
 *               email:
 *                 type: string
 *                 description: email
 *                 format: email
 *               password:
 *                 type: string
 *                 description: password
 *                 format: password
 */

account_router.put('/editaccount/:account_id', async(req:Request, res:Response) => {
    try {
        const account_id=Number(req.params.account_id);const name=String(req.body.username);const email=String(req.body.email);const password=String(req.body.password)
        
        const planetToEdit=await AccountService.getAccountById(account_id);

        AccountService.updateAccount(account_id,new Account(email,name,password));
        res.status(200).json({planetToEdit});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /account/deleteaccount/{account_id}:
 *   delete:
 *      summary: delete an Account through a form using the account_id path variable
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

account_router.delete('/deleteAccount/:account_id', async(req:Request, res:Response) => {
    try {
        const account_id=Number(req.params.account_id);

        const accountToDelete=await AccountService.getAccountById(account_id);
        AccountService.deleteAccount(account_id);
        res.status(200).json({accountToDelete});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
/**
 * @swagger
 * /account/login:
 *   post:
 *     summary: Login an Account through a form using email and password
 *     tags:
 *       - account
 *     requestBody:
 *       description: Account login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Account email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Account password
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

account_router.post('/login', async(req:Request, res:Response) => {
    try{
        const userInput=req.body;
        const email=userInput.email;
        const password=userInput.password;
        const token =await AccountService.loginValidation(email,password);
        res.status(200).json({message:'Authentication successful',token});
    }catch(error){
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});

/** 
 * @swagger
 * /account/getaccountwithid/{account_id}:
 *   get:
 *      summary: get a account by id
 *      tags:
 *        - account
 *      parameters:
 *        - name: account_id
 *          in: path
 *          description: account id to find
 *          required: true
 *          schema:
 *            type: number
 * 
 *      responses:
 *         200:
 *            description: account found successfully
 *            content:
 *               application/json:
 *                   schema:
 *                       $ref: '#/components/schemas/Account'
 *         404:
 *          description: user input error
 *         500:
 *          description: Internal server error
 */

account_router.get('/getaccountwithid/:account_id', async(req:Request, res:Response) => {
    try {
        const account_id=Number(req.params.account_id);
        const withId=await AccountService.getAccountById(account_id);
        res.status(200).json(withId);
    } catch (error) {
        console.log(error);
        res.status(404).json({status:'error',errorMessage: error.message});
    }
});
