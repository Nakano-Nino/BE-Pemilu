import { Request, Response } from "express";
import paslonService from "../service/paslonService";

export default new (class PaslonControllers {
    find(req: Request, res: Response){
        paslonService.find(req, res);
    }

    findOne(req: Request, res: Response){
        paslonService.findOne(req, res);
    }    
    
    create(req: Request, res: Response){
        paslonService.create(req, res);
    }

    update(req: Request, res: Response){
        paslonService.update(req, res);
    }

    delete(req: Request, res: Response){
        paslonService.delete(req, res);
    }
})();