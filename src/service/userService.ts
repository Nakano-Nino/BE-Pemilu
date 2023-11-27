import { Repository } from "typeorm"
import { user } from "../entity/user"
import { AppDataSource } from "../data-source"
import { Request, Response } from "express"
import { registerSchema, loginSchema }  from "../utils/userValidator"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"


export default new class userServices {
    private readonly UserRepository: Repository<user> = AppDataSource.getRepository(user)

    async register(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            
            const { error } = registerSchema.validate(data)
            if (error) return res.status(400).json({ Error: error })

            const usernameCheck = await this.UserRepository.findOneBy({username: data.username})
            if (usernameCheck) {
                res.status(400).json({
                    status: 400,
                    message: "Username already in use"
                })
                return
            }

            const hashedPassword = await bcrypt.hash(data.password, 10)

            const obj = this.UserRepository.create({
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
                username: data.username,
                password: hashedPassword,
                role: 'user'
            })

            const result = await this.UserRepository.save(obj)
            return res.status(200).json({ message: "Register Successfull" , result })
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body

            const { error } = loginSchema.validate(data)
            if (error) return res.status(400).json({ Error: error })

            const usernameCheck = await this.UserRepository.findOne({where: {username: data.username}})
            if (!usernameCheck) {
                return res.status(404).json({ message: "User not found " })
            }

            const passwordCheck = await bcrypt.compare(data.password, usernameCheck.password)
            if (!passwordCheck) {
                return res.status(400).json({ message: "Password is wrong" })
            }

            const user = this.UserRepository.create({
                id: usernameCheck.id,
                fullName: usernameCheck.fullName,
                role: usernameCheck.role
            })

            const token = jwt.sign({user}, "secret", {expiresIn: "20m"})
            return res.status(200).json({ message: "Login Success" ,token})

        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async check(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            const user = await this.UserRepository.findOne({
                where: { id: loginSession.user.id }
            })
            return res.status(200).json({message: "Authorized", user})
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }
}