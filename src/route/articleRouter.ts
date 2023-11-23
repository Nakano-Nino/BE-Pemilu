import * as express from 'express'
import articleController from '../controller/articleController'
import UploadImage from '../middleware/uploadImage'
import AuthMiddlewares from '../middleware/jwtAuth'

const articleRoute = express.Router()
articleRoute.get("/artikel", articleController.find)
articleRoute.get("/artikel/:id", articleController.findOne)
articleRoute.post("/artikel", AuthMiddlewares.Authentification ,UploadImage.single('image'),articleController.create)
articleRoute.put("/artikel/:id", AuthMiddlewares.Authentification ,UploadImage.single('image'),articleController.update)
articleRoute.delete("/artikel/:id", articleController.delete)

export default articleRoute;