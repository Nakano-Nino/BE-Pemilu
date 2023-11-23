import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken"

export default new class AuthMiddlewares {
    Authentification(req: Request, res: Response, next: NextFunction){
        try {
            const authHeader = req.headers.authorization
            const secretKey = "secret"

            if(!authHeader || !authHeader.startsWith("Bearer")) {
                return res.status(401).json({ error: "Unauthorized" })
            }

            const token = authHeader.split(" ")[1]

            try {
                const loginSession = jwt.verify(token, secretKey)
                res.locals.loginSession = loginSession
                next()
            } catch (error) {
                return res.status(401).json({ error: "Unauthorized" })
            }

        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }
}