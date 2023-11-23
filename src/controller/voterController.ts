import { Request, Response } from "express";
import voterService from "../service/voterService";

export default new (class VoterControllers {
    find(req: Request, res: Response){
        voterService.find(req, res);
    }

    vote(req: Request, res: Response){
        voterService.vote(req, res);
    }
    
    // findOne(req: Request, res: Response){
    //     voterService.findOne(req, res);
    // }
    
    // count(req: Request, res: Response){
    //     voterService.count(req, res);
    // }
    
})();