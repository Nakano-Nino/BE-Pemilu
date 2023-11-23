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
            const paslon = await this.PaslonRepository.findOne({where: {orderNum: data.orderNum}})
        
            const obj = new voter()
            obj.userId = UserId
            obj.paslonId = paslon.id
            
            await this.voterRepository.save(obj)
            return res.status(200).json(obj)
        } catch (error) {
            return res.status(500).json({ Error: "Error while creating data" })
        }
    }
    
    // async count(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const countedData = await this.voterRepository.findAndCount({})

    //         console.log(Number(countedData));
            
    //         return res.status(200).json(countedData)
    //     } catch (error) {
    //         return res.status(500).json({ Error: "error while counting datas" })
    //     }
    // }

    // async findOne(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const voterId = req.params.id

    //         const fetchedData = await this.voterRepository.findOne({ where: {id: Number(voterId)}, relations: ['Paslon', 'User'] })

    //         return res.status(200).json(fetchedData)
    //     } catch (error) {
    //         return res.status(500).json({ Error: error })
    //     }
    // }

    // async update(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const voterId = req.params.id
    //         const data = req.body

    //         const fetchedData = await this.voterRepository.findOneBy({ id: Number(voterId) });

    //         const obj = this.voterRepository.create({
    //             fullName: data.fullName,
    //             address: data.address,
    //             gender: data.gender,
    //             paslon: data.paslon,
    //             User: data.UserId
    //         })

    //         this.voterRepository.merge(fetchedData, obj)
    //         const results = await this.voterRepository.save(fetchedData)
    //         return res.status(200).json(results)
    //     } catch (error) {
    //         return res.status(500).json({ Error: error })
    //     }
    // }

    // async delete(req: Request, res: Response): Promise<Response> {
    //     try {
    //         const voterId = req.params.id

    //         const results = await this.voterRepository.delete(voterId)
    //         return res.status(200).json(results)
    //     } catch (error) {
    //         return res.status(500).json({ Error: error })
    //     }
    // }
}