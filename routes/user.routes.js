const express = require('express');
const jwt = require('jsonwebtoken');
const {UserModel}=require('../models/user.model');
const {blackListTokenModel}=require('../models/blacklist.model')
const bcrypt= require('bcrypt');

const userRouter = express.Router();




/**
 * @openapi
 * /auth/token:
 *   get:
 *     summary: Generate a JWT token
 *     responses:
 *       200:
 *         description: JWT token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */


/**
 * @openapi
 * /auth/token:
 *   get:
 *     summary: Generate a JWT token
 *     responses:
 *       200:
 *         description: JWT token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */



/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - pass
 *               - role
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Error registering user
 *
 * @openapi
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               pass:
 *                 type: string
 *             required:
 *               - email
 *               - pass
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 *
 * @openapi
 * /users/logout:
 *   get:
 *     summary: Log out the current user
 *     security:
 *        - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully
 *       400:
 *         description: Error logging out user
 */


/**
 * @openapi
 * /list/all:
 *   get:
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       500:
 *         description: Internal Server Error
 *
 * @openapi
 * /list/update/{id}:
 *   patch:
 *     summary: Update a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - role
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       403:
 *         description: Forbidden - User does not have permission
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 *
 * @openapi
 * /list/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the user to delete
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized - Token not provided or invalid
 *       403:
 *         description: Forbidden - User does not have permission
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */


userRouter.post('/register',(req,res)=>{
    const {name,email,pass, role}=req.body;
   try{
       bcrypt.hash(pass,5,async(err,hash)=>{
        if(err){
            res.status(200).json({error:err});
        }else{
            const user = new UserModel({name,email,pass:hash,role});
            await user.save();
            console.log(user);
            res.status(200).json({msg:"hey! user you are Successfuly Register",user});
        }
       })
   }catch(err){
    res.status(200).json({msg:err});
   }
})


userRouter.post('/login',async(req,res)=>{
    const {email,pass}=req.body;
    try{
       const user = await UserModel.findOne({email});
       if(user){
        bcrypt.compare(pass,user.pass,(err,result)=>{
            if(result){
                const token=jwt.sign({userID:user._id},"Shashank",{expiresIn:"1d"});
                const refresh_token=jwt.sign({userID:user._id},"Shashank",{expiresIn:"7d"});
                res.status(200).json({msg:"Login Successfull!",token,refresh_token});
            }else{
                res.status(200).json({msg:"Wrong Password"});
            }
        })
       }
    }
    catch(err){
        res.status(400).json({msg:"Please register first, wrong Credential"});
        console.log(err);
    }
})


//logout
userRouter.get('/logout',async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1];
    try{
     const blacklist=new blackListTokenModel({token});
     await blacklist.save();
     res.status(200).json({msg:"Logged out"});
    }
    catch(err){
        res.status(400).json({error:"err"})
    }
})


module.exports={
    userRouter,
}