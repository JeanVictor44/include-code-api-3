import { Router } from "express";
import { RelationCountAttribute } from "typeorm/query-builder/relation-count/RelationCountAttribute";
import LoginController from "../controllers/LoginController";
import UserController from "../controllers/UserController";
const routes = Router()

routes.post('/user', UserController.create)
routes.post('/login', LoginController.login)

routes.get('/hello', (req, res)=> {
    res.send("Hello World")
})

export default routes