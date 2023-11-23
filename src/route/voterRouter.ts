import * as express from 'express'
import voterController from '../controller/voterController'
import AuthMiddlewares from '../middleware/jwtAuth'

const voterRoute = express.Router()
voterRoute.get("/voter", voterController.find)
// voterRoute.get("/voter/:id", voterController.findOne)
// voterRoute.get("/voter/count", voterController.count)
voterRoute.post("/voter", AuthMiddlewares.Authentification ,voterController.vote)

export default voterRoute;