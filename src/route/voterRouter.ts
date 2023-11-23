import * as express from 'express'
import voterController from '../controller/voterController'
import AuthMiddlewares from '../middleware/jwtAuth'

const voterRoute = express.Router()
voterRoute.get("/voter", voterController.find)
voterRoute.get("/voter/:id", voterController.findOne)
voterRoute.post("/voter", AuthMiddlewares.Authentification ,voterController.vote)
voterRoute.put("/voter/:id", voterController.update)
voterRoute.delete("/voter/:id", voterController.delete)

export default voterRoute;