import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { voter } from "../entity/voter";
import * as bcrypt from "bcrypt"

export default new class voterServices {
    private readonly voterRepository: Repository<voter> = AppDataSource.getRepository(voter)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const fetchedData = await this.voterRepository.find({});
            return res.status(200).json(fetchedData);
        } catch (error) {
            return res.status(500).json({ Error: "error while finding datas" })
        }
    }

    async findOne(req: Request, res: Response): Promise<Response> {
        try {
            const voterId = req.params.id

            const fetchedData = await this.voterRepository.findOneBy({ id: Number(voterId) })
            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            const hashedPassword = await bcrypt.hash(data.password, 10)

            const obj = this.voterRepository.create({
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
                username: data.username,
                password: hashedPassword
            })
            
            await this.voterRepository.save(obj)
            return res.status(200).json(obj)
        } catch (error) {
            return res.status(500).json({ Error: "Error while creating data" })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {
        try {
            const voterId = req.params.id
            const data = req.body

            const fetchedData = await this.voterRepository.findOneBy({ id: Number(voterId) });

            const obj = this.voterRepository.create({
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
                username: data.username,
                password: data.password
            })

            this.voterRepository.merge(fetchedData, obj)
            const results = await this.voterRepository.save(fetchedData)
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {
        try {
            const voterId = req.params.id

            const results = await this.voterRepository.delete(voterId)
            return res.status(200).json(results)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async login(req: Request, res: Response): Promise<Response> {
        try {
            const data = req.body
            
            const user = await this.voterRepository.findOneBy({ username: data.username })

            bcrypt.compare(data.password, user.password, (err, result) => {
                if(!result){
                    return res.status(401).json({ message: "Password is wrong" })
                }else {
                    return res.status(200).json(user)
                }
            })
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }
}