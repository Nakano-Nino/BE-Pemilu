import * as express from 'express'
import partaiController from '../controller/partaiController'
import UploadImage from '../middleware/uploadImage'

const partaiRoute = express.Router()
partaiRoute.get("/partai", partaiController.find)
partaiRoute.get("/partai/:id", partaiController.findOne)
partaiRoute.post("/partai", UploadImage.single('image'), partaiController.create)
partaiRoute.put("/partai/:id", UploadImage.single('image'), partaiController.update)
partaiRoute.delete("/partai/:id", partaiController.delete)

export default partaiRoute;