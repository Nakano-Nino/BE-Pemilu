import { Repository } from "typeorm";
import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { voter } from "../entity/voter";
import { paslon } from "../entity/paslon";

export default new class voterServices {
    private readonly voterRepository: Repository<voter> = AppDataSource.getRepository(voter)
    private readonly PaslonRepository: Repository<paslon> = AppDataSource.getRepository(paslon)

    async find(req: Request, res: Response): Promise<Response> {
        try {
            const fetchedData = await this.voterRepository.find({ relations: ['User', 'Paslon'] });

            const listVoters = fetchedData.map((voter) => {
                return{
                    name: voter.User.fullName,
                    address: voter.User.address,
                    gender: voter.User.gender,
                    paslon: voter.Paslon.name
                }
            })

            const VoteCount = fetchedData.length

            return res.status(200).json({listVoters, VoteCount});
        } catch (error) {
            return res.status(500).json({ Error: "error while finding datas" })
        }
    }

    async vote(req: Request, res: Response): Promise<Response> {
        try {
            const loginSession = res.locals.loginSession

            const UserId = loginSession.user.id

            const data  = req.body

            const checkVote = await this.voterRepository.findOne({ where: {userId: UserId}})
            if(checkVote) {
                return res.status(400).json({ message: "User Already Vote" })
            }

            const paslon = await this.PaslonRepository.findOne({where: {orderNum: data.orderNum}})
            
            const obj = this.voterRepository.create({
                userId: UserId,
                paslonId: paslon.id,
            })
            await this.voterRepository.save(obj)
            return res.status(200).json(obj)
        } catch (error) {
            return res.status(500).json({ Error: "Error while creating data" })
        }
    }
}