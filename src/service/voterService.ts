import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { voter } from "../entity/voter";
import { user } from "../entity/user";
import { paslon } from "../entity/paslon";

export default new class voterServices {
    private readonly voterRepository: Repository<voter> = AppDataSource.getRepository(voter)
    private readonly UserRepository: Repository<user> = AppDataSource.getRepository(user)
    private readonly PaslonRepository: Repository<paslon> = AppDataSource.getRepository(paslon)

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

            const fetchedData = await this.voterRepository.findOne({ where: {id: Number(voterId)}, relations: ['Paslon', 'User'] })
            return res.status(200).json(fetchedData)
        } catch (error) {
            return res.status(500).json({ Error: error })
        }
    }

    async vote(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            const UserId = loginSession.user.id
            const user = await this.UserRepository.findOne({
                where: { id: UserId }
            })

            const { orderNum } = req.body
            const paslon = await this.PaslonRepository.findOne({ where: {orderNum: orderNum }})

            console.log(paslon);
            

            const data = {
                fullName: user.fullName,
                address: user.address,
                gender: user.gender,
                paslonName: paslon.name,
                paslonId: paslon.id
            }

            const obj = this.voterRepository.create({
                fullName: data.fullName,
                address: data.address,
                gender: data.gender,
                paslon: data.paslonName,
                User: UserId,
                Paslon: paslon

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
                paslon: data.paslon,
                User: data.UserId
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
}