import * as express from 'express'
import voterController from '../controller/voterController'
import AuthMiddlewares from '../middleware/jwtAuth'

const voterRoute = express.Router()
voterRoute.get("/voter", voterController.find)
voterRoute.post("/voter", AuthMiddlewares.Authentification ,voterController.vote)

export default voterRoute;