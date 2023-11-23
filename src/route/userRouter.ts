import * as express from 'express'
import userController from '../controller/userController'
import AuthMiddlewares from '../middleware/jwtAuth'

const userRoute = express.Router()
userRoute.post("/user/login", userController.login)
userRoute.post("/user/register", userController.register)
userRoute.get("/user/check", AuthMiddlewares.Authentification, userController.check)

export default userRoute;