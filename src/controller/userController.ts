import { Request, Response } from "express";
import userService from "../service/userService";

export default new (class UserControllers {
    register(req: Request, res: Response){
        userService.register(req, res)
    }
    login(req: Request, res: Response){
        userService.login(req, res)
    }
    check(req: Request, res: Response){
        userService.check(req, res)
    }
})();