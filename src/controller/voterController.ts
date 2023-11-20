import { Request, Response } from "express";
import voterService from "../service/voterService";

export default new (class VoterControllers {
    find(req: Request, res: Response){
        voterService.find(req, res);
    }

    findOne(req: Request, res: Response){
        voterService.findOne(req, res);
    }    
    
    create(req: Request, res: Response){
        voterService.create(req, res);
    }

    update(req: Request, res: Response){
        voterService.update(req, res);
    }

    delete(req: Request, res: Response){
        voterService.delete(req, res);
    }
    login(req: Request, res: Response){
        voterService.login(req, res);
    }
})();