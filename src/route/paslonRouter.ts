import * as express from 'express'
import paslonController from '../controller/paslonController'
import UploadImage from '../middleware/uploadImage'
import AuthMiddlewares from '../middleware/jwtAuth'

const paslonRoute = express.Router()
paslonRoute.get("/paslon", paslonController.find)
paslonRoute.get("/paslon/:id", paslonController.findOne)
paslonRoute.post("/paslon",  AuthMiddlewares.Authentification, UploadImage.single('image'), paslonController.create)
paslonRoute.put("/paslon/:id", UploadImage.single('image'), paslonController.update)
paslonRoute.delete("/paslon/:id", paslonController.delete)

export default paslonRoute;