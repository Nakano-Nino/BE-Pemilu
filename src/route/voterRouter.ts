import * as express from 'express'
import voterController from '../controller/voterController'

const voterRoute = express.Router()
voterRoute.get("/voter", voterController.find)
voterRoute.get("/voter/:id", voterController.findOne)
voterRoute.post("/voter", voterController.create)
voterRoute.put("/voter/:id", voterController.update)
voterRoute.delete("/voter/:id", voterController.delete)
voterRoute.post("/voter/login", voterController.login)

export default voterRoute;