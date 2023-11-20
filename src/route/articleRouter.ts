import * as express from 'express'
import articleController from '../controller/articleController'


const articleRoute = express.Router()
articleRoute.get("/artikel", articleController.find)
articleRoute.get("/artikel/:id", articleController.findById)

export default articleRoute;