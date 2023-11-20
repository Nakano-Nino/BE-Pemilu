import * as express from 'express'
import articleController from '../controller/articleController'
import UploadImage from '../middleware/uploadImage'


const articleRoute = express.Router()
articleRoute.get("/artikel", articleController.find)
articleRoute.get("/artikel/:id", articleController.findOne)
articleRoute.post("/artikel", UploadImage.single('image'),articleController.create)
articleRoute.put("/artikel/:id", UploadImage.single('image'),articleController.update)
articleRoute.delete("/artikel/:id", articleController.delete)

export default articleRoute;