require('dotenv').config()
import 'reflect-metadata';
import express from "express";
import { AppDataSource } from "./data-source";
import routes from './api';
import cors from 'cors'
import UserController from './controllers/UserController';
import LoginController from './controllers/LoginController';


AppDataSource.initialize().then(() => {
    const app = express();
    app.use(express.json())
    cors()
    app.post('/user', UserController.create)
    app.post('/login', LoginController.login)

    app.get('/hello', (req, res)=> {
        res.send("Hello World")
    })

    app.use(routes)
    
    app.listen(process.env.SERVER_PORT, () => {
        console.log(`server is started in http://localhost:${process.env.SERVER_PORT}`)
    })
})
 