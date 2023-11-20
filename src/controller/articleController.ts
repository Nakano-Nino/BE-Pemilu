import { Request, Response } from "express";
import articleservice from "../service/articleservice";

export default new (class ArticleControllers {
    find(req: Request, res: Response){
        articleservice.find(req, res);
    }

    findById(req: Request, res: Response){
        articleservice.findById(req, res);
    }
})();