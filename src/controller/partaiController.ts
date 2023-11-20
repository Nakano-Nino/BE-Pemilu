import { Request, Response } from "express";
import partaiService from "../service/partaiService";

export default new (class PartaiControllers {
    find(req: Request, res: Response){
        partaiService.find(req, res);
    }

    findOne(req: Request, res: Response){
        partaiService.findOne(req, res);
    }    
    
    create(req: Request, res: Response){
        partaiService.create(req, res);
    }

    update(req: Request, res: Response){
        partaiService.update(req, res);
    }

    delete(req: Request, res: Response){
        partaiService.delete(req, res);
    }
})();