import { Request, Response } from "express";
import articleservice from "../service/articleservice";

export default new (class ArticleControllers {
    find(req: Request, res: Response){
        articleservice.find(req, res);
    }

    findOne(req: Request, res: Response){
        articleservice.findOne(req, res);
    }    
    
    create(req: Request, res: Response){
        articleservice.create(req, res);
    }

    update(req: Request, res: Response){
        articleservice.update(req, res);
    }

    delete(req: Request, res: Response){
        articleservice.delete(req, res);
    }
})();